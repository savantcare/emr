<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Diagnoses</span>
        <el-button-group style="float: right">
          <el-button
            style="padding: 3px"
            type="success"
            plain
            tabindex="-1"
            class="el-icon-circle-plus-outline"
          ></el-button>
          <el-button style="padding: 3px" type="primary" plain tabindex="-1">M</el-button>
          <el-button
            style="padding: 3px"
            type="warning"
            plain
            tabindex="-1"
            class="el-icon-document-delete"
          ></el-button>
          <el-button
            style="padding: 3px"
            type="info"
            plain
            tabindex="-1"
            class="el-icon-delete"
          ></el-button>
        </el-button-group>
      </div>
      <el-table :data="daDxTable" :show-header="false" style="width: 100%">
        <el-table-column prop="dxName" label="Diagnosis name" width="180"> </el-table-column>
        <el-table-column prop="dxOnDate" label="Diagnosed on" width="180"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'
import ormDx from '@/components/pt-info/single/1time-Mrow-mField/dx/db/client-side/structure/Dx.js'
import ormDxa from '@/components/pt-info/single/1time-Mrow-mField/dx/db/client-side/structure/Dxa.js'

/* export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      `http://localhost:8000/diagnosis/?patientId=bfe041fa-073b-4223-8c69-0540ee678ff8`
    )
    return { daTable: data }
  },
} */
export default {
  data() {
    return {
      daDxTable: ormDx.query().get(),
      dblOneDxQueryIsRunningGate: false,
      dblOneDxaQueryIsRunningGate: false,
    }
  },
  mounted() {
    this.mfdaGetDx()
    this.mfdaGetDxa()
  },
  methods: {
    async mfdaGetDx() {
      try {
        if (!this.dblOneDxQueryIsRunningGate) {
          this.dblOneDxQueryIsRunningGate = true
          const countDxCountFromOrm = ormDx.query().count()
          console.log('Number of dx before query =>', countDxCountFromOrm)
          if (countDxCountFromOrm === 0) {
            const dxEvalList = await ormDx
              .api()
              .get(
                `http://localhost:8000/diagnosis/?patientId=bfe041fa-073b-4223-8c69-0540ee678ff8`
              )

            if (dxEvalList.ok) {
            }
            this.daDxTable = ormDx.query().get()
            // ormDx.query('').get()
            console.log('Number of dx in model =>', ormDx.query().count())
          } else {
            this.daDxTable = ormDx.query().get()
          }
          this.dblOneDxQueryIsRunningGate = false
        }
      } catch (e) {}

      // console.log(dxList);
    },
    async mfdaGetDxa() {
      try {
        if (!this.dblOneDxaQueryIsRunningGate) {
          console.log('calling assessment api')
          this.dblOneDxaQueryIsRunningGate = true
          const countDxaCountFromOrm = ormDxa.query().count()
          console.log('Number of assessment before query')
          console.log('Number of assessment before query =>', countDxaCountFromOrm)
          if (countDxaCountFromOrm === 0) {
            await ormDxa
              .api()
              .get(
                `http://localhost:8000/assessment/?patientId=bfe041fa-073b-4223-8c69-0540ee678ff8`
              )
            // this.daDxTable = ormDx.query().get()
            // ormDx.query('').get()
            console.log('Number of dx in model =>', ormDx.query().count())
          } else {
            this.daDxTable = ormDx.query().get()
          }
          this.dblOneDxaQueryIsRunningGate = false
        }
      } catch (e) {}

      // console.log(dxList);
    },
    mfOpenACtInCl() {
      console.log('show add dialog')
      const arFromClientSideTable = clientSideTblOfCtSearchPhrases
        .query()
        .search('add diagnosis')
        .get()
      const objRowFromOrm = arFromClientSideTable[0]
      const tab = {
        label: objRowFromOrm.value,
        ctToShow: require('@/components/' + objRowFromOrm.ctToShow).default,
        ctAbbr: objRowFromOrm.ctAbbr,
        id: objRowFromOrm.id,
        closable: true,
      }
      this.$store.commit('mtfShowNewFirstTabInL2', tab)
    },
    mfOpenMCtInCl() {
      console.log('show multi change dialog')
      const arFromClientSideTable = clientSideTblOfCtSearchPhrases
        .query()
        .search('Multichange dx assessment')
        .get()
      const objRowFromOrm = arFromClientSideTable[0]
      const tab = {
        label: objRowFromOrm.value,
        ctToShow: require('@/components/' + objRowFromOrm.ctToShow).default,
        ctAbbr: objRowFromOrm.ctAbbr,
        id: objRowFromOrm.id,
        closable: true,
      }
      this.$store.commit('mtfShowNewFirstTabInL2', tab)
    },
  },
}
</script>
