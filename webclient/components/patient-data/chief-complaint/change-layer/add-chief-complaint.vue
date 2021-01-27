<template>
  <div>
    <ctAddForm :_formDef="formDef"></ctAddForm>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import { chiefComplaintFormDef } from '@/components/patient-data/chief-complaint/db/client-side/structure/chief-complaint-of-a-patient-table.js'

export default {
  data: function () {
    return {
      input: '',
      formDef: chiefComplaintFormDef,
    }
  },
  components: {
    ctAddForm,
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss">
.scroll {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  position: relative;
}
.container {
  max-width: 355px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
}
// .v-tribute {
//   width: 100%;
//   position: relative;
// }
input[type='text'],
textarea {
  padding: 1rem;
  width: 100%;
  border-radius: 0.25rem;
  outline: none;
  &:focus {
    background: #fff;
  }
}
// .menu-tribute-list {
//   width: 100%;
//   height: 100%;
// }
// Tribute-specific styles
</style>
