<!-- 
absorb = true -> gives gravity effect 
included = true -> without this absorb does not work 
process = false -> the bottle fill effect gfoes away 
-->
<template>
  <div>
    <vue-slider v-model="value" :marks="marks2" :absorb="true" :included="true" :process="false">
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
      marks1: [0, 10, 30, 60, 100],

      marks2: {
        0: {
          label: '😊',
          style: {
            width: '8px',
            height: '8px',
            display: 'block',
            backgroundColor: '#69c0ff',
            transform: 'translate(-2px, -2px)',
          },
          labelStyle: {
            color: '#69c0ff',
          },
        },
        26: {
          label: '26℃',
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
