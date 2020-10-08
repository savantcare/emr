<!-- Params
      Goal: Do not show the shadow so doctor can read the view layer.
            modal=false means -> Do now show shadowing layer
  -->
<template>
  <el-drawer
    :title="cfDrawerTitle"
    :visible="cfDrawerVisibility"
    :direction="direction"
    :before-close="handleClose"
    :modal="false"
    :close-on-press-escape="true"
    :show-close="false"
  >
    <div class="block">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in cfDrawerData"
          :key="index"
          :timestamp="activity.deletedAt"
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
    }
  },
  computed: {
    cfDrawerVisibility: {
      get() {
        return this.$store.state.vstObjDeletedDrawer.vblIsDeletedDrawerVisible
      },
      set(value) {
        // this.$store.commit('mtfSetDeletedDrawerValue', value)
        this.$store.commit('mtfSetDeletedDrawerValue', {
          visibility: value,
        })
      },
    },
    cfDrawerTitle: {
      get() {
        return this.$store.state.vstObjDeletedDrawer.vsDeletedDrawerTitle
      },
      set(value) {
        // this.$store.commit('mtfSetDeletedDrawerValue', value)
        this.$store.commit('mtfSetDeletedDrawerValue', {
          drawerTitle: value,
        })
      },
    },
    cfDrawerData: {
      get() {
        return this.$store.state.vstObjDeletedDrawer.vaDeletedDrawerData
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
