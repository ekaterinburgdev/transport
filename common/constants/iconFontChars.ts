/* The icon font uses codes from utf-16. The required symbols are in the range
from 57344 to 57395 inclusive, as well as the logo symbols — 57552 and 57553, respectively */
export enum IconFontCharsNames {
    'taxi' = 'taxi',
    'bus' = 'bus',
    'troll' = 'troll',
    'tram' = 'tram',
    'rail' = 'rail',
    'metro' = 'metro',
    'airport' = 'airport',
    'route' = 'route',
    'info' = 'info',
    'geotag' = 'geotag',
    'pedestrianl' = 'pedestrianl',
    'pedestrianr' = 'pedestrianr',
    'person' = 'person',
    'disabled' = 'disabled',
    'velo' = 'velo',
    'tourist' = 'tourist',
    'resident' = 'resident',
    'hotel' = 'hotel',
    'skater' = 'skater',
    'rubbish' = 'rubbish',
    'police' = 'police',
    'architecture' = 'architecture',
    'theater' = 'theater',
    'philharmonic' = 'philharmonic',
    'shopping' = 'shopping',
    'cinema' = 'cinema',
    'sport' = 'sport',
    'zoo' = 'zoo',
    'panorama' = 'panorama',
    'food' = 'food',
    'hospital' = 'hospital',
    'church' = 'church',
    'chapel' = 'chapel',
    'synagogue' = 'synagogue',
    'museum' = 'museum',
    'stadium' = 'stadium',
    'circus' = 'circus',
    'ferriswheel' = 'ferriswheel',
    'park' = 'park',
    'fountain' = 'fountain',
    'cafe' = 'cafe',
    'monument' = 'monument',
    'sculpture' = 'sculpture',
    'wifi' = 'wifi',
    'recycling' = 'recycling',
    'organic' = 'organic',
    'plastic' = 'plastic',
    'paper' = 'paper',
    'security' = 'security',
    'cemetery' = 'cemetery',
    'center' = 'center',
    'area' = 'area',
    'logoeng' = 'logoeng',
    'logorus' = 'logorus',
}
const ICON_FONT_CHARS_NAMES = Object.values(IconFontCharsNames);

const ICON_FONT_CHARS: Partial<{ [key in IconFontCharsNames]: string }> = {};

const firstGlyphId = 57344;
const lastGlyphId = 57395;
for (let i = firstGlyphId; i <= lastGlyphId; i += 1) {
    ICON_FONT_CHARS[ICON_FONT_CHARS_NAMES[i - firstGlyphId]] = String.fromCharCode(i);
}

const logoEngChar = String.fromCharCode(57552);
ICON_FONT_CHARS.logoeng = logoEngChar;

const logoRusChar = String.fromCharCode(57553);
ICON_FONT_CHARS.logorus = logoRusChar;

export { ICON_FONT_CHARS };
