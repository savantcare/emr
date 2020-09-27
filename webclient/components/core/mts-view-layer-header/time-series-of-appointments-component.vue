<template>
  <vue-slider
    v-model="sliderCurrentValue"
    :marks="timeOfApptsStartToMarkOnSlider"
    :included="true"
    @change="handleSliderChangeEvent"
    @drag-start="handleSliderChangeEvent"
  ></vue-slider>
</template>

<script>
import clientSideTblOfViewCards from '@/components/core/manage-mts-view-layer-cards/db/client-side/structure/table.js'

export default {
  data() {
    return {
      sliderCurrentValue: 100,
      timeOfApptsStart: [],
    }
  },
  computed: {
    timeOfApptsStartToMarkOnSlider() {
      /*
      The first date is at 0 and todays date is at 100.

      The middle points get proprotionate space based on the distance between appts.

      The data returned looks like
      timeOfApptsStartToMarkOnSlider: {
         0: "1/15/20", // Here I want to show -> this.timeOfStateTime.date1
         20: "2/15/20",
         40: "4/25/20",
         100: {
           style: {
             color: "#1989FA"
           },
           label: this.$createElement("strong", "Current")
         }
      },
*/

      const result = {}
      if (this.timeOfApptsStart.length > 0) {
        const percent = Math.floor(100 / (this.timeOfApptsStart.length + 1))
        this.timeOfApptsStart.forEach((data, index) => {
          const { dateTimeOfAppt } = data

          result[index * percent] = dateTimeOfAppt.split('T')[0]
        })
      }
      result['100'] = {
        style: { color: '#1989FA' },
        label: this.$createElement('strong', 'Current'),
      }

      return result
    },
  },
  methods: {
    async handleSliderChangeEvent() {
      const noteCurrentValue = clientSideTblOfViewCards.find(2)
      const updateState = await clientSideTblOfViewCards.update({
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
