/**
 * Utility to generate personalized invitation links.
 * 
 * Usage example:
 * const link = generateInvitationLink("Mr. K. Godage", "https://dinithi-isuru-wedding.com");
 * console.log(link); // "https://dinithi-isuru-wedding.com?to=Mr.%20K.%20Godage"
 */

export function generateInvitationLink(guestName, baseUrl = window.location.origin) {
  if (!guestName) return baseUrl;
  
  const url = new URL(baseUrl);
  url.searchParams.set('to', guestName);
  return url.toString();
}
