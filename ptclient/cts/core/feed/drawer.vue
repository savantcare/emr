<!-- Params
      Goal: Do not show the shadow so doctor can read the view layer.
            modal=false means -> Do now show shadowing layer
  -->
<template>
  <el-drawer
    title="Feed"
    :visible="cfDrawerVisibility"
    direction="ltr"
    :before-close="handleClose"
    :modal="false"
    :close-on-press-escape="true"
    :show-close="false"
  >
    <div class="block">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-drawer>
</template>

<script>
export default {
  data() {
    return {
      direction: 'ltr',
      reverse: false,
      activities: [
        {
          content: 'HDR sent for rescheduling appointment',
          timestamp: '2018-04-15',
        },
        {
          content: 'New appt booked',
          timestamp: '2018-04-13',
        },
        {
          content: 'Patient called to say will arrive 10 mins late',
          timestamp: '2018-04-11',
        },
      ],
    }
  },
  computed: {
    cfDrawerVisibility: {
      get() {
        return this.$store.state.vstObjFeedDrawer.vblIsFeedDrawerVisible
      },
      set(value) {
        this.$store.commit('mtfSetFeedDrawerVisibility', value)
      },
    },
  },
  mounted() {
    // console.log('Drawer ct mounted')
  },
  methods: {
    handleClose(done) {
      // console.log('In the handle close function')
      this.cfDrawerVisibility = false
    },
  },
}
</script>
