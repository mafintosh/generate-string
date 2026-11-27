const test = require('brittle')
const generateString = require('.')

test('always produces a single quoted string', (t) => {
  t.is(generateString('42'), "'42'")
  t.is(generateString('"42'), '\'"42\'')
  t.is(generateString("it's"), "'it\\'s'")
})

test('output evaluates back to the input', (t) => {
  const inputs = [
    '',
    'a\\b',
    'trailing\\',
    '\\x41',
    '\\xZZ',
    'a\nb',
    'a\r\nb',
    'a\tb',
    '\0\b\f\v',
    '\ud800',
    '\u2028\u2029',
    '\\\'"',
    '\\"',
    '`${x}`'
  ]

  for (const s of inputs) {
    t.is(eval(generateString(s)), s, JSON.stringify(s)) // eslint-disable-line no-eval
  }
})

test('escapes line and paragraph separators for pre-ES2019 engines', (t) => {
  t.is(generateString('a\u2028b\u2029c'), "'a\\u2028b\\u2029c'")
})

test('coerces non-string input', (t) => {
  t.is(generateString(123), "'123'")
  t.is(generateString(undefined), "'undefined'")
})
