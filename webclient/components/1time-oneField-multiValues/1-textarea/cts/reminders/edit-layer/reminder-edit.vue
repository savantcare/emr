<template>
  <oneTextAreaAdd
    propComponentName="reminders"
    propReferToComponentInUiAtSingularClassification="reminder"
    propReferToComponentInUiAtPluralClassification="reminders"
    :propFormFields="dataFormFields"
    :firstProp="firstProp"
  ></oneTextAreaAdd>
</template>

<script>
import oneTextAreaAdd from '@/components/1time-oneField-multiValues/1-textarea/edit-layer/edit-design-1.vue'

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
