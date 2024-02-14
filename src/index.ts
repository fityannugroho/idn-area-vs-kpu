import fs from 'fs'
import path from 'path'
import { getIdnAreaData, getWilayahKpu, type Areas } from './data'
import { diffData, toCsv } from './utils/func'

async function main() {
  const args = process.argv
  const area = args[2] as Areas

  if (!area) throw new Error('Area argument can not be empty')
  if (!['provinces', 'regencies', 'districts', 'villages'].includes(area))
    throw new Error(`Invalid area '${area}'`)

  const idnAreaCsv = toCsv(await getIdnAreaData(area))
  const wilayahKpuCsv = toCsv(await getWilayahKpu(area))

  const diffResults = diffData(idnAreaCsv, wilayahKpuCsv, {
    withoutColor: true,
  })

  if (diffResults) {
    const dirPath = path.resolve(process.cwd(), 'data')

    fs.mkdirSync(dirPath, { recursive: true })
    fs.writeFileSync(path.resolve(dirPath, `diff-${area}.txt`), diffResults)
  }

  console.log(`Done comparing ${area} data`)
}

main()
  .then(() => process.exit(0))
  .catch((error: Error) => console.log(`${error.name}: ${error.message}`))
