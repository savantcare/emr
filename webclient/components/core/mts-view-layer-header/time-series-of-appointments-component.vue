<template>
  <div>
    <vue-slider
      v-model="value"
      :data="data"
      :data-value="'id'"
      :data-label="'name'"
      :process="false"
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
      value: 2,
      data: [
        {
          id: 1,
          name: '1st Jan 20',
        },
        {
          id: 2,
          name: '11th Jan 20',
        },
        {
          id: 3,
          name: '21st Jan 20',
        },
        {
          id: 4,
          name: '31st Jan 20',
        },
      ],
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
