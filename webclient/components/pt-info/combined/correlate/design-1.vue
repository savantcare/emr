<template>
  <div>
    <showContentInCardComponent
      propMainCardName="Correlate"
      :propChildCardsArray="cfArOfCorrelateComponentsForDisplay"
      :propClientSideTableLevelActions="[
        { content: 'Toggle card', class: 'el-icon-remove-outline' },
      ]"
      :propClientSideRowLevelActions="[{}]"
      propGridDesignTopMostParentBody="s-css-class-top-most-card-body-grid"
    ></showContentInCardComponent>
  </div>
</template>

<script>
import showContentInCardComponent from '@/components/pt-info/single/common/show-content-in-card-component.vue'

export default {
  components: {
    showContentInCardComponent,
  },
  data: function () {
    return {}
  },
  computed: {
    cfArOfCorrelateComponentsForDisplay() {
      var arBMForDisplay = new Array()

      var obj = new Object()
      obj.componentObj = require('@/components/' +
        'pt-info/combined/correlate/graph-design-1.vue').default

      arBMForDisplay.push(obj)

      console.log(arBMForDisplay)
      // return arrayOfComponentsToShow
      return arBMForDisplay
    },
  },
  methods: {
    mfTablePageChanged(pNewPageNumber) {
      this.tablePageNumber = pNewPageNumber
    },
    mfIconMultiDeleteClickedOnChildCard(val) {
      this.daSelectedRemForDelete = val
    },
  },
}
</script>
