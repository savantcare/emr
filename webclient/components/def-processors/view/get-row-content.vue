<template>
  <div>
    <span v-for="field in propFormDef.fieldsDef">
      {{ propRow[field['fieldNameInDb']] }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    propFormDef: {
      type: Object,
      required: true,
    },
    propRow: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style></style>
