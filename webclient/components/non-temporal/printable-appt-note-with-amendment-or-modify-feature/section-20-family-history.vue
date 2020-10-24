<template>
  <div>
    <printNote
      propComponentName="family_history"
      :propApptId="propApptId"
      propReferToComponentInUiAtSingularClassification="family history"
      propReferToComponentInUiAtPluralClassification="family history"
      :propFormFields="dataFormFields"
    ></printNote>
  </div>
</template>

<script>
import printNote from './common-print-note-for-each-field-multi-values.vue'

export default {
  components: {
    printNote,
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      dataFormFields: [
        { fieldName: 'relationship', fieldType: '', span: 6 },
        { fieldName: 'description', fieldType: 'textarea', span: 12 },
      ],
    }
  },
}
</script>
