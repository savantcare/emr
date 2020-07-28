<template>
  <div>
    From eight chapter - Hello {{ cfMsg }}
    <el-button style="padding: 3px;" type="success" plain @click="mfOpenCtInCl">A</el-button>
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
  },
  mounted() {
    ormHelloWorld.insert({ data: { id: 1, msg: 'John' } })
    console.log(ormHelloWorld)
  },
  methods: {
    mfOpenCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'Eight chapter - change',
      })
    },
  },
}
</script>
