<!-- Reference implementation for non numeric hence no graph-->
<template>
  <div>
    <showContentInCardComponent
      propMainCardName="Minimum component"
      :propActionsThatCanBeInvokedFromCardHeader="[
        {
          actionDescription: 'Toggle card display',
          actionUIRepresentedByElementIoIconClass: 'el-icon-remove-outline',
        },
        {
          actionDescription: 'Close card',
          actionUIRepresentedByElementIoIconClass: 'el-icon-close',
        },
      ]"
      propGridDesignTopMostParentBody="s-css-class-top-most-card-body-grid"
    >
      <!-- Passing name of the fld so mfTypeOfButton can decide if the fld is changed or not -->
      <div
        slot="bodySlotContentFromParentToShowAboveChildCards"
        class="box-card sc-individual-child-card"
      >
        jai kali ma
      </div>
    </showContentInCardComponent>
  </div>
</template>

<script>
import showContentInCardComponent from '@/components/pt-info/single/common/show-content-in-card-component.vue'

export default {
  components: { showContentInCardComponent },
}
</script>
