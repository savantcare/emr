<template>
  <div>
    <printNote
      propComponentName="process_notes"
      :propApptId="propApptId"
      :propFormFields="dataFormFields"
      propReferToComponentInUiAtPluralClassification="process notes"
    ></printNote>
  </div>
</template>

<script>
import printNote from './section-10-1-textarea.vue'

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
