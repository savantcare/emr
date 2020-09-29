<template>
  <div>
    <el-card class="box-card sc-service-statement-all-content" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Psych review of systems</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="mfOpenEditCtInEditLayer"
          icon="el-icon-edit"
        ></el-button>
      </div>
      <div class="grid-container">
        <div v-for="ss in cfArOfPsychReviewOfSystemsForDisplay" :key="ss.clientSideUniqRowId">
          <el-button @click="mfDeletePsychReviewOfSystems(ss.clientSideUniqRowId)" type="primary"
            >{{ ss.tblPsychReviewOfSystemsMasterLink.psychReviewOfSystemsCategory }}:
            {{ ss.tblPsychReviewOfSystemsMasterLink.psychReviewOfSystemsDescription }}</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import clientSideTblOfMasterPsychReviewOfSystems from '../db/client-side/structure/master-table-of-psych-review-of-systems.js'
import clientSideTblOfPatientPsychReviewOfSystems from '../db/client-side/structure/patient-table-of-psych-review-of-systems.js'

export default {
  computed: {
    cfArOfPsychReviewOfSystemsForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientPsychReviewOfSystems
        .query()
        .with('tblPsychReviewOfSystemsMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
    },
  },
  methods: {
    mfDeletePsychReviewOfSystems(pClientSideUniqRowId) {
      clientSideTblOfPatientPsychReviewOfSystems.update({
        where: pClientSideUniqRowId,
        data: {
          ROW_END: Math.floor(Date.now() / 1000),
        },
      })
    },
    mfOpenEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'edit psych review of systems',
      })
    },
  },
  async mounted() {},
}
</script>
<style>
/* Generation ->
==============
                                       .sc-psych-review-of-systems-all-content
 Generation 1                                      |
==============                     _________________________________
                                  |                                |
                    .sc-psych-review-of-systems-all-content-header                |
 Generatiobn 2                                                     |
                                    _______________________________|
                                  |
                  .sc-psych-review-of-systems-all-content-body
==============                    |
                                  |
                   .sc-psych-review-of-systems-individual-card
Generatiobn 3                     |
                       ________________________________________________________________________________
                      |                                 |                                             |
        .sc-psych-review-of-systems-individual-card-content    .sc-psych-review-of-systems-individual-card-info-icon           .sc-psych-review-of-systems-individual-card-delete-icon

==============
*/

/* Generation Level 1 */
.sc-psych-review-of-systems-all-content .el-card__header {
  /* Goal: Manage Distance from border to content in header*/
  padding: 10px !important;
}

.sc-psych-review-of-systems-all-content .el-card__body {
  /* Goal: Manage  Distance from border to content in body*/
  padding: 10px !important;
}

/* Generation Level 2 / Child 1 == Goal: Header icon management */

/* When anywhere inside the card make the action icons in the card header -> level 1 visual */
.el-card:hover .sc-psych-review-of-systems-all-content-header .el-button-group {
  display: inline-block !important;
}

/* When inside the card header make the action icons in the card header -> level 2 visual */
.el-card__header:hover .sc-psych-review-of-systems-all-content-header .el-icon-edit {
  color: #67c23a !important;
  font-size: 1.5rem;
}
.el-card__header:hover .sc-psych-review-of-systems-all-content-header .el-icon-s-grid {
  color: #409eff !important;
}
.el-card__header:hover .sc-psych-review-of-systems-all-content-header .el-icon-document-delete {
  color: #f56c6c !important;
}
.el-card__header:hover .sc-psych-review-of-systems-all-content-header .el-icon-delete {
  color: #909399 !important;
}

/* Generation Level 2 / Child 2 */

/* Goal: When less space display 1 card in a row. When more space display 100 cards in a row. */
.sc-psych-review-of-systems-all-content-body {
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

.sc-psych-review-of-systems-individual-card {
  cursor: pointer;
  overflow-wrap: break-word;
  position: relative;
  margin: 1px;
  padding: 10px 1px 1px !important;
  /* Goal: Give normal and weak eyesight two different font size*/
}

/* Goal: Header icon management  */
.el-card:hover .sc-psych-review-of-systems-individual-card .el-button-group {
  display: inline-block !important;
  position: absolute;
  top: 0px;
  right: 0px;
}

.sc-psych-review-of-systems-individual-card:hover .el-icon-discover {
  color: #909399 !important;
}

.sc-psych-review-of-systems-individual-card:hover .el-icon-circle-close {
  color: #f56c6c !important;
  font-size: 1.5rem;
}
</style>
