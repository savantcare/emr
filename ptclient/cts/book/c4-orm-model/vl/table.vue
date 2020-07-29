<template>
  <div>
    From Fourth chapter - Hello {{ cfMsg }}
    <el-button style="padding: 3px;" type="success" plain @click="mfOpenCtInCl">A</el-button>
  </div>
</template>
<script>
import ormHelloWorld from '@/cts/book/c4-orm-model/db/vuex-orm/helloworld.js'
export default {
  computed: {
    cfMsg() {
      const arFromORM = ormHelloWorld.query().get()
      if (arFromORM.length > 0) {
        return arFromORM[0].msg
      }
      return ''
    },
  },
  mounted() {
    ormHelloWorld.insert({ data: { id: 1, msg: 'Jai krishna' } })
  },
  methods: {
    mfOpenCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'Fourth chapter - change',
      })
    },
  },
}
</script>
