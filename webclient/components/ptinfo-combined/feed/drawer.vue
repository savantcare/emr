<!-- Params
      Goal: Do not show the shadow so doctor can read the view layer.
            modal=false means -> Do now show shadowing layer
  -->
<template>
  <el-drawer
    title="Analysis"
    :visible="cfDrawerVisibility"
    direction="ltr"
    :before-close="handleClose"
    :modal="false"
    :close-on-press-escape="true"
    :show-close="true"
    :wrapperClosable="false"
  >
    <div class="block">
      <ctVlSearchBox></ctVlSearchBox>

      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in cfArOfFeedForDisplayInDrawer"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.component }} -
          {{ activity.description }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-drawer>
</template>

<script>
import tableStructureForStoreMessageFromOtherComponent from '~/components/ptinfo-combined/feed/db/client-side/structure/store-messages-from-other-components.js'
import ctVlSearchBox from '@/components/others/search-phrases/call-insert-search-phases-of-components-and-handle-selection.vue'

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
  components: {
    ctVlSearchBox,
  },
  computed: {
    cfArOfFeedForDisplayInDrawer() {
      const arFromClientSideTable = tableStructureForStoreMessageFromOtherComponent.query().get()
      return arFromClientSideTable
    },
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
