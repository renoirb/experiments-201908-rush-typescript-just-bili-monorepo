/* eslint-env jest */

import { PackageJson } from '../package'
import { createBannerInfo, createBannerFooter } from '../banner'

jest.spyOn(global.Date.prototype, 'getFullYear').mockImplementation(() => 2373)

const pkg: PackageJson = {
  name: 'assimilate',
  version: '436.0.1',
}

describe('createBannerInfo', () => {
  it('Snapshot sample', () => {
    const subject = createBannerInfo(
      {
        ...pkg,
        author: {
          name: 'Borg Collective',
        },
      },
      {
        firstYear: 1484,
      },
    )
    expect(subject).toMatchSnapshot()
    expect(subject).toHaveProperty('license', 'LicenseRef-LICENSE')
    expect(subject).toHaveProperty('vendor', 'Borg Collective')
  })

  it('Provides default author, license, copyright fields', () => {
    const subject = createBannerInfo(
      {
        ...pkg,
      },
      {},
    )
    expect(subject).toHaveProperty('author', 'Example Author')
    expect(subject).toHaveProperty(
      'copyright',
      'Copyright (c) 2373 Example Author',
    )
    expect(subject).toHaveProperty('license', 'LicenseRef-LICENSE')
    expect(subject).toHaveProperty('name', 'assimilate')
    expect(subject).toHaveProperty('vendor', 'Example Author')
  })

  it('Supports defining own author', () => {
    const subject = createBannerInfo(
      {
        ...pkg,
        author: {
          email: '7.9@adjunct.3.unimatrix.1.borg',
          name: 'Seven Of Nine',
        },
      },
      {
        firstYear: 1484,
        vendor: 'Borg Collective',
      },
    )
    expect(subject).toMatchSnapshot()
    expect(subject).toHaveProperty(
      'author',
      'Seven Of Nine <7.9@adjunct.3.unimatrix.1.borg>',
    )
    expect(subject).toHaveProperty(
      'copyright',
      'Copyright (c) 1484-2373 Borg Collective',
    )
    expect(subject).toHaveProperty('license', 'LicenseRef-LICENSE')
    const bannerFooter = createBannerFooter(subject)
    expect(bannerFooter.banner).toMatchSnapshot()
    expect(bannerFooter.footer).toBe('/*! Borg Collective  */')
  })

  it('Supports defining own license', () => {
    const subject = createBannerInfo(
      {
        ...pkg,
        author: {
          email: '7.9@adjunct.3.unimatrix.1.borg',
          name: 'Seven Of Nine',
        },
        license: 'MIT',
      },
      {
        firstYear: 1484,
      },
    )
    expect(subject).toMatchSnapshot()
    expect(subject).toHaveProperty(
      'author',
      'Seven Of Nine <7.9@adjunct.3.unimatrix.1.borg>',
    )
    expect(subject).toHaveProperty('license', 'MIT')
    const bannerFooter = createBannerFooter(subject)
    expect(bannerFooter.banner).toMatchSnapshot()
    expect(bannerFooter.footer).toBe('/*! Seven Of Nine  */')
  })
})

describe('createBannerFooter', () => {
  it('Snapshot sample', () => {
    const firstYear = 2003
    const seed = createBannerInfo(pkg, { firstYear })
    const subject = createBannerFooter(seed)
    expect(subject).toMatchSnapshot()
  })

  it('Is possible to add arbitrary lines', () => {
    const append = ['target: node', 'browserslist: node 10']
    const firstYear = 2003
    const seed = createBannerInfo(pkg, { firstYear })
    const subject = createBannerFooter(seed, append)
    const YYYY = new Date().getFullYear()
    expect(subject).toHaveProperty(
      'banner',
      `/*!
 * assimilate v436.0.1
 *
 * Maintainer: Example Author
 *
 * target: node
 * browserslist: node 10
 *
 * LicenseRef-LICENSE
 *
 * © 2003-${YYYY} Example Author
 */`,
    )
    expect(subject).toHaveProperty('footer', `/*! Example Author  */`)
  })

  it('Is possible to override default vendor', () => {
    const vendor = 'Gammick International 2000 Inc.'
    const seed = createBannerInfo(pkg, { vendor })
    const subject = createBannerFooter(seed)
    expect(subject).toHaveProperty('footer', `/*! ${vendor}  */`)
  })
})
