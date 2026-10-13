// everything on the photography and art pages comes from this file. edit it, save, then commit and push.
// - put photos in images/photography/ and art in images/art/, then use just the file name (like 'grad-01.jpg').
// - dates look like 2026-05-10. any optional field you leave out simply won't show on the site.
// - a photo can belong to several collections. the id 'picks' is the "my picks" collection.

const collections = [
  { id: 'picks', title: 'my picks', blurb: 'a few favorites.' },
  { id: 'graduation', title: 'graduation', blurb: '' },
  { id: 'nature', title: 'nature & still life', blurb: '' },
  { id: 'sports', title: 'sports', blurb: '' },
];

// the photos in the big slider at the top of the photography page (up to 6, use their ids)
const featured = ['s1', 's2', 's3', 's4', 's5', 's6'];

// photos. required: id (unique, no spaces), file, photographer, collections
// optional: title, camera, date, location, description, alt (short text for screen readers)
const photos = [
  { id: 's1', file: 'images/placeholder.svg', title: 'sample photo', photographer: 'sophia', camera: 'camera name', date: '2026-05-10', location: 'st. louis, mo', description: 'write about the photo here.', collections: ['picks', 'graduation'] },
  { id: 's2', file: 'images/placeholder-tall.svg', photographer: 'sophia', date: '2026-04-02', collections: ['picks', 'nature'] },
  { id: 's3', file: 'images/placeholder-square.svg', photographer: 'sophia', collections: ['picks', 'sports'] },
  { id: 's4', file: 'images/placeholder.svg', photographer: 'sophia', date: '2026-05-11', collections: ['graduation'] },
  { id: 's5', file: 'images/placeholder-tall.svg', photographer: 'sophia', date: '2026-03-20', collections: ['nature'] },
  { id: 's6', file: 'images/placeholder-square.svg', photographer: 'sophia', date: '2026-02-14', collections: ['sports'] },
  { id: 's7', file: 'images/placeholder.svg', photographer: 'sophia', collections: ['nature'] },
  { id: 's8', file: 'images/placeholder-tall.svg', photographer: 'sophia', date: '2026-05-09', collections: ['graduation'] },
  { id: 's9', file: 'images/placeholder.svg', photographer: 'sophia', date: '2026-01-30', collections: ['sports'] },
];

// art. required: id, file, title, artist
// optional: medium, size, date, description, alt
const art = [
  { id: 'a1', file: 'images/placeholder-tall.svg', title: 'sample piece', artist: 'sophia', medium: 'oil on canvas', size: '18 x 24 in', date: '2026-03-01', description: 'write about the piece here.' },
  { id: 'a2', file: 'images/placeholder.svg', title: 'another piece', artist: 'sophia' },
  { id: 'a3', file: 'images/placeholder-square.svg', title: 'a third piece', artist: 'sophia', medium: 'ink' },
];
