<!-- Reference implementation -->

<template>
  <div v-if="daUniqueIdOfEachRowFromOrm.length > 0" class="block">
    <!-- 
      Q) Why we are using :arrow dynamic in slider?
      -- If number of slide in slider is 1 (computed function 'getNumOfCarouselSlides' return 1) then no need to show arrow in slider. In this case 'dsSliderArrowVisiblity' should be 'never'.
      Otherwise if number of slide in slider is greater then 1 then we need to show arrow for next/previous slide. In this case 'dsSliderArrowVisiblity' should be 'always'.
     -->
    <!-- Reason for v-bind to pass boolean value https://stackoverflow.com/questions/49225002/passing-boolean-vue-prop-value-in-html -->
    <div v-for="slide in getNumOfCarouselSlides" :key="slide">
      <!-- Performance analysis  TODO
          
            If getNumOfCarouselSlides is 3  
              When carousel is first invoked.
                On console:
                "slide is: X" is printed 6 times. X is 1 to 3 and then 1 to 3
                From the change component message given is 18 times    

              When carousel is invoked 2nd time
                slide is: X" is printed 0 times
                From the change component message given is 0 times    

              Everytime prev or nexxt is clicked 
                "slide is: X" is printed 3 times
              From the change component message given is 18 times    
              {{ console.log('slide is ', slide) }}
        -->
      <!-- Why give :gutter="20" 
              There are 3 cards and they will come attached to each other if I do not give :gutter=20
          -->

      <div>
        <el-col v-for="remId in getArrayOfRemIdsToShowInThisCard" :key="remId">
          <el-card>
            <!-- For diff types of formType see remcl/edit-design-1.vue -->
            <ctChangeRem :first-prop="remId" form-type="embedded"></ctChangeRem>
          </el-card>
        </el-col>
      </div>
    </div>
  </div>
  <div v-else><el-alert title="No reminder found." type="info" show-icon> </el-alert></div>
</template>
<script>
import clientTbl from '../db/client-side/structure/reminders-of-a-patient-table.js'
import ctChangeRem from './reminder-edit.vue'
export default {
  components: { ctChangeRem },
  data() {
    return {
      diVirtualSlideNumber: 0,
      dsSliderArrowVisiblity: 'never',
    }
  },
  computed: {
    console: () => console, // Ref: https://stackoverflow.com/questions/51080447/
    getArrayOfRemIdsToShowInThisCard() {
      const arr = this.daUniqueIdOfEachRowFromOrm
      return arr
    },
    getNumOfCarouselSlides() {
      console.log(this.daUniqueIdOfEachRowFromOrm)
      return this.daUniqueIdOfEachRowFromOrm.length
    },

    daUniqueIdOfEachRowFromOrm() {
      let daUniqueIdOfEachRowFromOrm = new Array()
      const resultArFromOrm = clientTbl.fnGetAllRowsPossibleToEdit()
      if (resultArFromOrm.length) {
        for (let i = 0; i < resultArFromOrm.length; i++) {
          daUniqueIdOfEachRowFromOrm.push(resultArFromOrm[i].$id)
        }
      }
      return daUniqueIdOfEachRowFromOrm
    },
  },
  watch: {
    /*
      Problem: Sometimes an error comes 'Handling unexpected side effect in computed properties'
      Solution: you should not edit other data in computed property, you should use watch instead
      Ref: https://stackoverflow.com/questions/53757107/handling-unexpected-side-effect-in-computed-properties-vuejs
    */
    getNumOfCarouselSlides: {
      handler(newVal) {
        /*
          Goal: Show slider arrow if number of slide is greater then 1.
          Visiblity params is always/hover/never
          Ref: https://element.eleme.io/#/en-US/component/carousel
        */
        if (newVal > 1) {
          this.dsSliderArrowVisiblity = 'always'
        }
      },
    },
  },
  mounted() {},
  methods: {
    slideChanged(newSlideNumber, oldSlideNumber) {
      // This is virtual scroller. This improves performance substantially.
      console.log('slide changed from: ', oldSlideNumber, 'to: ', newSlideNumber)
      this.diVirtualSlideNumber = newSlideNumber
    },
  },
}
</script>
