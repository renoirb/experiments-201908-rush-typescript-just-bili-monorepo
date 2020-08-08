/* eslint-env jest */

import { IPackageJson } from '../types'
import {
  handleBannerInfo,
  createBannerInfo,
  createBannerFooter,
} from '../banner-footer'

jest.spyOn(global.Date.prototype, 'getFullYear').mockImplementation(() => 2373)

const pkg: IPackageJson = {
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
    const pkgFixture = {
      ...pkg,
      author: {
        email: '7.9@adjunct.3.unimatrix.1.borg',
        name: 'Seven Of Nine',
      },
    }
    const brandingFixture = {
      firstYear: 1484,
      vendor: 'Borg Collective',
    }
    const appendFixture = ['target: node', 'browserslist: node 10']
    const subject = createBannerInfo(pkgFixture, brandingFixture)
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
    const bannerFooter = handleBannerInfo(subject)
    expect(bannerFooter.banner).toMatchSnapshot()
    const together = createBannerFooter(
      pkgFixture,
      brandingFixture,
      appendFixture,
    )
    expect(together).toMatchSnapshot()
    expect(bannerFooter.footer).toBe('/*! Borg Collective  */')
    expect(together.footer).toBe('/*! Borg Collective  */')
  })

  it('Supports defining own license', () => {
    const pkgFixture = {
      ...pkg,
      author: {
        email: '7.9@adjunct.3.unimatrix.1.borg',
        name: 'Seven Of Nine',
      },
      license: 'MIT',
    }
    const brandingFixture = {
      firstYear: 1484,
    }
    const appendFixture = ['target: node', 'browserslist: node 10']
    const subject = createBannerInfo(pkgFixture, brandingFixture)
    expect(subject).toMatchSnapshot()
    expect(subject).toHaveProperty(
      'author',
      'Seven Of Nine <7.9@adjunct.3.unimatrix.1.borg>',
    )
    expect(subject).toHaveProperty('license', 'MIT')
    const bannerFooter = handleBannerInfo(subject)
    expect(bannerFooter.banner).toMatchSnapshot()
    const together = createBannerFooter(
      pkgFixture,
      brandingFixture,
      appendFixture,
    )
    expect(together).toMatchSnapshot()
    expect(bannerFooter.footer).toBe('/*! Seven Of Nine  */')
    expect(together.footer).toBe('/*! Seven Of Nine  */')
  })
})

describe('handleBannerInfo(createBannerFooter)', () => {
  it('Snapshot sample', () => {
    const firstYear = 2003
    const seed = createBannerInfo(pkg, { firstYear })
    const subject = handleBannerInfo(seed)
    expect(subject).toMatchSnapshot()
  })

  it('Is possible to add arbitrary lines', () => {
    const append = ['target: node', 'browserslist: node 10']
    const firstYear = 2003
    const seed = createBannerInfo(pkg, { firstYear })
    const subject = handleBannerInfo(seed, append)
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
    const subject = handleBannerInfo(seed)
    expect(subject).toHaveProperty('footer', `/*! ${vendor}  */`)
  })
})
