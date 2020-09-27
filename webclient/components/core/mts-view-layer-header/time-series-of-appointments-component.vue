<!-- 
absorb = true       -> Gives gravity effect 
included = true     -> Without this absorb does not work 
process = false     -> The bottle fill effect goes away 
hide-label=true     -> Content below the dots can be hidden with this.

Features needed:
1. Red and yellow should be not selectable points on the line.
2. Instead of blue color dot be able to give the lock icon nad unlock icon

-->
<template>
  <div>
    <vue-slider
      v-model="value"
      :marks="marks"
      :absorb="true"
      :included="true"
      :process="false"
      :hide-label="true"
      :tooltip="'always'"
      @change="handleSliderChangeEvent"
      @drag-start="handleSliderChangeEvent"
    >
    </vue-slider>
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
      value: 26,
      marks: {
        0: {
          // 0 is the content above the dot
          label: '😊', // This is the content below the dot.
          style: {
            width: '8px', // This is width of the dot
            height: '8px',
            display: 'block',
            backgroundColor: '#69c0ff', // This is color of the dot
            transform: 'translate(-2px, -2px)',
          },
          labelStyle: {
            color: '#69c0ff', // This is the background color of the popup that comes when I click on the dot
          },
        },
        26: {
          label: '26℃',
          style: {
            width: '8px',
            height: '8px',
            display: 'block',
            backgroundColor: 'yellow',
            transform: 'translate(-2px, -2px)',
          },
          labelStyle: {
            color: '#69c0ff',
          },
        },
        37: {
          label: '37℃',
          style: {
            width: '8px',
            height: '8px',
            display: 'block',
            backgroundColor: 'red',
            transform: 'translate(-2px, -2px)',
          },
          labelStyle: {
            color: '#69c0ff',
          },
        },
        100: {
          label: '100℃',
          style: {
            width: '8px',
            height: '8px',
            display: 'block',
            backgroundColor: 'red',
            transform: 'translate(-2px, -2px)',
          },
          labelStyle: {
            color: 'red',
          },
        },
      },
    }
  },
  components: { clientSideTblOfAppointmentsInit },
  computed: {
    timeOfApptsStartToMarkOnSlider() {},
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
