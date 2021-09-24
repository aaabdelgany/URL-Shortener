test('dummy', () => {
  const result = 5 * 5;
  expect(result).toBe(25);
});

test('fail', () => {
  const fail = 'fail';

  expect(fail).toBe('Fail');
});
