<template>
  <div>
    <showContentInCardComponent
      mainCardName="Correlate"
      :childCardsArray="cfArOfCorrelateComponentsForDisplay"
      clientSideDBLevelTableActions="edit"
      clientSideCardLevelActions="remove, info"
      gridDesign="sc-top-most-parent-body-grid"
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
      obj.componentPath = 'pt-info/combined/correlate/graph-design-1.vue'
      obj.componentObj = require('@/components/' + obj.componentPath).default

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
