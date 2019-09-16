/* eslint-disable @typescript-eslint/explicit-function-return-type */

/**
 * @TODO #ToolsBundlingHelpersESLintJustTasks
 * UNFINISHED!
 * Almost Copy-Pasta from just-scripts/lib/tasks/eslintTask.js
 * But modified to work with workspace paths.
 * And in TypeScript.
 */

import { resolveCwd, MaybeNodeProcessContext } from '..'

export interface ContextualizedJustTaskOptionsInterface {
  moduleName: string
  entryPoint: string
}

function main(opts: Partial<ContextualizedJustTaskOptionsInterface> = {}) {
  const options: ContextualizedJustTaskOptionsInterface = {
    ...opts,
    moduleName: 'eslint',
    entryPoint: 'eslint/bin/eslint.js',
  }

  return function highOrderJustTaskFactory(context: MaybeNodeProcessContext) {
    const entryPoint = options.entryPoint
    const resolvedEntryPoint = resolveCwd(entryPoint)
    const ctx = JSON.stringify({ ...context })
    console.log('eslintTask', { options, entryPoint, resolvedEntryPoint, ctx })

    /**
     * Unfinished.
     *
     * Upcoming High Order Just____ task.
     *
     * @TODO setup equivalent to just-scripts eslintTask Just___ task
     *
     * - https://github.com/microsoft/just/blob/d4c98a4/packages/just-scripts/src/tasks/eslintTask.ts
     * - https://microsoft.github.io/just/docs/thunk
     */
  }
}

export const justTasksEslint = main
