<template>
  <div>
    From Tenth chapter - Hello {{ cfMsg }}
    <el-button style="padding: 3px;" type="success" plain @click="mfOpenCtInCl">A</el-button>
    <el-table
      :data="cfArForDisplayInTable"
      :show-header="false"
      size="mini"
      style="width: 100%;"
      :stripe="true"
      :row-class-name="mfGetCssClassName"
      @selection-change="mfHandleSelectionForDiscontinue"
    >
      <el-table-column prop="msg"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import ormHelloWorld from '@/cts/book/c7-multiple-data-rows/db/vuex-orm/helloworld.js'
export default {
  computed: {
    cfMsg() {
      const arFromORM = ormHelloWorld.query().get()
      if (arFromORM.length > 0) {
        console.log(arFromORM)
        return arFromORM[0].msg
      }
      return ''
    },
    cfArForDisplayInTable() {
      const arFromORM = ormHelloWorld.getNotEmptyRows('msg')
      return arFromORM
    },
  },
  mounted() {
    ormHelloWorld.insert({ data: { id: 1, msg: 'John' } })
    console.log(ormHelloWorld)
  },
  methods: {
    mfOpenCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'Tenth chapter - change',
      })
    },
  },
}
</script>
