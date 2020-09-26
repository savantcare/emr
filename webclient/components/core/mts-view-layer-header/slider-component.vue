<template>
  <div>
    <vue-slider
      v-model="sliderCurrentValue"
      :marks="timeOfApptsStartToMarkOnSlider"
      :included="true"
      @change="handleSliderChangeEvent"
    ></vue-slider>
    <!-- Slide to reveal content can possibly be done with: 
      1. http://v-show-slide.peterhegman.com/ 
      2. https://element.eleme.io/#/en-US/component/collapse#basic-usage 
            For it to come infront instead of pushing dowm: https://stackoverflow.com/questions/55889518/element-ui-el-collapse-in-front-if-others-components
      -->
    <div>Note details for:</div>
  </div>
</template>

<script>
export default {
  data() {
    // KT: Why is this a function and not a object? Ref: https://vuejs.org/v2/style-guide/#Component-data-essential
    return {
      tabMode: true,
      patientInfo: null,
      sliderCurrentValue: 100,
      timeOfApptsStart: [],
      patientId: this.$route.query.patient_id,
    }
  },
  computed: {
    activityStatus() {
      return this.$store.state.connectionStatus
    },
    timeOfStateSelectedInHeader() {
      return this.$store.state.multiStateDisplayArea.timeOfStateSelectedInHeader
    },
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
  watch: {
    tabMode() {
      // this.updateMultiStateDisplayArea();
    },
  },
  mounted() {},
  methods: {
    // TODO: This should take data from timeOfApptsStartToMarkOnSlider
    formatTooltip(val) {
      if (val === 0) {
        return 'First appointment on 5th Jan 2020'
      }
      if (val === 20) {
        return 'Second appointment on 15th Feb 2020'
      }
      if (val === 40) {
        return 'Third appointment on 25th April 2020'
      }
    },
    async updateMultiStateDisplayArea() {
      await this.$store.dispatch('getMultiStateDisplayAreaCtList', {
        type: this.tabMode === true ? 1 : 2,
        toast: this.$bvToast,
      })
    },
    handleSliderChangeEvent() {
      /* timeOfStateSelectedInHeader is watched by all components and they react when timeOfStateSelectedInHeader changes
         For e.g. in components/patient/recommendations/layer1Card.vue:241
            watch: {
             timeOfStateSelectedInHeader() {
      */

      /*
        if this.timeOfApptsStart.length is 0 then percent = 100
        if this.timeOfApptsStart.length is 1 then percent = 50
        if this.timeOfApptsStart.length is 2 then percent = 33
      */
      const percent = Math.floor(100 / (this.timeOfApptsStart.length + 1))

      /*
        sliderCurrentValue is 100. So when percent is 100 the index is 1
                                      When percent is 50 the index is 2
                                      When percent is 33 the index is 3
      */
      const index = this.sliderCurrentValue / percent

      // Default value of timeOfStateSelectedInHeader = 2038-01-19 03:14:07.999999 (This is default value stored by MariaDB)
      let timeOfStateSelectedInHeader = '2038-01-19 03:14:07.999999'

      /*
      How to convert a date to Mysql time stamp format?
      let timeOfStateSelectedInHeader = new Date()
         .toISOString()
         .slice(0, 19)
         .replace("T", " "); // DB expect date to be in TIMESTAMP format Ref: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
      */

      if (index < this.timeOfApptsStart.length + 1) {
        timeOfStateSelectedInHeader = this.timeOfApptsStart[index].dateTimeOfAppt
          .slice(0, 19)
          .replace('T', ' ')
      }
      this.$store.commit('settimeOfStateSelectedInHeader', timeOfStateSelectedInHeader)
    },
    handleSliderEndEvent() {
      // console.log(this.sliderCurrentValue);
    },
  },
}
</script>
