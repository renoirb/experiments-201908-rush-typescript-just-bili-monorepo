import {
  createBannerInfo,
  PackageJson,
  PeopleField,
  createBannerFooter,
} from '..';

const peopleFixture: PeopleField = {
  email: '7.9@adjunct.3.unimatrix.1.borg',
  name: 'Seven Of Nine',
};

const packageFixture: PackageJson = {
  name: 'assimilate',
  version: '436.0.1',
};

describe('createBannerInfo', () => {
  it('Snapshot sample', () => {
    const subject = createBannerInfo(packageFixture);
    expect(subject).toMatchSnapshot();
  });

  it('Provides default author, license, copyright fields', () => {
    const subject = createBannerInfo(packageFixture);
    expect(subject).toHaveProperty('author', 'ACME Corp.');
    expect(subject).toHaveProperty(
      'copyright',
      'Copyright (c) 2015-2019 ACME Corp.',
    );
    expect(subject).toHaveProperty('license', 'LicenseRef-LICENSE');
    expect(subject).toHaveProperty('name', 'assimilate');
    expect(subject).toHaveProperty('vendor', 'ACME Corp.');
  });

  it('Supports defining own author', () => {
    const subject = createBannerInfo({
      ...packageFixture,
      author: { ...peopleFixture },
    });
    expect(subject).toMatchSnapshot();
    expect(subject).toHaveProperty(
      'author',
      'Seven Of Nine <7.9@adjunct.3.unimatrix.1.borg>',
    );
  });

  it('Supports defining own license', () => {
    const subject = createBannerInfo({
      ...packageFixture,
      license: 'MIT',
    });
    expect(subject).toMatchSnapshot();
    expect(subject).toHaveProperty('license', 'MIT');
  });
});

describe('createBannerFooter', () => {
  it('Snapshot sample', () => {
    const seed = createBannerInfo(packageFixture);
    const subject = createBannerFooter(seed);
    expect(subject).toMatchSnapshot();
  });

  it('Is possible to add arbitrary lines', () => {
    const append = ['target: node', 'browserslist: node 10'];
    const seed = createBannerInfo(packageFixture);
    const subject = createBannerFooter(seed, append);
    expect(subject).toHaveProperty(
      'banner',
      `/**
 * assimilate v436.0.1
 *
 * Maintainer: ACME Corp.
 *
 * target: node
 * browserslist: node 10
 *
 * LicenseRef-LICENSE
 *
 * © 2015-2019 ACME Corp.
 */`,
    );
    expect(subject).toHaveProperty('footer', `/** ACME Corp.  */`);
  });

  it('Is possible to override default vendor', () => {
    const vendor = 'Gammick International 2000 Inc.';
    const seed = createBannerInfo(packageFixture, vendor);
    const subject = createBannerFooter(seed);
    expect(subject).toHaveProperty('footer', `/** ${vendor}  */`);
  });
});
