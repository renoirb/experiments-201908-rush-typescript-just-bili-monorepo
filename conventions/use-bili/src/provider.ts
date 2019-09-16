export interface ProviderContext {
  packages: { [name: string]: string }
}

/**
 * Unfinished.
 *
 * IDEA: Give a manifest of packages it's bundling so
 * we can piggy-back on its runtime dependencies.
 * Maybe this is doing the same as inlining dependencies,
 * or what Rollup in the same pattern.
 *
 * What if importing projects using npm/yarn (other than pnpm)
 * actually have their own nested node_modules/ directory.
 *
 * Another use-case could be to make importing project NOT TO IMPORT
 * AGAIN the same dependency, if we can provide it from such a system.
 */
const packages = {
  bili: 'bili/package.json',
  rollup: 'rollup/package.json',
}

export const provider: ProviderContext = { packages }
