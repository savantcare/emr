<template>
  <el-select v-model="value" placeholder="Select" @change="mfHandleChange">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import ormSearchPhrasesOfCt from '@/cts/core/manage-ptsvl-cards/orm-search-phrases-of-ct'
export default {
  data() {
    return {
      options: [
        {
          value: 'assessment-tabset',
          label: 'Assessment tabset',
        },
        {
          value: 'plan-tabset',
          label: 'Plan tabset',
        },
      ],
      value: '',
    }
  },
  methods: {
    mfHandleChange(pValue) {
      console.log('value changed', pValue)
      if (pValue === 'assessment-tabset') {
        // cannot hardcode, need to query since dont know the ID created when inserted
        const resultArFromORM = ormSearchPhrasesOfCt.query().search('add reminder').get()
        const objRowFromORM = resultArFromORM[0]
        const objAddTab = {
          label: objRowFromORM.value,
          ctToShow: require('@/cts/' + objRowFromORM.ctToShow).default,
          ctAbbr: objRowFromORM.ctAbbr,
          id: objRowFromORM.id,
          closable: true,
          ctWidthInCl: objRowFromORM.ctWidthInCl,
        }
        this.$store.commit('mtfShowNewFirstTabInCl', objAddTab)
        this.$store.state.vstObjTabsInCL.vsSelectedTabId = this.$store.state.vstObjTabsInCL.arTabs[0].id
      } else if (pValue === 'plan-tabset') {
        let resultArFromORM = ormSearchPhrasesOfCt.query().search('multi change reminders').get()
        let objRowFromORM = resultArFromORM[0]
        let objAddTab = {
          label: objRowFromORM.value,
          ctToShow: require('@/cts/' + objRowFromORM.ctToShow).default,
          ctAbbr: objRowFromORM.ctAbbr,
          id: objRowFromORM.id,
          closable: true,
          ctWidthInCl: objRowFromORM.ctWidthInCl,
        }
        this.$store.commit('mtfShowNewFirstTabInCl', objAddTab)
        resultArFromORM = ormSearchPhrasesOfCt.query().search('add reminder').get()
        objRowFromORM = resultArFromORM[0]
        objAddTab = {
          label: objRowFromORM.value,
          ctToShow: require('@/cts/' + objRowFromORM.ctToShow).default,
          ctAbbr: objRowFromORM.ctAbbr,
          id: objRowFromORM.id,
          closable: true,
          ctWidthInCl: objRowFromORM.ctWidthInCl,
        }
        this.$store.commit('mtfAdditionalTabAddOrActivate', objAddTab)
        this.$store.state.vstObjTabsInCL.vsSelectedTabId = this.$store.state.vstObjTabsInCL.arTabs[0].id
      }
    },
  },
}
</script>
