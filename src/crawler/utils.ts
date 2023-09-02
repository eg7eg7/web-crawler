/** From: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url */
const URLRegex = new RegExp('https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)', 'i');

export function isLink(url: string): boolean {
  try {
    // Expect to throw error if not a url
    new URL(url);
    return URLRegex.test(url);
  } catch (error) {
    return false;
  }
}
