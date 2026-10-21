"""Saves the latest posts from the Substack RSS feed to data/substack.json (run by the GitHub Action)."""
import json
import os
import re
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime

FEED = "https://shopiashares.substack.com/feed"
OUT = "data/substack.json"
LIMIT = 12  # how many recent posts to keep; the website decides how many to show


def parse(xml_bytes):
    posts = []
    for item in ET.fromstring(xml_bytes).findall("./channel/item")[:LIMIT]:
        enclosure = item.find("enclosure")
        posts.append({
            "title": (item.findtext("title") or "").strip(),
            "link": (item.findtext("link") or "").strip(),
            "date": parsedate_to_datetime(item.findtext("pubDate")).date().isoformat(),
            "description": re.sub(r"<[^>]+>", "", item.findtext("description") or "").strip(),
            "image": enclosure.get("url") if enclosure is not None else "",
        })
    return posts


if __name__ == "__main__":
    req = urllib.request.Request(FEED, headers={"User-Agent": "Mozilla/5.0 (compatible; personal-site-sync)"})
    posts = parse(urllib.request.urlopen(req, timeout=30).read())
    if not posts:
        raise SystemExit("feed had no posts; leaving the existing file alone")
    os.makedirs("data", exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"saved {len(posts)} posts")