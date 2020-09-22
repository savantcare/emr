<template>
  <el-card
    shadow="hover"
    class="box-card sc-mental-status-exam-all-content"
    :style="cfGetVariablesFromClientSideTableToUseInCSS"
  >
    <div slot="header" class="sc-mental-status-exam-all-content-header clearfix">
      <span>Mental status exam</span>
      <el-button-group style="float: right; display: none">
        <el-button
          style="padding: 3px; color: #c0c4cc; border: none"
          plain
          tabindex="-1"
          @click="mfOpenCCtInCl"
          class="el-icon-edit"
        ></el-button>
      </el-button-group>
    </div>
    <div class="sc-mental-status-exam-all-content-body">
      <el-card
        v-for="mse in cfArOfMentalStatusExamForDisplay"
        :key="mse.clientSideUniqRowId"
        class="box-card sc-mental-status-exam-individual-card"
        shadow="hover"
        :style="mfGetCssClassName(mse)"
      >
        <el-button-group style="float: right; display: none">
          <el-button
            class="el-icon-discover"
            style="padding: 3px; color: #c0c4cc; border: none"
            plain
            tabindex="-1"
          >
            <el-tooltip
              class="item"
              effect="light"
              content="info"
              placement="top-end"
              :open-delay="500"
            >
            </el-tooltip>
          </el-button>
          <el-button
            class="el-icon-circle-close"
            style="padding: 3px; color: #c0c4cc; border: none"
            plain
            tabindex="-1"
            @click="mfDeleteMentalStatusExam(mse.clientSideUniqRowId)"
          >
            <el-tooltip
              class="item"
              effect="light"
              content="Click to delete"
              placement="top-end"
              :open-delay="500"
            >
            </el-tooltip>
          </el-button>
        </el-button-group>
        {{ mse.tblMentalStatusExamMasterLink.mentalStatusExamCategory }}:
        {{ mse.tblMentalStatusExamMasterLink.mentalStatusExamDescription }}
      </el-card>
    </div>
  </el-card>
</template>

<script>
import clientSideTblMasterMentalStatusExam from '../db/client-side/structure/table-master-list-of-mental-status-exam.js'
import clientSideTblPatientMentalStatusExam from '../db/client-side/structure/table-mental-status-exam-of-a-patient.js'
import objCommonOrm from '@/components/pt-info/single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'

export default {
  computed: {
    cfGetVariablesFromClientSideTableToUseInCSS() {
      const objCommonRow = objCommonOrm.find(1) // if this is async then it does not work.
      if (objCommonRow !== null) {
        let fontSizeOfContentEveryWhere = objCommonRow.fontSizeOfContentEveryWhereForNormalEyeSight
        if (objCommonRow.currentUserEyeSight == 'weak') {
          fontSizeOfContentEveryWhere = objCommonRow.fontSizeOfContentEveryWhereForWeakEyeSight
        }
        return {
          '--font-size-of-content-every-where': fontSizeOfContentEveryWhere,
        }
      }
    },
    cfArOfMentalStatusExamForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblPatientMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    mfDeleteMentalStatusExam(pClientSideUniqRowId) {
      clientSideTblPatientMentalStatusExam.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mfOpenCCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'change mental status exam',
      })
    },
    // This is used to make the rows that are in change state a orange background.
    mfGetCssClassName(pRow) {
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

<style>
/* Generation ->
==============
                                       .sc-mental-status-exam-all-content
 Generation 1                                      |
==============                     _________________________________
                                  |                                |
                    .sc-mental-status-exam-all-content-header                |
 Generatiobn 2                                                     |
                                    _______________________________|
                                  |
                  .sc-mental-status-exam-all-content-body
==============                    |
                                  |
                   .sc-mental-status-exam-individual-card
Generatiobn 3                     |
                       ________________________________________________________________________________
                      |                                 |                                             |
        .sc-mental-status-exam-individual-card-content    .sc-mental-status-exam-individual-card-info-icon           .sc-mental-status-exam-individual-card-delete-icon

==============
*/

/* Generation Level 1 */
.sc-mental-status-exam-all-content .el-card__header {
  /* Goal: Manage Distance from border to content in header*/
  padding: 10px !important;
}

.sc-mental-status-exam-all-content .el-card__body {
  /* Goal: Manage  Distance from border to content in body*/
  padding: 10px !important;
}

/* Generation Level 2 / Child 1 == Goal: Header icon management */

/* When anywhere inside the card make the action icons in the card header -> level 1 visual */
.el-card:hover .sc-mental-status-exam-all-content-header .el-button-group {
  display: inline-block !important;
}

/* When inside the card header make the action icons in the card header -> level 2 visual */
.el-card__header:hover .sc-mental-status-exam-all-content-header .el-icon-edit {
  color: #67c23a !important;
  font-size: 20px;
}

/* Generation Level 2 / Child 2 */

/* Goal: When less space display 1 card in a row. When more space display 100 cards in a row. */
.sc-mental-status-exam-all-content-body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Some other grid-template-columns options are :
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fit, max(200px)); compared to minmax(200px, 1fr) there is more magin between cols and less content fits.
  */
  grid-gap: 1px;
  grid-auto-flow: row; /* This is default value */
  margin: 1px;
}

/* Generation Level 3 */

/* Goal: Margin and padding of individual card */

.sc-mental-status-exam-individual-card {
  cursor: pointer;
  overflow-wrap: break-word;
  position: relative;
  margin: 1px;
  padding: 10px 1px 1px !important;
  /* Goal: Give normal and weak eyesight two different font size*/
  font-size: var(--font-size-of-content-every-where);
}

/* Goal: Header icon management  */
.el-card:hover .sc-mental-status-exam-individual-card .el-button-group {
  display: inline-block !important;
  position: absolute;
  top: 0px;
  right: 0px;
}

.sc-mental-status-exam-individual-card:hover .el-icon-discover {
  color: #909399 !important;
}

.sc-mental-status-exam-individual-card:hover .el-icon-circle-close {
  color: #f56c6c !important;
  font-size: 20px;
}
</style>
