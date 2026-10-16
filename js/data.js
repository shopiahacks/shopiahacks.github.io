// everything on the photography and art pages comes from this file. edit it, save, then commit and push.
// - put photos in images/photography/ and art in images/art/, then use just the file name (like 'grad-01.jpg').
// - dates look like 2026-05-10. any optional field you leave out simply won't show on the site.
// - a photo can belong to several collections. the id 'picks' is the "my picks" collection.

const collections = [
  { id: 'picks', title: 'my picks', blurb: 'a few favorites.' },
  { id: 'grad', title: 'graduation', blurb: '' },
  { id: 'nature', title: 'nature & still life', blurb: '' },
  { id: 'sports', title: 'sports', blurb: '' },
  { id: 'etc', title: 'etc.', blurb: 'fun & miscellaneous' },
];

// the photos in the big slider at the top of the photography page (up to 6, use their ids)
const featured = ['s12', 's2', 's8', 's4', 's14', 's6'];

// photos. required: id (unique, no spaces), file, photographer, collections
// optional: title, camera, date, location, description, alt (short text for screen readers)
const photos = [
  // id: 's1', file: 'file.jpg', title: 'title', photographer: 'me', camera: 'cam', date: 'date', location: 'place', description: 'photo blah blah', collections: ['picks', 'graduation']
  { id: 's1', file: 'central-park.jpg', title: 'central park scene', photographer: 'sophia martin', camera: 'digital camera', date: 'july 2026', location: 'new york, ny', collections: ['nature'] },
  { id: 's2', file: 'forest.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'september 2026', collections: ['picks', 'nature'] },
  { id: 's3', file: 'kiss.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'july 2026',collections: ['picks', 'etc'] },
  { id: 's4', file: 'leaves.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'september 2026', collections: ['nature'] },
  { id: 's5', file: 'sky-sea.jpeg', photographer: 'sophia martin', date: 'june 2026', collections: ['nature'] },
  { id: 's6', file: 'tall-trees.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'september 2026', collections: ['nature'] },
  { id: 's7', file: 'xc-country.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'september 2026', collections: ['picks', 'sports'] },
  { id: 's8', file: 'xc-go.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'september 2026', collections: ['sports'] },
  { id: 's9', file: 'xc-line.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'september 2026', collections: ['sports'] },
  { id: 's10', file: 'xc-pond.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'september 2026', collections: ['sports'] },
  { id: 's11', file: 'xc-team.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'september 2026', collections: ['sports'] },
  { id: 's12', file: 'as6.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad', 'picks'] },
  { id: 's13', file: 'as7.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  { id: 's14', file: 'as25.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  //{ id: 's15', file: 'as4.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  { id: 's16', file: 'as8.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  //{ id: 's17', file: 'as26.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  { id: 's18', file: 'as16.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  //{ id: 's19', file: 'as5.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  //{ id: 's20', file: 'as9.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  { id: 's21', file: 'as17.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  //{ id: 's22', file: 'as3.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  //{ id: 's23', file: 'as1.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  //{ id: 's24', file: 'as19.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  { id: 's25', file: 'as27.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  { id: 's26', file: 'as14.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  { id: 's27', file: 'as23.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  { id: 's28', file: 'as10.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  //{ id: 's29', file: 'as24.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  { id: 's30', file: 'as20.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  { id: 's31', file: 'as13.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  { id: 's32', file: 'as2.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
  //{ id: 's33', file: 'as22.jpg', photographer: 'sophia martin', camera: 'Canon EOS Rebel 7', date: 'october 2026', location: 'richmond, va', collections: ['grad'] },
];

// art. required: id, file, title, artist
// optional: medium, size, date, description, alt
const art = [
  // id: 'a3', file: 'images/placeholder-square.svg', title: 'a third piece', artist: 'sophia martin', medium: 'ink' size: '18 x 24 in', date: '2026-03-01', description: 'write about the piece here.'
  { id: 'butterfly', file: 'butterfly.JPG', title: 'butterfly sketch', artist: 'sophia martin', medium: 'pencil sketch translated to digital', date: 'september 2026'},
  { id: 'flowers1', file: 'flowers1.jpg', title: 'UNDERGRAD, PRESERVED', artist: 'sophia martin', medium: "dried flowers", size: '8 x 10 in', date: 'september 2026'},
];
