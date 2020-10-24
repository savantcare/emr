<template>
  <fieldMultiValuesAdd
    propComponentName="family_history"
    :propFormFields="dataFormFields"
    propReferToComponentInUiAtSingularClassification="family history"
    propReferToComponentInUiAtPluralClassification="family history"
  ></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/1time-eachField-multiValues/common/edit-layer/add-ct.vue'

export default {
  data: function () {
    return {
      dataFormFields: [
        { fieldName: 'relationship', fieldType: '', span: 6 },
        { fieldName: 'description', fieldType: 'textarea', span: 12 },
      ],
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
