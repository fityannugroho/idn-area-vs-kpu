import { diff } from 'jest-diff'
import Papa from 'papaparse'

export function toCsv<T extends unknown>(
  data: T[],
  options: Papa.UnparseConfig = {
    escapeChar: '\\',
    newline: '\n',
  },
): string {
  return Papa.unparse(data, options)
}

export function diffData(
  a: string,
  b: string,
  options?: {
    withoutColor?: boolean
  },
) {
  const noColor = (arg: string) => arg

  return diff(a, b, {
    contextLines: 2,
    expand: false,
    includeChangeCounts: true,
    ...(options?.withoutColor && {
      aColor: noColor,
      bColor: noColor,
      changeColor: noColor,
      commonColor: noColor,
      patchColor: noColor,
    }),
  })
}
