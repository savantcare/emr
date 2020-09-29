<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong>Diagnosis</strong>
        <el-button style="float: right; padding: 3px 0" type="text" @click="mfOpenAddModule"
          >A</el-button
        >
      </div>
      <div class="grid-container">
        <div v-if="displayData.length > 0">
          <div v-for="dx in displayData" :key="dx.clientSideUniqRowId">
            <el-button @click="mfDiscontinue(dx.clientSideUniqRowId)" type="primary"
              >{{ dx.name }}</el-button
            >
          </div>
        </div>
        <div v-else class="emptyRow">Not added yet</div>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  computed: {  },
  data() {
    return {
      displayData: []
    }
  },
  methods: {
    mfDiscontinue(pClientSideUniqRowId) {
      console.log('disscontinue', pClientSideUniqRowId);
    },
    mfOpenAddModule() {
      alert('Under development');
      // this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
      //   searchTerm: 'add diagnosis',
      // })
    },
  },
  async mounted() {},
}
</script>
<style scoped>
  .emptyRow {
    color: #b1b1b1;
  }
</style>
