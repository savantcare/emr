<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Diagnoses</span>
        <el-button-group style="float: right;">
          <el-button style="padding: 3px;" type="success" plain tabindex="-1">A</el-button>
          <el-button style="padding: 3px;" type="primary" plain tabindex="-1">M</el-button>
          <el-button style="padding: 3px;" type="warning" plain tabindex="-1">D</el-button>
          <el-button style="padding: 3px;" type="info" plain tabindex="-1">X</el-button>
        </el-button-group>
      </div>
      <el-table :data="daDxTable" :show-header="false" style="width: 100%;">
        <el-table-column prop="dxName" label="Diagnosis name" width="180"> </el-table-column>
        <el-table-column prop="dxOnDate" label="Diagnosed on" width="180"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/vl-search/orm-search-phrases-of-ct'
import ormDx from '@/models/Dx'
import ormDxa from '@/models/Dxa'

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
          const countDxCountFromORM = ormDx.query().count()
          console.log('Number of dx before query =>', countDxCountFromORM)
          if (countDxCountFromORM === 0) {
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
          const countDxaCountFromORM = ormDxa.query().count()
          console.log('Number of assessment before query')
          console.log('Number of assessment before query =>', countDxaCountFromORM)
          if (countDxaCountFromORM === 0) {
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
      const arFromORM = ormSearchPhrasesOfCt.query().search('add diagnosis').get()
      const objRowFromORM = arFromORM[0]
      const tab = {
        label: objRowFromORM.value,
        ctToShow: require('@/cts/' + objRowFromORM.ctToShowInCL).default,
        ctAbbr: objRowFromORM.ctAbbr,
        id: objRowFromORM.id,
        closable: true,
      }
      this.$store.commit('mtfShowNewFirstTabInL2', tab)
    },
    mfOpenMCtInCl() {
      console.log('show multi change dialog')
      const arFromORM = ormSearchPhrasesOfCt.query().search('Multichange dx assessment').get()
      const objRowFromORM = arFromORM[0]
      const tab = {
        label: objRowFromORM.value,
        ctToShow: require('@/cts/' + objRowFromORM.ctToShowInCL).default,
        ctAbbr: objRowFromORM.ctAbbr,
        id: objRowFromORM.id,
        closable: true,
      }
      this.$store.commit('mtfShowNewFirstTabInL2', tab)
    },
  },
}
</script>
