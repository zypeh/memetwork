/**
 * get title from file name
 *
 * @api public
 * @param {String} title
 * @return {String}
 */
export function onlyTitle (title) {
  return title.replace(/\.md$/, '')
              .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '')
}

/**
 * get publish date from file name
 *
 * @api public
 * @param {String} title
 * @return {String}
 */
export function onlyDate (title) {
  return /^\d{4}-\d{1,2}-\d{1,2}/.exec(title)[0]
}
