<template>
  <fieldMultiValuesAdd
    propComponentName="family_history"
    propReferToComponentInUiAtSingularClassification="family history"
    propReferToComponentInUiAtPluralClassification="family history"
    :propFormFields="dataFormFields"
    :firstProp="firstProp"
  ></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/1time-eachField-multiValues/common/edit-layer/edit-design-1.vue'

export default {
  data: function () {
    return {
      dataFormFields: [
        { fieldName: 'description', fieldType: 'textarea', span: 12 },
        { fieldName: 'relationship', fieldType: '', span: 6 },
      ],
    }
  },
  props: {
    firstProp: {
      type: Number,
    },
  },
  mounted() {
    //    console.log(this.dataFormFields)
  },

  components: {
    fieldMultiValuesAdd,
  },
}
</script>
