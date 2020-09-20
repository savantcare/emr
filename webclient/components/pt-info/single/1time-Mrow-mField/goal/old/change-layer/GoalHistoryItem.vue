<template>
  <div v-if="histories.length > 0">
    <el-row>
      <span style="font-size: 14px">History:</span>
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
import { GOAL_API_URL } from '@/static/others.js'
export default {
  props: ['goal'],
  data() {
    return {
      histories: [],
    }
  },
  mounted() {
    this.getHistory()
  },
  methods: {
    async getHistory() {
      const TOKEN = localStorage.getItem('token')
      const response = await fetch(`${GOAL_API_URL}/getHistory/${this.goal.uuid}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: 'Bearer ' + TOKEN,
        },
      })
      if (response.ok) {
        const json = await response.json()
        console.log(json)
        this.histories = json
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
