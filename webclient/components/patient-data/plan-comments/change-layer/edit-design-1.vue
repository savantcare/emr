<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="firstProp"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components//papers/note-change/templates/edit-form.vue'
import { planCommentsFormDef } from '@/components/patient-data/plan-comments/db/client-side/structure/plan-comments-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: planCommentsFormDef,
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
    ctEditFormTemplate,
  },
}
</script>
