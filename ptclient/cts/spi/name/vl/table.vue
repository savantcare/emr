<template>
  <div>
    <el-button type="info" plain :tabindex="cfPosInArCards * 100 + 1">Vikas</el-button>
    <el-button type="info" plain>Kedia</el-button>
    <el-button
      type="primary"
      size="mini"
      style="padding: 3px;"
      plain
      tabindex="-1"
      @click="mfOpenCCtInCl(props.row.$id)"
      >C</el-button
    >
  </div>
</template>

<script>
export default {
  computed: {
    cfPosInArCards() {
      const arCards = this.$store.state.vstObjCardsInCSOfVL.arCards
      console.log(arCards)
      const obj = arCards.find((x) => x.label === 'name')
      const idx = arCards.indexOf(obj)
      console.log(idx)
      return idx
    },
  },
}
</script>
