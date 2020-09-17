// Master doc is at reference implementation rem/db/full-sync-with-server-db-mixin.js.
//  This file has doc unique to this ct Code synced with ref implementation on 17th sept 2020
import objOrmMaster from '~/cts/spi/1t-Mrow-1Field/scr/db/vuex-orm/orm-scr-master-list.js'
export default {
  mounted() {
    objOrmMaster.insert({
      data: {
        uuid: 1,
        scrName: 'depression',
        scientificName: 'PHQ9',
        clinicalStudies: 'Columbia University',
      },
    })
    objOrmMaster.insert({
      data: {
        uuid: 2,
        scrName: 'ADHD',
        scientificName: 'ADHD',
        clinicalStudies: '-',
      },
    })
    objOrmMaster.insert({
      data: {
        uuid: 3,
        scrName: 'PTSD',
        scientificName: 'PTSD',
        clinicalStudies: '-',
      },
    })
    objOrmMaster.insert({
      data: {
        uuid: 4,
        scrName: 'Bipolar',
        scientificName: 'Bipolar',
        clinicalStudies: '-',
      },
    })
    objOrmMaster.insert({
      data: {
        uuid: 5,
        scrName: 'Schizophrenia',
        scientificName: 'Schizophrenia',
        clinicalStudies: '-',
      },
    })
    objOrmMaster.insert({
      data: {
        uuid: 6,
        scrName: 'Substance Abuse',
        scientificName: 'Substance Abuse',
        clinicalStudies: '-',
      },
    })
    objOrmMaster.insert({
      data: {
        uuid: 7,
        scrName: 'Alcoholism screening',
        scientificName: 'Alcoholism screening',
        clinicalStudies: '-',
      },
    })
  },
}
