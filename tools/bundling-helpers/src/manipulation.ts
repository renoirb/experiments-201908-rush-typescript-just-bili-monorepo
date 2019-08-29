/**
 * Anything here might come as copy-pasta from lodash.
 *
 * NOTE: cached function in ./utils is called memoise in lodash
 *
 * https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.js
 */

/**
 * camelCase transforms kebab-case to kebabCase.
 *
 * Ideally, this should be imported from lodash.camelCase
 *
 * @param {string} str string to strip off dashes
 */
export function camelCase(str: string): string {
  const replacer = (match: string, index: number): string => {
    if (+match === 0) {
      return '';
    }
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  };
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, replacer).replace(/-/g, '');
}
