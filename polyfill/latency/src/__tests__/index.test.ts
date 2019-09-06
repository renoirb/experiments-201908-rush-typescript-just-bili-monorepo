/* eslint-env jest */

import latency from '..';

describe('latency', () => {
  test('returns a promise object', () => {
    const subject = latency();
    expect(subject).toHaveProperty('then');
    expect(subject).toHaveProperty('catch');
  });

  /*
   * ------ UNFINISHED ------
   * As long as test pass above, let's resume this here later
   *
  test('works with async/await', async () => {
    const begin = new Date().getTime();
    await latency(500);
    const end = new Date().getTime();
    expect(end - begin).to.least(500);
  });

  test('Can use .then()', () => {
    const begin = new Date().getTime();
    const testEnd = (begin, end) => expect(end - begin).to.least(500);

    latency(500).then(function() {
      const end = new Date().getTime();
      testEnd(begin, end);
    });
  });
  * ------ */
});
