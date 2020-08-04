<template>
  <div>
    <el-button :type="cfTypeOfButton" plain :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1">{{
      cfHeight['heightInInches']
    }}</el-button>
    <el-button :type="cfTypeOfButton" plain>{{ cfHeight['dateOfMeasurement'] }}</el-button>
    <el-button :type="cfTypeOfButton" plain>{{ cfHeight['notes'] }}</el-button>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(cfHeight['id'])"
      >C</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMounted: false,
    }
  },
}
</script>
