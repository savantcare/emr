<template>
  <div>
    <showContentInCardComponent
      propMainCardName="Body measurement"
      :propChildCardsArray="cfArOfBMComponentsForDisplay"
      :propClientSideTableLevelActions="[{ content: 'minimize', class: 'el-icon-remove-outline' }]"
      propClientSideRowLevelActions="remove, info"
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
    cfArOfBMComponentsForDisplay() {
      var arBMForDisplay = new Array()

      var obj = new Object()
      obj.componentPath =
        'pt-info/single/1time-1row-mField/bm/sub-cts/weight/view-layer/table-ct.vue'
      obj.componentObj = require('@/components/' + obj.componentPath).default
      arBMForDisplay.push(obj)

      var obj = new Object()
      obj.componentPath =
        'pt-info/single/1time-1row-mField/bm/sub-cts/height/view-layer/table-ct.vue'
      obj.componentObj = require('@/components/' + obj.componentPath).default
      arBMForDisplay.push(obj)

      var obj = new Object()
      obj.componentPath =
        'pt-info/single/1time-1row-mField/bm/sub-cts/temperature/view-layer/table-ct.vue'
      obj.componentObj = require('@/components/' + obj.componentPath).default
      obj.componentObj = require('@/components/' + obj.componentPath).default
      arBMForDisplay.push(obj)

      var obj = new Object()
      obj.componentPath =
        'pt-info/single/1time-1row-mField/bm/sub-cts/blood-pressure/view-layer/table-ct.vue'
      obj.componentObj = require('@/components/' + obj.componentPath).default
      arBMForDisplay.push(obj)

      var obj = new Object()
      obj.componentPath =
        'pt-info/single/1time-1row-mField/bm/sub-cts/blood-sugar/view-layer/table-ct.vue'
      obj.componentObj = require('@/components/' + obj.componentPath).default
      arBMForDisplay.push(obj)

      var obj = new Object()
      obj.componentPath =
        'pt-info/single/1time-1row-mField/bm/sub-cts/waist-circumference/view-layer/table-ct.vue'
      obj.componentObj = require('@/components/' + obj.componentPath).default
      arBMForDisplay.push(obj)

      var obj = new Object()
      obj.componentPath =
        'pt-info/single/1time-1row-mField/bm/sub-cts/pulse/view-layer/table-ct.vue'
      obj.componentObj = require('@/components/' + obj.componentPath).default
      arBMForDisplay.push(obj)

      var obj = new Object()
      obj.componentPath =
        'pt-info/single/1time-1row-mField/bm/sub-cts/oxygen-saturation/view-layer/table-ct.vue'
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

<style scoped>
/* Ref: https://www.freecodecamp.org/news/a-beginners-guide-to-css-grid-3889612c4b35/

Q) Why use grid and not use flex or breakpoints?
Breakpoints is 7 year old tech. The breakpoints were small / medium / large.
Flex is 4 year old tech
Grid is 2 year old tech
"There is no method in flexbox to tell items in one row to line up with items in the row above"
Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Mastering_Wrapping_of_Flex_Items
Hence using the grid system

Q) Where can i see the example of flex?
The previous commit (d72c5110df1450385bdc8a5ec867095cde453e1e) was flex I did not say the number of columns. 
The number of columns was being auto-decided depending on the space available.
 */
</style>
