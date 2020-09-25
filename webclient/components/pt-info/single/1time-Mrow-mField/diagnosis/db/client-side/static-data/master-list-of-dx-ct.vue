
<template>
  <div></div>
</template>

<script>
import clientSideTblMasterDiagnosis from '../structure/master-of-diagnosis-table'
// import jsonMasterOfDiagnosis from './diagnosisdMatser.json'

export default {
  data() {
    return {
      // masterDiagnosis: jsonMasterOfDiagnosis.data
      masterDiagnosis: [
        {
          name: 'Academic or educational problem'
        },
        {
          name: 'Acculturation difficulty'
        },
        {
          name: 'Acute stress disorder'
        },
        {
          name: 'Adjustment disorder, Unspecified'
        },
        {
          name: 'Adjustment disorder, With anxiety'
        },
        {
          name: 'Adjustment disorder, With depressed mood'
        },
        {
          name: 'Adjustment disorder, With disturbance of conduct'
        },
        {
          name: 'Adjustment disorder, With mixed anxiety and depressed mood'
        },
        {
          name: 'Adjustment disorder, With mixed disturbance of emotions and conduct'
        },
        {
          name: 'Adult antisocial behavior'
        },
        {
          name: 'Adult physical abuse by nonspouse or nonpartner, Confirmed, Initial encounter'
        },
        {
          name: 'Adult physical abuse by nonspouse or nonpartner, Confirmed, Subsequent encounter'
        },
        {
          name: 'Adult physical abuse by nonspouse or nonpartner, Suspected, Initial encounter'
        },
      ]
    }
  },
  mounted() {
    if(this.masterDiagnosis.length) {
      this.bindMasterData(this.masterDiagnosis);
    }
  },
  methods: {
    bindMasterData(array) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        clientSideTblMasterDiagnosis.insert({
          data: {
            diagnosisName: element.name,
          },
        })
      }
    }
  }
}
</script>
