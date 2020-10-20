<template>
  <showContentInCardComponent
    propMainCardName="Mental status exam"
    :propActionsThatCanBeInvokedFromCardHeader="[
      {
        actionDescription: 'Multi edit',
        isDefaultAction: true,
      },
      {
        actionDescription: 'Toggle card display',
      },
      {
        actionDescription: 'Close card',
      },
    ]"
    :propClientSideRowLevelActions="[{}]"
  >
    <el-card
      slot="bodySlotContentFromParentToShowAboveChildCards"
      v-for="mentalStatusExam in cfArOfMentalStatusExamForDisplay"
      :key="mentalStatusExam.id"
      class="box-card sc-individual-child-card"
      shadow="hover"
      :style="mfGetCssClassNameForEachDataRow(mentalStatusExam)"
    >
      <el-button-group style="float: right; display: none">
        <el-tooltip class="item" effect="light" content="Click to delete" placement="top-end" :open-delay="500">
          <el-button
            style="padding: 3px; color: #c0c4cc; border: none"
            plain
            @click="mfIconDeleteClickedOnChildCard(mentalStatusExam.clientSideUniqRowId)"
            class="el-icon-circle-close"
          >
          </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="info" placement="top-end" :open-delay="500">
          <el-button style="padding: 3px; color: #c0c4cc; border: none" plain class="el-icon-discover"> </el-button>
        </el-tooltip>
      </el-button-group>

      <!-- <el-button type="text">{{ mentalStatusExam.description }}</el-button> 
          if I use the button then a long text is not getting divided into multiple lines
          if rowStateInThisSession == 9 then the div should have a orange border
          Why we are doing this?
            Doctor is sitting infront of computer suddenly a new mentalStatusExam appears. That is a confusing event.
            Instead if the new mentalStatusExam that came on screen gets a orange border with top right corner saying "New mentalStatusExam added from socket" that is much better UX.
          -->
      <div v-if="mentalStatusExam.vnRowStateInSession === 9">Added from socket {{ mentalStatusExam.description }}</div>
      <div v-else>
        {{ mentalStatusExam.cardContentOfTypeStringToShowInBodyOfCards }}
      </div>
    </el-card>
  </showContentInCardComponent>
</template>

<script>
import clientSideTblOfMasterMentalStatusExam from '../db/client-side/structure/master-table-of-mental-status-exam.js'
import clientSideTblOfPatientMentalStatusExam from '../db/client-side/structure/patient-table-of-mental-status-exam.js'
import showContentInCardComponent from '@/components/non-temporal/display-manager/show-content-in-card-component.vue'

export default {
  components: { showContentInCardComponent },
  computed: {
    cfArOfMentalStatusExamForDisplay() {
      let arOfObjectsFromClientSideDB = clientSideTblOfPatientMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483648000)
        .get()

      for (var i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        if (arOfObjectsFromClientSideDB[i].tblMentalStatusExamMasterLink.mentalStatusExamFieldType === 'bool') {
          arOfObjectsFromClientSideDB[i]['cardContentOfTypeStringToShowInBodyOfCards'] =
            arOfObjectsFromClientSideDB[i].tblMentalStatusExamMasterLink.mentalStatusExamCategory +
            ': ' +
            arOfObjectsFromClientSideDB[i].tblMentalStatusExamMasterLink.mentalStatusExamDescription
        } else {
          arOfObjectsFromClientSideDB[i]['cardContentOfTypeStringToShowInBodyOfCards'] =
            arOfObjectsFromClientSideDB[i].tblMentalStatusExamMasterLink.mentalStatusExamCategory +
            ': ' +
            arOfObjectsFromClientSideDB[i].description
        }
      }

      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    async mfIconDeleteClickedOnChildCard(pClientSideUniqRowId) {
      clientSideTblOfPatientMentalStatusExam.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now()),
        },
      })

      const exists = clientSideTblOfPatientMentalStatusExam
        .query()
        .where('clientSideUniqRowId', pClientSideUniqRowId)
        .get()

      const response = await fetch(clientSideTblOfPatientMentalStatusExam.apiUrl + '/' + exists[0].serverSideRowUuid, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          // "Authorization": "Bearer " + TOKEN
        },
      })

      if (!response.ok) {
        // this block execute when response return fail status
        clientSideTblOfPatientMentalStatusExam.update({
          where: exists[0].clientSideUniqRowId,
          data: {
            ROW_END: 2147483648000,
          },
        })
        this.$notify({
          title: 'Error',
          message: 'Not updated on server',
          type: 'Error',
          duration: 3000,
        })
      } else {
        // this block execute when response return success status
        this.$notify({
          title: 'Success',
          message: 'Updated on server',
          type: 'success',
          duration: 3000,
        })
      }
    },
    mxOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit mental status exam',
      })
    },
    // This is used to make the rows that are in change state a orange background.
    mfGetCssClassNameForEachDataRow(pRow) {
      const strOfNumber = pRow.vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return 'color: #E6A23C;'
      } else {
        return 'color: #202020;'
      }
    },
  },
  async mounted() {},
}
</script>
