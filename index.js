module.exports = function generateString (s) {
  const inner = JSON.stringify(String(s)).slice(1, -1)
    .replace(/\\"/g, '"')
    .replace(/'/g, "\\'")
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
  return "'" + inner + "'"
}
