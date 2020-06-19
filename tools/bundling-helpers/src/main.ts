import { PackageJsonLookup, IPackageJson } from '@rushstack/node-core-library'
import {
  createBannerInfo,
  createBannerFooter,
  BrandingInterface,
} from './banner'
import { PackageIdentityInterface } from './package'

export const main = (
  projectPath: string,
  branding: Partial<BrandingInterface> = {},
): PackageIdentityInterface => {
  const pkg: IPackageJson = PackageJsonLookup.loadOwnPackageJson(projectPath)
  const info = createBannerInfo(pkg, branding)
  const banners = createBannerFooter(info)

  const out: PackageIdentityInterface = {
    banners,
    info,
    pkg,
    projectPath,
  }

  return out
}
