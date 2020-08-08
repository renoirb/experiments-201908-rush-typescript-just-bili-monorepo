import type {
  IPackageJson,
  IBannerInfo,
  IBrandingInterface,
  IBannerFooter,
} from './types'
import { stringifyAuthor } from './utils'

const wrapCommentLines = (lines: string[] = []): string[] => {
  return lines.map((line) => ` * ${line}`)
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
    out.push(...wrapCommentLines(copiedLines))
  }
  out.push(' */\n\n')
  const stringified = isOneLine ? out.join(' ') : out.join('\n')
  return stringified.replace(/\s\n/g, `\n`)
}

/**
 * From a package.json, pick properties
 * and attempt at guessing properties for handling
 * banner.
 *
 * @public
 */
export const createBannerInfo = (
  pkg: Partial<IPackageJson> = {},
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
export const handleBannerInfo = (
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

export const createBannerFooter = (
  pkg: Partial<IPackageJson> = {},
  branding: Partial<IBrandingInterface> = {},
  appendLines: string[] = [],
): IBannerFooter =>
  handleBannerInfo(createBannerInfo(pkg, branding), appendLines)
