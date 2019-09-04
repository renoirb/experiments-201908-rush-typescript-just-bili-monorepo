/* eslint-env jest */

import main from '..';

describe('main', () => {
  it('Snapshot sample', () => {
    const index = 'foo/bar/baz/buzz/bizz.ts';
    const subject = main(index)(process.env);
    expect(subject).toMatchSnapshot();
    expect(subject).toHaveProperty('input', {
      index,
    });
  });
});
