import { PackageJsonLookup, IPackageJson } from '@rushstack/node-core-library'
import {
  createBannerInfo,
  createBannerFooter,
  IBrandingInterface,
} from './banner'
import { IPackageIdentityInterface } from './package'

export const main = (
  projectPath: string,
  branding: Partial<IBrandingInterface> = {},
): IPackageIdentityInterface => {
  const pkg: IPackageJson = PackageJsonLookup.loadOwnPackageJson(projectPath)
  const info = createBannerInfo(pkg, branding)
  const banners = createBannerFooter(info)

  const out: IPackageIdentityInterface = {
    banners,
    info,
    pkg,
    projectPath,
  }

  return out
}
