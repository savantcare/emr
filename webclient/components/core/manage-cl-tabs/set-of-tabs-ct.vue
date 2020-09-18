<template>
  <el-select v-model="value" placeholder="Select" @change="mfHandleChange">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import tblSearchPhrasesOfCt from '@/components/core/search-phrases/search-phrases-of-components-table'
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
        const resultArFromOrm = tblSearchPhrasesOfCt.query().search('add reminder').get()
        const objRowFromOrm = resultArFromOrm[0]
        const objAddTab = {
          label: objRowFromOrm.value,
          ctToShow: require('@/components/' + objRowFromOrm.ctToShow).default,
          ctAbbr: objRowFromOrm.ctAbbr,
          id: objRowFromOrm.id,
          closable: true,
          ctWidthInCl: objRowFromOrm.ctWidthInCl,
        }
        this.$store.commit('mtfShowNewFirstTabInCl', objAddTab)
        this.$store.state.vstObjTabsInCL.vsSelectedTabId = this.$store.state.vstObjTabsInCL.arTabs[0].id
      } else if (pValue === 'plan-tabset') {
        let resultArFromOrm = tblSearchPhrasesOfCt.query().search('multi change reminders').get()
        let objRowFromOrm = resultArFromOrm[0]
        let objAddTab = {
          label: objRowFromOrm.value,
          ctToShow: require('@/components/' + objRowFromOrm.ctToShow).default,
          ctAbbr: objRowFromOrm.ctAbbr,
          id: objRowFromOrm.id,
          closable: true,
          ctWidthInCl: objRowFromOrm.ctWidthInCl,
        }
        this.$store.commit('mtfShowNewFirstTabInCl', objAddTab)
        resultArFromOrm = tblSearchPhrasesOfCt.query().search('add reminder').get()
        objRowFromOrm = resultArFromOrm[0]
        objAddTab = {
          label: objRowFromOrm.value,
          ctToShow: require('@/components/' + objRowFromOrm.ctToShow).default,
          ctAbbr: objRowFromOrm.ctAbbr,
          id: objRowFromOrm.id,
          closable: true,
          ctWidthInCl: objRowFromOrm.ctWidthInCl,
        }
        this.$store.commit('mtfAdditionalTabAddOrActivate', objAddTab)
        this.$store.state.vstObjTabsInCL.vsSelectedTabId = this.$store.state.vstObjTabsInCL.arTabs[0].id
      }
    },
  },
}
</script>
