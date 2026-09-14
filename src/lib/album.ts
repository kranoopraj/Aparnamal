export type AlbumPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

export type AlbumData = {
  kicker: string;
  brideName: string;
  groomName: string;
  joiningLine: string;
  weddingDateLabel: string;
  weddingDateIso: string;
  locationName: string;
  locationRegion: string;
  heroImage: string;
  heroAlt: string;
  introTitle: string;
  introBody: string;
  coupleTitle: string;
  brideLabel: string;
  brideNote: string;
  bridePortrait: string;
  groomLabel: string;
  groomNote: string;
  groomPortrait: string;
  galleryTitle: string;
  gallerySubtitle: string;
  photos: AlbumPhoto[];
  inviteTitle: string;
  inviteSubtitle: string;
  inviteImages: AlbumPhoto[];
  detailsTitle: string;
  detailsWhenLabel: string;
  detailsWhereLabel: string;
  detailsNote: string;
  footerLine: string;
};

export const DEFAULT_ALBUM: AlbumData = {
  kicker: "Save the Date",
  brideName: "Aparna",
  groomName: "Amal T S",
  joiningLine: "are getting married",
  weddingDateLabel: "25 January 2027",
  weddingDateIso: "2027-01-25",
  locationName: "MK Convention Centre",
  locationRegion: "Eramalloor",
  heroImage: "/photos/golden-hour.jpg",
  heroAlt: "Aparna and Amal at golden hour",
  introTitle: "A day we have been waiting for",
  introBody:
    "Silk, jasmine, and the people we love. Join us as we begin our life together — with family, with friends, and with a promise spoken in the Kerala light.",
  coupleTitle: "The couple",
  brideLabel: "The bride",
  brideNote: "Aparna — grace in kanjivaram gold, and a smile that fills the room.",
  bridePortrait: "/photos/saree-portrait.jpg",
  groomLabel: "The groom",
  groomNote: "Amal T S — steady, warm, and already looking toward January.",
  groomPortrait: "/photos/amal.jpg",
  galleryTitle: "Our moments",
  gallerySubtitle: "Shopping for silk, stealing glances, counting down the days.",
  photos: [
    {
      id: "kanjivaram",
      src: "/photos/saree-kanjivaram.jpg",
      alt: "Aparna draped in a rose-gold kanjivaram saree",
      caption: "Draped in kanjivaram gold",
    },
    {
      id: "lehenga",
      src: "/photos/lehenga-red.jpg",
      alt: "Aparna in a red sequinned lehenga",
      caption: "A red lehenga for the evening",
    },
    {
      id: "crimson",
      src: "/photos/saree-crimson.jpg",
      alt: "Aparna in a crimson and gold silk saree",
      caption: "Temple borders and a smile",
    },
    {
      id: "looking-up",
      src: "/photos/looking-up.jpg",
      alt: "Amal and Aparna looking up together",
      caption: "Looking up, together",
    },
    {
      id: "store-together",
      src: "/photos/store-together.jpg",
      alt: "Amal and Aparna shopping for wedding clothes",
      caption: "Finding the one — the outfit, and each other",
    },
    {
      id: "store-full",
      src: "/photos/store-full.jpg",
      alt: "Amal and Aparna in a boutique hallway",
      caption: "A quiet yes in the mirror hall",
    },
    {
      id: "cafe-hands",
      src: "/photos/cafe-hands.jpg",
      alt: "Amal and Aparna holding hands at a cafe",
      caption: "Hands held over coffee",
    },
    {
      id: "cafe-booth",
      src: "/photos/cafe-booth.jpg",
      alt: "Amal and Aparna seated in a green cafe booth",
      caption: "Our favourite booth",
    },
  ],
  inviteTitle: "The invitation",
  inviteSubtitle: "Keep the evening free. We would love you there.",
  inviteImages: [
    {
      id: "invite-garden",
      src: "/photos/invite-garden.jpg",
      alt: "Save the date card of Amal and Aparna among roses",
      caption: "Save the Date",
    },
    {
      id: "invite-light",
      src: "/photos/invite-light.jpg",
      alt: "Save the date card of Amal and Aparna in a garden",
      caption: "25 January 2027",
    },
  ],
  detailsTitle: "Wedding day",
  detailsWhenLabel: "When",
  detailsWhereLabel: "Where",
  detailsNote: "We cannot wait to celebrate with you.",
  footerLine: "With love, Aparna & Amal",
};

export function weddingTimestamp(isoDate: string): number {
  // Midnight IST on the wedding day.
  return Date.parse(`${isoDate}T00:00:00+05:30`);
}
