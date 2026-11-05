export const BUSINESS_ADDRESS =
  "RAMZ TYPING - OPPOSITE OF SHARJAH IMMIGRATION - AL RAHMANIA - SHARJAH - UAE";

const encodedBusinessAddress = encodeURIComponent(BUSINESS_ADDRESS);

export const GOOGLE_MAPS_EMBED_URL =
  `https://www.google.com/maps?q=${encodedBusinessAddress}&output=embed`;

export const GOOGLE_MAPS_DIRECTIONS_URL =
  `https://www.google.com/maps/search/?api=1&query=${encodedBusinessAddress}`;
