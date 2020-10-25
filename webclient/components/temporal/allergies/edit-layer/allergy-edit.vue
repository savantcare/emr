<template>
  <fieldMultiValuesAdd
    propComponentName="allergies"
    propReferToComponentInUiAtSingularClassification="allergy"
    propReferToComponentInUiAtPluralClassification="allergies"
    :propFormFields="dataFormFields"
    :firstProp="firstProp"
  ></fieldMultiValuesAdd>
</template>

<script>
import fieldMultiValuesAdd from '@/components/temporal/1-framework/edit-layer/edit-design-1.vue'

export default {
  data: function () {
    return {
      dataFormFields: [{ fieldName: 'description', fieldType: 'textarea', span: 12 }],
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
