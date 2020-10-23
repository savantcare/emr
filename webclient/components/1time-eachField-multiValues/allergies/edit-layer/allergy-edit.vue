<template>
  <oneTextAreaAdd
    propComponentName="allergies"
    propReferToComponentInUiAtSingularClassification="allergy"
    propReferToComponentInUiAtPluralClassification="allergies"
    :propFormFields="dataFormFields"
    :firstProp="firstProp"
  ></oneTextAreaAdd>
</template>

<script>
import oneTextAreaAdd from '@/components/1time-eachField-multiValues/common/edit-layer/edit-design-1.vue'

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
    oneTextAreaAdd,
  },
}
</script>
