import { PackageJson } from './package';
import { stringifyAuthor } from './people-field';

const commentedLines = (lines: string[] = []): string[] => {
  return lines.map(line => ` * ${line}`);
};

export interface BannerInfo {
  /** Project Author as a string */
  author: string;
  /** Project name */
  name: string;
  /** Package version */
  version: string;
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
  license: string;
  /** Vendor name, non standard to package.json schema, e.g. ACME Corp. */
  vendor: string;
  /**
   * Vendor name
   *
   * Non standard to package.json schema
   *
   * ```
   * Copyright (c) ACME Corp. 2015-2019
   * ```
   */
  copyright: string;
}

/**
 * Source code banner preformatted
 */
export interface BannerFooter {
  banner: string | null;
  footer: string | null;
}

/**
 * Wrap lines into a comment block.
 *
 * @param {Array.<string>} lines
 */
export const wrapCommentBlock = (lines: string[] = []): string => {
  const copiedLines = lines.slice();
  const isOneLine = copiedLines.length < 2;
  const out: string[] = ['/**'];
  if (isOneLine) {
    out.push(...copiedLines);
  } else {
    out.push(...commentedLines(copiedLines));
  }
  out.push(' */\n\n');
  const stringified = isOneLine ? out.join(' ') : out.join('\n');
  return stringified.replace(/\s\n/g, `\n`);
};

export const createLicenseFileContents = (banner: BannerInfo): string => {
  return `
${banner.copyright}
  `;
};

export const createBannerInfo = (
  pkg: Partial<PackageJson> = {},
  vendor = 'ACME Corp.',
): BannerInfo => {
  const firstYear = 2015;
  const currentYear = new Date().getFullYear();

  const author = `${vendor}`;

  const out: BannerInfo = {
    author,
    license: pkg.license || 'LicenseRef-LICENSE',
    name: pkg.name || '',
    version: pkg.version || '',
    vendor,
    copyright: `Copyright (c) ${firstYear}-${currentYear} ${vendor}`,
  };

  if (pkg) {
    if (pkg.author) {
      out.author =
        typeof pkg.author === 'string'
          ? pkg.author
          : stringifyAuthor(pkg.author);
    }
    if (typeof pkg.license === 'string') {
      out.license = pkg.license;
    }
  }

  return out;
};

/**
 * Extract banner and footer info out of package.json
 * Format them as string.
 *
 * @public
 */
export const createBannerFooter = (
  info: BannerInfo,
  appendLines: string[] = [],
): BannerFooter => {
  const firstYear = 2015;

  const currentYear = new Date().getFullYear();

  const bannerLines: string[] = [];

  if (info) {
    bannerLines.push(`${info.name} v${info.version}`);
    bannerLines.push('');
    bannerLines.push(`Maintainer: ${info.author}`);
    bannerLines.push('');
  }

  const maybeToAppend = appendLines.slice().filter(t => typeof t === 'string');
  if (maybeToAppend.length > 0) {
    bannerLines.push(...maybeToAppend);
    bannerLines.push('');
  }

  if (info.license) {
    bannerLines.push(`${info.license}`);
    bannerLines.push('');
  }

  bannerLines.push(`© ${firstYear}-${currentYear} ${info.vendor}`);

  const banner = wrapCommentBlock(bannerLines).trim();
  const footer = wrapCommentBlock([`${info.vendor}`]).trim();

  const out: BannerFooter = {
    banner,
    footer,
  };

  return out;
};
