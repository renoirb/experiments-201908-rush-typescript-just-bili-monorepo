import { PackageJson } from './package'
import { stringifyAuthor, PeopleField } from './people-field'

export interface IBrandingInterface {
  author: PeopleField
  authors?: PeopleField[]
  firstYear?: number
  vendor?: string
}

const commentedLines = (lines: string[] = []): string[] => {
  return lines.map((line) => ` * ${line}`)
}

export interface IBannerInfo {
  /** Project Author as a string */
  author: string
  /** Project name */
  name: string
  /** Package version */
  version: string
  /**
   * License name
   *
   * MUST BE [SPDX format][spdx].
   * Notice that LicenseRef-LICENSE make it possible to tell anything
   * non standard to be included.
   * Which will be where we'll tell it's All Rights Reserved ACME Corp.
   *
   * ```
   * LicenseRef-LICENSE
   * ```
   *
   * [spdx]: https://spdx.org/licenses/
   */
  license: string
  /** Vendor name, non standard to package.json schema, e.g. ACME Corp. */
  vendor: string
  /**
   * Vendor name
   *
   * Non standard to package.json schema
   *
   * ```
   * Copyright (c) ACME Corp. 2015-2019
   * ```
   */
  copyright: string
}

/**
 * Source code banner preformatted
 */
export interface IBannerFooter {
  readonly banner: string | ''
  readonly footer: string | ''
}

/**
 * Wrap lines into a comment block.
 *
 * @param {Array.<string>} lines
 */
export const wrapCommentBlock = (lines: string[] = []): string => {
  const copiedLines = lines.slice()
  const isOneLine = copiedLines.length < 2
  const out: string[] = ['/*!']
  if (isOneLine) {
    out.push(...copiedLines)
  } else {
    out.push(...commentedLines(copiedLines))
  }
  out.push(' */\n\n')
  const stringified = isOneLine ? out.join(' ') : out.join('\n')
  return stringified.replace(/\s\n/g, `\n`)
}

export const createLicenseFileContents = (banner: IBannerInfo): string => {
  return `
${banner.copyright}
  `
}

export const createBannerInfo = (
  pkg: Partial<PackageJson> = {},
  branding: Partial<IBrandingInterface>,
): IBannerInfo => {
  const currentYear = new Date().getFullYear()
  const fallbackAuthor = 'Example Author'

  const author =
    pkg.author && typeof pkg.author !== 'string' && pkg.author.name
      ? pkg.author.name
      : typeof pkg.author === 'string'
      ? pkg.author
      : fallbackAuthor
  const vendor = branding.vendor ? branding.vendor : author
  const firstYear = branding.firstYear ? branding.firstYear : false
  const yearRangeStr = firstYear ? `${firstYear}-${currentYear}` : currentYear
  const copyright = `Copyright (c) ${yearRangeStr} ${vendor}`

  const out: IBannerInfo = {
    author,
    license: pkg.license || 'LicenseRef-LICENSE',
    name: pkg.name || '',
    version: pkg.version || '',
    vendor,
    copyright,
  }

  if (pkg) {
    if (pkg.author) {
      out.author =
        typeof pkg.author === 'string'
          ? pkg.author
          : stringifyAuthor(pkg.author)
    }
    if (typeof pkg.license === 'string') {
      out.license = pkg.license
    }
  }

  return out
}

/**
 * Extract banner and footer info out of package.json
 * Format them as string.
 *
 * @public
 */
export const createBannerFooter = (
  info: IBannerInfo,
  appendLines: string[] = [],
): IBannerFooter => {
  const bannerLines: string[] = []

  if (info) {
    bannerLines.push(`${info.name} v${info.version}`)
    bannerLines.push('')
    bannerLines.push(`Maintainer: ${info.author}`)
    bannerLines.push('')
  }

  const maybeToAppend = appendLines.slice().filter((t) => typeof t === 'string')
  if (maybeToAppend.length > 0) {
    bannerLines.push(...maybeToAppend)
    bannerLines.push('')
  }

  if (info.license) {
    bannerLines.push(`${info.license}`)
    bannerLines.push('')
  }

  bannerLines.push(info.copyright.replace(/copyright \(c\)/i, '©'))

  const banner = wrapCommentBlock(bannerLines).trim()
  const footer = wrapCommentBlock([`${info.vendor}`]).trim()

  const out: IBannerFooter = {
    banner,
    footer,
  }

  return out
}
