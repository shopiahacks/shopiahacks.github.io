"""Saves the latest posts from Substack to data/substack.json (run by the GitHub Action).
Tries several sources in order, because Substack sometimes blocks requests from GitHub's servers."""
import json
import os
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

PUB = "https://shopiashares.substack.com"
OUT = "data/substack.json"
LIMIT = 12  # how many recent posts to keep; the website decides how many to show
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
    "Accept": "application/rss+xml, application/xml, application/json, text/xml, */*",
    "Accept-Language": "en-US,en;q=0.9",
}


def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=30).read()


def plain(html):
    return re.sub(r"<[^>]+>", "", html or "").strip()


def from_feed():
    posts = []
    for item in ET.fromstring(get(PUB + "/feed")).findall("./channel/item")[:LIMIT]:
        enclosure = item.find("enclosure")
        posts.append({
            "title": (item.findtext("title") or "").strip(),
            "link": (item.findtext("link") or "").strip(),
            "date": parsedate_to_datetime(item.findtext("pubDate")).date().isoformat(),
            "description": plain(item.findtext("description")),
            "image": enclosure.get("url") if enclosure is not None else "",
        })
    return posts


def from_archive():
    return [{
        "title": p.get("title", ""),
        "link": p.get("canonical_url", ""),
        "date": (p.get("post_date") or "")[:10],
        "description": plain(p.get("subtitle") or p.get("description")),
        "image": p.get("cover_image") or "",
    } for p in json.loads(get(f"{PUB}/api/v1/archive?sort=new&limit={LIMIT}"))]


def from_proxy():
    data = json.loads(get("https://api.rss2json.com/v1/api.json?rss_url=" + urllib.parse.quote(PUB + "/feed", safe="")))
    if data.get("status") != "ok":
        raise RuntimeError(data.get("message", "proxy error"))
    return [{
        "title": i["title"],
        "link": i["link"],
        "date": i["pubDate"][:10],
        "description": plain(i.get("description"))[:300],
        "image": i.get("thumbnail") or "",
    } for i in data["items"][:LIMIT]]


def main():
    errors = []
    for name, source in (("feed", from_feed), ("archive api", from_archive), ("rss2json proxy", from_proxy)):
        try:
            posts = source()
            if posts:
                break
            errors.append(f"{name}: no posts")
        except Exception as e:
            errors.append(f"{name}: {e}")
    else:
        print("::error::" + " | ".join(errors))  # shows up as a red annotation on the run
        sys.exit(1)
    os.makedirs("data", exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"saved {len(posts)} posts from {name}")


if __name__ == "__main__":
    main()