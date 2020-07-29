<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Goal</span>
        <el-button-group style="float: right;">
          <el-button style="padding: 3px;" type="success" plain tabindex="-1">A</el-button>
          <el-button style="padding: 3px;" type="primary" plain tabindex="-1">M</el-button>
          <el-button style="padding: 3px;" type="warning" plain tabindex="-1">D</el-button>
          <el-button style="padding: 3px;" type="info" plain tabindex="-1">X</el-button>
        </el-button-group>
      </div>
      <el-table :data="daGTable" style="width: 100%;" :show-header="false">
        <el-table-column prop="description" label="Description" width="180"> </el-table-column>
        <el-table-column prop="score" label="Score" width="180"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// import addGoal from './layer-2/addGoal.vue'
import ormSearchPhrasesOfCt from '@/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'
import ormGoal from '@/models/Goal'

// const { GOAL_API_URL } = 'http://localhost:8000/goals'
export default {
  data() {
    return {
      daGTable: ormGoal.query().get(),
      // daGTable: [],
      dblOneQueryIsRunningGate: false,
    }
  },
  mounted() {
    this.mfdaGetG()
  },
  methods: {
    async mfdaGetG() {
      // TODO: what does da in the name indicate?
      try {
        if (!this.dblOneQueryIsRunningGate) {
          this.dblOneQueryIsRunningGate = true
          const dnCountG = await ormGoal.query().count()

          console.log('Number of goals before query =>', dnCountG)
          if (dnCountG === 0) {
            await ormGoal
              .api()
              .get('http://localhost:8000/goals?patientUUID=bfe041fa-073b-4223-8c69-0540ee678ff8')

            console.log('Number of goal in model =>', ormGoal.query().count())
            const arGoalEvalList = ormGoal.query().get()
            this.daGTable = arGoalEvalList
          }
          this.dblOneQueryIsRunningGate = false
        }
      } catch (ex) {
        console.log('failed')
      }
    },
    mfOpenACtInCl() {
      console.log('show add dialog')
      const arFromORM = ormSearchPhrasesOfCt.query().search('add goal').get()
      const objRowFromORM = arFromORM[0]
      const tab = {
        label: objRowFromORM.value,
        ctToShow: require('@/cts/' + objRowFromORM.ctToShow).default,
        ctAbbr: objRowFromORM.ctAbbr,
        id: objRowFromORM.id,
        closable: true,
      }
      this.$store.commit('mtfShowNewFirstTabInCl', tab)
    },
  },
}
</script>
