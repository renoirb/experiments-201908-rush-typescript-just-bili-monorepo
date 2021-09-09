import { STRING_BUILDER_DEFAULTS } from './consts'
import type { IStringBuilderOptions } from './types'

/**
 * String builder utility for helping managing docs.
 *
 * @public
 */
export class BaseStringBuilder {
  /**
   * @public
   */
  readonly context: IStringBuilderOptions

  constructor(options: Partial<IStringBuilderOptions>) {
    const context = Object.freeze({ ...STRING_BUILDER_DEFAULTS, ...options })
    if (/^https?:\/\//.test(context.repositoryBaseUrl) === false) {
      const message = `Invalid repositoryBaseUrl ("${context.repositoryBaseUrl}") it MUST start by HTTP`
      throw new TypeError(message)
    }
    this.context = context
  }
}
