import path from 'path';

import { Package } from '..';

const fixture = name => ({
  rootDir: path.resolve(__dirname, 'fixtures', name),
});

describe('normalize-package-json', () => {
  test('autoFix should sort', () => {
    const opts = fixture('package-unsorted');
    const subject = new Package({ ...opts, sortDependencies: true });
    subject.autoFix();
    expect(subject.toString()).toMatchSnapshot();
  });
});
