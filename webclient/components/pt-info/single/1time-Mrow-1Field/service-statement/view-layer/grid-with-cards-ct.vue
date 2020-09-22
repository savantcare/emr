<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Service statements</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="mfOpenCCtInCl"
          icon="el-icon-edit"
        ></el-button>
      </div>
      <div class="grid-container data-card">
        <el-card
          v-for="ss in cfArOfServiceStatementForDisplay"
          :key="ss.clientSideUniqRowId"
          shadow="hover"
          class="box-card content-card"
        >
          <div v-on:click="mfDeleteServiceStatement(ss.clientSideUniqRowId)">
            <div class="info-icon">
              <el-button type="text">
                <el-tooltip
                  class="item"
                  effect="light"
                  content="info"
                  placement="top-end"
                  :open-delay="500"
                >
                  <i class="el-icon-info custom-info-icon"></i>
                </el-tooltip>
              </el-button>
            </div>

            <div class="delete-icon">
              <el-button type="text" @click="mfDeleteServiceStatement(ss.clientSideUniqRowId)">
                <i class="el-icon-error custom-close-icon"></i>
              </el-button>
            </div>
            {{ ss.tblServiceStatementsMasterLink.serviceStatementCategory }}:
            {{ ss.tblServiceStatementsMasterLink.serviceStatementDescription }}
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import clientSideTblMasterServiceStatements from '../db/client-side/structure/table-master-list-of-service-statements.js'
import clientSideTblPatientServiceStatements from '../db/client-side/structure/table-service-statements-of-a-patient.js'

export default {
  computed: {
    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblPatientServiceStatements
        .query()
        .with('tblServiceStatementsMasterLink')
        .where('ROW_END', 2147483647.999999)
        .get()
      return arOfObjectsFromClientSideDB
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
        searchTerm: 'change service statement',
      })
    },
  },
  async mounted() {},
}
</script>

<style>
.grid-container {
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
.el-tag {
  margin-left: 10px;
  cursor: pointer;
}
.el-tag .el-tag__close {
  color: #409eff;
  float: right;
  top: 7px !important;
}
.grid-container.data-card .el-card__body {
  padding: 16px 10px 5px;
  height: 100%;
  line-height: 18px;
  text-decoration: none;
}
.delete-icon {
  position: absolute;
  top: -10px;
  right: 0px;
  z-index: 999;
  cursor: pointer;
  text-decoration: none;
}
.delete-icon .el-button.el-button--text {
  color: #ebe9e9;
}
.content-card.el-card.box-card:hover .delete-icon .el-button.el-button--text {
  color: #f39797;
}
.content-card {
  cursor: pointer;
  overflow-wrap: break-word;
  position: relative;
  margin: 5px;
}
.content-div {
  font-size: 12px;
  height: 100%;
}
.content-div:hover {
  color: #409eff !important;
}
.content-card.el-card.box-card {
  border: 1px solid #e4e4e4;
}
.content-card.el-card.box-card:hover {
  border: 1px solid #b7daf7;
}
.custom-close-icon {
  font-size: 0.85rem;
}
.custom-close-icon:hover {
  color: #ff0000;
  font-size: 1.05rem;
}

.info-icon {
  position: absolute;
  top: -10px;
  right: 16px;
  z-index: 999;
  cursor: pointer;
  text-decoration: none;
}
.info-icon .el-button.el-button--text {
  color: #ebe9e9;
}
.content-card.el-card.box-card:hover .info-icon .el-button.el-button--text {
  color: #a1e5fa;
}
.custom-info-icon {
  font-size: 0.85rem;
}
.custom-info-icon:hover {
  color: #2ccbfc;
  font-size: 1.05rem;
}
</style>
