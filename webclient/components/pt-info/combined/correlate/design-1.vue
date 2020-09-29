<template>
  <div>
    <showContentInCardComponent
      propMainCardName="Correlate"
      :propClientSideTableLevelActions="[
        { content: 'Toggle card', elementIoIconClass: 'el-icon-remove-outline' },
      ]"
      :propClientSideRowLevelActions="[{}]"
      propGridDesignTopMostParentBody="s-css-class-top-most-card-body-grid"
    >
      <slot><graph></graph></slot>
    </showContentInCardComponent>
  </div>
</template>

<script>
import showContentInCardComponent from '@/components/pt-info/single/common/show-content-in-card-component.vue'
import graph from '@/components/pt-info/combined/correlate/graph-design-1.vue'

export default {
  components: {
    showContentInCardComponent,
    graph,
  },
  data: function () {
    return {}
  },
  computed: {
    methods: {
      mfTablePageChanged(pNewPageNumber) {
        this.tablePageNumber = pNewPageNumber
      },
      mfIconMultiDeleteClickedOnChildCard(val) {
        this.daSelectedRemForDelete = val
      },
    },
  },
}
</script>
