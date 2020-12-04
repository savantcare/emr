<template>
  <ctAddForm :_formDef="formDef"></ctAddForm>
</template>

<script>
import ctAddForm from '@/components//papers/note-change/templates/add-form.vue'
import { medicationOrderFormDef } from '@/components/patient-data/medication-orders/db/client-side/structure/medication-order-of-a-patient-table.js'

export default {
  data: function () {
    return {
      formDef: medicationOrderFormDef,
    }
  },

  mounted() {
    //    console.log(this.dataFormFields)
  },

  components: {
    ctAddForm,
  },
}
</script>
