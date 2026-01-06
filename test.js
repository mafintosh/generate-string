const test = require('brittle')
const generateString = require('./')

test('basic - simple string uses single quotes', function (t) {
  t.is(generateString('42'), "'42'")
})

test('string containing double quote uses JSON.stringify', function (t) {
  // input: "42
  // output: "\"42"
  t.is(generateString('"42'), '"\\\"42"')
})

test('string containing single quote uses JSON.stringify', function (t) {
  // input: '42
  // output: "\'42"
  t.is(generateString("'42"), '"\'42"')
})

test('empty string', function (t) {
  t.is(generateString(''), "''")
})

test('string with both quotes uses JSON.stringify', function (t) {
  // input: "'
  // output: "\"'"
  t.is(generateString('"\''), '"\\"\'\"')
})
