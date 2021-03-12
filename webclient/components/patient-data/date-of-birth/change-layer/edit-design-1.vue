<!-- Master doc is at reference implementation name/change-layer/edit-design-1.vue. This file has doc unique to this ct 
This acts as reference implementation for other Cts that use a graph.
So the heierarchy is:

Name
 1. No graph needed
 2. Graph needed
      A. Date of birth            (Doc of name is not repeated but has doc related to graph)
          1. Height        (Doc of name and Date of birth is not repeated)
          2. BMI


Code synced with ref implementation on 4th august 2020

-->
<template>
  <ctEditFormTemplate :_formDef="formDef" :firstProp="_rowIdForEdit"></ctEditFormTemplate>
</template>

<script>
import ctEditFormTemplate from '@/components/papers/change-appt-note/templates/edit-form.vue'
import { dateOfBirthFormDef } from '@/components/patient-data/date-of-birth/db/client-side/structure/date-of-birth-of-a-patient-table.js'
export default {
   data: function () {
    return {
      formDef: dateOfBirthFormDef,
    }
  },
  props: {
    _rowIdForEdit: {
      type: Number,
    },
  },
  components: {
    ctEditFormTemplate,
  },
}
</script>
