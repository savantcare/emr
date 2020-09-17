<template>
  <div v-if="histories.length > 0">
    <el-row>
      <span style="font-size: 14px;">History:</span>
    </el-row>
    <br />
    <el-row :gutter="12">
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(history, index) in histories"
            :key="`history-${index}`"
            :type="history.type"
            size="large"
            :timestamp="history.info"
            >{{ history.content }}</el-timeline-item
          >
        </el-timeline>
      </div>
    </el-row>
  </div>
</template>

<script>
import ormDx from '@/models/Dx'
export default {
  props: ['dx'],
  data() {
    return {
      histories: [],
    }
  },
  mounted() {
    this.getAssessmentHistory()
  },
  methods: {
    getAssessmentHistory() {
      const arDxFromOrm = ormDx.query().with('dx').get()
      console.log(arDxFromOrm)
      this.histories = []
    },
  },
}
</script>

<style lang="scss" scoped></style>
