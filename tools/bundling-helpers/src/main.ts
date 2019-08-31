import { PackageJsonLookup, IPackageJson } from '@microsoft/node-core-library';
import {
  createBannerInfo,
  BannerFooter,
  BannerInfo,
  createBannerFooter,
} from './banner';
import { PeopleField } from './people-field';

export interface PackageIdentityInterface {
  banners: BannerFooter;
  info: BannerInfo;
  pkg: IPackageJson;
  projectPath: string;
}

export interface BrandingInterface {
  vendor: string;
  author: PeopleField;
}

export const main = (
  projectPath: string,
  branding: Partial<BrandingInterface> = {},
): PackageIdentityInterface => {
  const brandingData: BrandingInterface = {
    vendor: 'Example Corp.',
    author: {
      name: 'Example Corp.',
    },
    ...branding,
  };
  const pkg: IPackageJson = PackageJsonLookup.loadOwnPackageJson(projectPath);
  const info = createBannerInfo(pkg, brandingData.vendor);
  const banners = createBannerFooter(info);

  const out: PackageIdentityInterface = {
    banners,
    info,
    pkg,
    projectPath,
  };

  return out;
};
