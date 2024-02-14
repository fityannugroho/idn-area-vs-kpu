import { getData, type Areas as BaseAreas } from 'idn-area-data'
import { dbClient } from './db'

export type Areas = Exclude<BaseAreas, 'islands'>

export async function getIdnAreaData(area: Areas) {
  return (
    await getData<{ code: string; name: string }>(area, {
      transform: {
        values: {
          code: (value) => value.replaceAll('.', ''),
          name: (value) => {
            const v = value.toUpperCase()

            if (area === 'regencies') {
              return v.replace('KABUPATEN ', '')
            }

            return v
          },
        },
      },
    })
  ).map((d) => ({ code: d.code, name: d.name }))
}

export async function getWilayahKpu(area: Areas) {
  const areaByLevel: { [key in Areas]: number } = {
    provinces: 1,
    regencies: 2,
    districts: 3,
    villages: 4,
  }

  const data = await dbClient.query.wilayah.findMany({
    where: (data, { eq, and }) => and(eq(data.tingkat, areaByLevel[area])),
    orderBy: (data, { asc }) => [asc(data.kode)],
  })

  return data.map((d) => ({ code: d.kode, name: d.nama }))
}
