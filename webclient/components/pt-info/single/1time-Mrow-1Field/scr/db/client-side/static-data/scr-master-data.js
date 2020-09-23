import ClientSideTblMasterScreening from '~/components/pt-info/single/1time-Mrow-1Field/scr/db/client-side/structure/scr-table-master'
export default {
  mounted() {
    ClientSideTblMasterScreening.insert({
      data: {
        scrUUID: 1,
        scrName: 'depression',
        scientificName: 'PHQ9',
        clinicalStudies: 'Columbia University',
      },
    })
    ClientSideTblMasterScreening.insert({
      data: {
        scrUUID: 2,
        scrName: 'ADHD',
        scientificName: 'ADHD',
        clinicalStudies: '-',
      },
    })
    ClientSideTblMasterScreening.insert({
      data: {
        scrUUID: 3,
        scrName: 'PTSD',
        scientificName: 'PTSD',
        clinicalStudies: '-',
      },
    })
    ClientSideTblMasterScreening.insert({
      data: {
        scrUUID: 4,
        scrName: 'Bipolar',
        scientificName: 'Bipolar',
        clinicalStudies: '-',
      },
    })
    ClientSideTblMasterScreening.insert({
      data: {
        scrUUID: 5,
        scrName: 'Schizophrenia',
        scientificName: 'Schizophrenia',
        clinicalStudies: '-',
      },
    })
    ClientSideTblMasterScreening.insert({
      data: {
        scrUUID: 6,
        scrName: 'Substance Abuse',
        scientificName: 'Substance Abuse',
        clinicalStudies: '-',
      },
    })
    ClientSideTblMasterScreening.insert({
      data: {
        scrUUID: 7,
        scrName: 'Alcoholism screening',
        scientificName: 'Alcoholism screening',
        clinicalStudies: '-',
      },
    })
  },
}
