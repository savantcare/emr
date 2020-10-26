<template>
  <ctAddStructure
    propComponentName="family_history"
    propReferToComponentInUiAtSingularClassification="family history"
    propReferToComponentInUiAtPluralClassification="family history"
    :propFormFields="dataFormFields"
    :firstProp="firstProp"
  ></ctAddStructure>
</template>

<script>
import ctAddStructure from '@/components/temporal/1-framework/edit-layer/edit-structure.vue'

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
    ctAddStructure,
  },
}
</script>
