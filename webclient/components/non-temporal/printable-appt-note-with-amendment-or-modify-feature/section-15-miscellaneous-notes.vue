<template>
  <div>
    <printNote
      propComponentName="misc_notes"
      :propApptId="propApptId"
      :propFormFields="dataFormFields"
      propReferToComponentInUiAtPluralClassification="miscellaneous notes"
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
      dataFormFields: [{ fieldName: 'description', fieldType: 'textarea', span: 12 }],
    }
  },
}
</script>
