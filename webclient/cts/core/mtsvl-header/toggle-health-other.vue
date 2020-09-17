<template>
  <!-- Why not use element.io inbuilt switch
        In element.io switch the label cannot be shown on top of the switch in June 20. 
        If a way is found to show H or O on top of the switch then this library should be removed and elemenet.io built in switch component should be used
      -->
  <toggle-button
    v-model="componentType"
    style="float: right;"
    :labels="{ checked: 'H', unchecked: 'O' }"
    @change="handleChangeToggleButtonEvent"
  />
</template>

<script>
export default {
  data() {
    // KT: Why is this a function and not a object? Ref: https://vuejs.org/v2/style-guide/#Component-data-essential
    return {
      componentType: true,
    }
  },
  methods: {
    handleChangeToggleButtonEvent() {
      const type = this.componentType === true ? 'health' : 'other'
      this.$store.commit('setComponentType', type)
    },
  },
}
</script>
