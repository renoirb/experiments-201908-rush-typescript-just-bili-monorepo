import main from '..';

describe('main', () => {
  it('Snapshot sample', () => {
    const subject = main('foo/bar/bazz/buzz/bizz.ts')(process.env);
    expect(subject).toMatchSnapshot();
  });
});
