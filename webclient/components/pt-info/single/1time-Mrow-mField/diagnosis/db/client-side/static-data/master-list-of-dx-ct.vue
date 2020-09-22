
<template>
  <div></div>
</template>

<script>
import clientSideTblMasterDiagnosis from '../structure/master-of-diagnosis-table'

export default {
  data() {
    return {
      masterDiagnosis: [
        {
          diagnosisName: 'Academic or educational problem'
        },
        {
          diagnosisName: 'Depersonalization/derealization disorder'
        },
        {
          diagnosisName: 'Adjustment disorder, With mixed disturbance of emotions and conduct'
        },
        {
          diagnosisName: 'Adjustment insomnia'
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
            diagnosisName: element.diagnosisName,
          },
        })
      }
    }
  }
}
</script>
