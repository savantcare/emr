<template>
  <div>
    <vue-slider
      v-model="sliderCurrentValue"
      :data="timeOfApptsStartToMarkOnSlider"
      :marks="true"
      :included="true"
      @change="handleSliderChangeEvent"
      @drag-start="handleSliderChangeEvent"
    ></vue-slider>
    <clientSideTblOfAppointmentsInit />
  </div>
</template>

<script>
import clientSideTblOfMultiStateViewCards from '@/components/core/manage-mts-view-layer-cards/db/client-side/structure/table.js'
import clientSideTblOfAppointments from '@/components/core/mts-view-layer-header/db/client-side/structure/appointment-client-side-table.js'
import clientSideTblOfAppointmentsInit from '@/components/core/mts-view-layer-header/db/client-side/static-data/insert-into-appointment-client-side-table.vue'

export default {
  data() {
    return {
      sliderCurrentValue: 100,
      timeOfApptsStart: [],
    }
  },
  components: { clientSideTblOfAppointmentsInit },
  computed: {
    timeOfApptsStartToMarkOnSlider() {
      const result = {}

      result['90'] = {
        id: 1,
        style: { color: '#1989FA' },
        name: 'jai kali ma',
      }

      result['100'] = {
        id: 2,
        style: { color: '#1611FA' },
        name: 'jai durga ma',
      }

      return result
    },
  },
  methods: {
    async handleSliderChangeEvent() {
      const noteCurrentValue = clientSideTblOfMultiStateViewCards.find(2)
      const updateState = await clientSideTblOfMultiStateViewCards.update({
        clientSideUniqRowId: 2,
        vIfState: 1 - noteCurrentValue['vIfState'],
      })
    },
    handleSliderEndEvent() {
      // console.log(this.sliderCurrentValue);
    },
  },
}
</script>
