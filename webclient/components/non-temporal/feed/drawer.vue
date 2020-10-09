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
    :show-close="true"
    :wrapperClosable="false"
  >
    <div class="block">
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
import tableStructureForStoreMessageFromOtherComponent from '~/components/non-temporal/feed/db/client-side/structure/store-messages-from-other-components.js'
import clientSideTableOfCommonForAllComponents from '~/components/ptinfo-single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'

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
  components: {},
  computed: {
    cfArOfFeedForDisplayInDrawer() {
      const arFromClientSideTable = tableStructureForStoreMessageFromOtherComponent.query().get()
      return arFromClientSideTable
    },
    cfDrawerVisibility() {
      const visible = clientSideTableOfCommonForAllComponents.find('vblIsFeedDrawerVisible')
      if (visible) {
        if (visible['fieldValue'] == 'true') {
          return true
        } else {
          return false
        }
      }
    },
  },
  mounted() {
    // console.log('Drawer ct mounted')
  },
  methods: {
    handleClose(done) {
      clientSideTableOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'vblIsFeedDrawerVisible', fieldValue: false }],
      })
    },
  },
}
</script>
