import { BaseStringBuilder } from './base-string-builder'
import { JENKINS_JOB_URL_VIEWS } from './consts'
import type {
  IShieldsIoColors,
  IJenkinsJobUrlViewsSuffix,
  IMarkdownImgBadge,
} from './types'

/**
 * URL Builder.
 *
 * So we can get consistent DevOps release documentation links for
 * our projects within a fully automated CI infrastructure.
 *
 * @public
 */
export class UrlBuilder extends BaseStringBuilder {
  get jenkinsJobBaseUrl(): string {
    const outcome = `https://jenkins.my-org-name.example.org/jenkins/job/${this.context.teamName}/job/${this.context.ownerProjectSlug}`
    return outcome
  }

  /**
   * Shields.io image builder.
   *
   * @param left - What is the label to use on the left
   * @param right - What is the value on the right
   * @param color - Color
   */
  createUrlShieldIo = (
    left: string,
    right: string,
    color: IShieldsIoColors | string = 'blue',
  ): string =>
    `https://shields.io/static/v1?label=${left}&message=${right}&color=${color}`

  createUrlToJenkinsBuildJob(
    branch: string,
    job: string,
    view: IJenkinsJobUrlViewsSuffix | '' = '',
  ): string {
    let suffix = ''
    if (view !== '' && JENKINS_JOB_URL_VIEWS.includes(view)) {
      suffix = view
    }
    if (Number.isNaN(+job) === true) {
      const message = `Invalid Jenkins build number "${job}", it is not a number`
      throw new Error(message)
    }
    const outcome = `${this.jenkinsJobBaseUrl}/job/branches/job/${branch}/${job}/${suffix}`
    return outcome
  }

  createMarkdownBadge = (attrs: IMarkdownImgBadge, imgSrc?: string): string => {
    const { alt, href } = attrs
    let linkInnerHtml = attrs.label
    if (imgSrc && imgSrc !== '') {
      linkInnerHtml = `![${alt ? alt : attrs.label}](${imgSrc})`
    }
    const template = href && href !== '' ? `[${linkInnerHtml}](${href})` : linkInnerHtml
    return template
  }
}
