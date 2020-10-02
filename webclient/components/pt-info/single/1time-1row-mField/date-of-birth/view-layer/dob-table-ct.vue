<!-- Master doc is at reference implementation name/view-layer/table-ct.vue. This file has doc unique to this ct 
Code synced with ref implementation on 4th august 2020
 -->
<template>
  <div>
    <showContentInCardComponent
      propMainCardName="Date of birth"
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
      <div
        slot="bodySlotContentFromParentToShowAboveChildCards"
        class="box-card sc-individual-child-card"
      >
        <el-button-group style="float: right; display: none">
          <el-button
            type="primary"
            size="mini"
            style="padding: 3px"
            plain
            tabindex="-1"
            @click="
              mfOpenEditCtInEditLayer(
                cfLatestDataRowFromClientSideTable['clientSideUniqRowId'],
                'date of birth - edit'
              )
            "
            class="el-icon-edit"
          ></el-button>
          <el-button
            v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true"
            type="success"
            size="mini"
            style="padding: 3px"
            plain
            tabindex="-1"
            @click="mfSendReviewedEvent()"
            >S</el-button
          >
          <el-button
            v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true"
            type="danger"
            size="mini"
            style="padding: 3px"
            plain
            tabindex="-1"
            @click="mfSendResetFormEvent()"
            >R</el-button
          >
        </el-button-group>

        <el-button
          :type="mfTypeOfButton('dateOfBirthInMilliseconds')"
          plain
          :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
          size="small"
          >{{ cfFormatDateOfBirth }}</el-button
        >
        <el-button :type="mfTypeOfButton('notes')" plain size="small">{{
          cfLatestDataRowFromClientSideTable['notes']
        }}</el-button>
      </div>
    </showContentInCardComponent>
  </div>
</template>

<script>
import moment from 'moment'
import mxViewLayer from '../code-common-for-all-1r-mf/view-layer.js'
import showContentInCardComponent from '@/components/pt-info/single/common/show-content-in-card-component.vue'

export default {
  components: { showContentInCardComponent },

  mixins: [mxViewLayer],
  props: {
    formType: {
      default: 'stand-alone',
      type: String,
    },
  },
  computed: {
    cfFormatDateOfBirth() {
      return moment(this.cfLatestDataRowFromClientSideTable.dateOfBirthInMilliseconds).format(
        'MMM DD YYYY'
      ) // parse integer
    },
  },
}
</script>
