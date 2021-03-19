<template>
  <div>
    <ctAddForm :_formDef="formDef"></ctAddForm>
  </div>
</template>

<script>
import ctAddForm from '@/components//papers/change-appt-note/templates/add-form.vue'
import { dateOfBirthFormDef } from '@/components/patient-data/date-of-birth/db/client-side/structure/date-of-birth-of-a-patient-table.js'

export default {
  data: function () {
    return {
      input: '',
      formDef: dateOfBirthFormDef,
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
</style>
