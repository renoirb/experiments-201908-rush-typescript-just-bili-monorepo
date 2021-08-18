import { RushStringBuilder } from './rush-string-builder'
import type { IStringBuilderOptions } from './types'

const FIXTURE_WHEN_VALID_MONOREPO = {
  jenkinsBaseUrl: 'https://jenkins.my-org-name.example.org/jenkins',
  nexusBaseUrl: 'https://nexus.my-org-name.example.org',
  nexusNamespace: 'some-nexus-npm-namespace',
  teamName: 'dev-example-team-name',
  projectSlug: 'some-example-monorepo',
  ownerProjectSlug: 'my-org-name/some-example-monorepo',
  repositoryBaseUrl: 'https://github.com',
} as const as IStringBuilderOptions

describe('RushStringBuilder', () => {
  let subjectCtorArgument: IStringBuilderOptions
  let subject: RushStringBuilder
  describe('When valid project defined', () => {
    subjectCtorArgument = Object.freeze(FIXTURE_WHEN_VALID_MONOREPO)
    beforeEach(() => {
      subject = new RushStringBuilder(subjectCtorArgument)
    })

    it('has a valid gitHubWebBaseUrl', () => {
      expect(subject).toHaveProperty(
        'gitHubWebBaseUrl',
        expect.stringContaining(FIXTURE_WHEN_VALID_MONOREPO.repositoryBaseUrl),
      )
    })
    it('has a valid gitHubSshUrl', () => {
      expect(subject).toHaveProperty(
        'gitHubSshUrl',
        'git@github.com:my-org-name/some-example-monorepo.git',
      )
    })
  })
})
