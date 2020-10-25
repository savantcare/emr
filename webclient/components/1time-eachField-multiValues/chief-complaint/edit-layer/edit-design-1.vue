<template>
  <fieldMultiValuesAdd propComponentName="family_history" :propFormFields="dataFormFields"></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/1time-eachField-multiValues/common/edit-layer/edit-design-1.vue'

export default {
  data: function () {
    return {
      ctDef: process.env.chiefComplaintCtDef,
    }
  },

  mounted() {
    //    console.log(this.dataFormFields)
  },

  components: {
    fieldMultiValuesAdd,
  },
}
</script>
