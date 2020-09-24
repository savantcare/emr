<template>
  <showContentInCard
    mainCardName="Service statement"
    :childCardsArray="cfArOfServiceStatementForDisplay"
    clientSideDBLevelTableActions="edit"
    clientSideCardLevelActions="remove, info"
  />
</template>

<script>
import clientSideTblMasterServiceStatements from '../db/client-side/structure/table-master-list-of-service-statements.js'
import clientSideTblPatientServiceStatements from '../db/client-side/structure/table-service-statements-of-a-patient.js'
import objCommonOrm from '@/components/pt-info/single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'
import showContentInCard from '@/components/pt-info/single/common/show-content-in-card-ct.vue'

export default {
  components: { showContentInCard },
  computed: {
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblPatientServiceStatements
        .query()
        .with('tblServiceStatementsMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()

      for (var i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        arOfObjectsFromClientSideDB[i]['cardContent'] =
          arOfObjectsFromClientSideDB[i].tblServiceStatementsMasterLink.serviceStatementCategory +
          ': ' +
          arOfObjectsFromClientSideDB[i].tblServiceStatementsMasterLink.serviceStatementDescription
      }

      console.log(arOfObjectsFromClientSideDB)
      return arOfObjectsFromClientSideDB
    },
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
  },
  methods: {
    mfDeleteServiceStatement(pClientSideUniqRowId) {
      clientSideTblPatientServiceStatements.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mfOpenCCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'edit service statement',
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
    mfShowTimeLine: () => {
      alert('Timeline of this data')
      return false
    },
  },
  async mounted() {},
}
</script>

<style>
/* Generation ->
==============
                                       .sc-service-statement-all-content
 Generation 1                                      |
==============                     _________________________________
                                  |                                |
                    .sc-service-statement-all-content-header                |
 Generatiobn 2                                                     |
                                    _______________________________|
                                  |
                  .sc-service-statement-all-content-body
==============                    |
                                  |
                   .sc-service-statement-individual-card
Generatiobn 3                     |
                       ________________________________________________________________________________
                      |                                 |                                             |
        .sc-service-statement-individual-card-content    .sc-service-statement-individual-card-info-icon           .sc-service-statement-individual-card-delete-icon

==============
*/

/* Generation Level 1 */
.sc-service-statement-all-content .el-card__header {
  /* Goal: Manage Distance from border to content in header*/
  padding: 10px !important;
}

.sc-service-statement-all-content .el-card__body {
  /* Goal: Manage  Distance from border to content in body*/
  padding: 10px !important;
}

/* Generation Level 2 / Child 1 == Goal: Header icon management */

/* When anywhere inside the card make the action icons in the card header -> level 1 visual */
.el-card:hover .sc-service-statement-all-content-header .el-button-group {
  display: inline-block !important;
}

/* When inside the card header make the action icons in the card header -> level 2 visual */
.el-card__header:hover .sc-service-statement-all-content-header .el-icon-edit {
  color: #67c23a !important;
  font-size: 1.5rem;
}
.el-card__header:hover .sc-service-statement-all-content-header .el-icon-s-grid {
  color: #409eff !important;
}
.el-card__header:hover .sc-service-statement-all-content-header .el-icon-document-delete {
  color: #f56c6c !important;
}
.el-card__header:hover .sc-service-statement-all-content-header .el-icon-delete {
  color: #909399 !important;
}

/* Generation Level 2 / Child 2 */

/* Goal: When less space display 1 card in a row. When more space display 100 cards in a row. */
.sc-service-statement-all-content-body {
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

.sc-service-statement-individual-card {
  cursor: pointer;
  overflow-wrap: break-word;
  position: relative;
  margin: 1px;
  padding: 10px 1px 1px !important;
  /* Goal: Give normal and weak eyesight two different font size*/
  font-size: var(--font-size-of-content-every-where);
}

/* Goal: Header icon management  */
.el-card:hover .sc-service-statement-individual-card .el-button-group {
  display: inline-block !important;
  position: absolute;
  top: 0px;
  right: 0px;
}

.sc-service-statement-individual-card:hover .el-icon-discover {
  color: #909399 !important;
}

.sc-service-statement-individual-card:hover .el-icon-circle-close {
  color: #f56c6c !important;
  font-size: 1.5rem;
}

.el-icon-discover:hover {
  font-size: 1.5rem;
}
</style>
