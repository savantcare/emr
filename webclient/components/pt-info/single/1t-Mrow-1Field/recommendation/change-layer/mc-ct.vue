<!-- Reference implementation -->

<!--
The tree structure is:

Carausel                           |
  -- Carausel item                 |   These are the slides
    -- Cards                       |   Each card is a recommendation


Performance:
Inside reccl/c-ct.vue:mfGetRecDescUsingCache enable the console.log 
console.log(
        'Inside get desc. Only first time it needs to come from ORM and subsequently it can always come from cache, the value set by setRecDescOn5KeyPress'
      )
When this Ct is mounted it loads the ctChangeRec 204 times since the above console.log is put on console 204 times. 

Every time the slide is changed the mfGetRecDescUsingCache() is again called 204 times since on console.log I see 204 messages

How to solve this?
1. Load with getNumOfCarouselSlides as 2. 
2. Each time prev and next is clicked increment or descrement the local variable currentSlideNumber.
3. getArrayOfRecIDsToShowInThisCard depends on this.diVirtualSlideNumber

-->
<template>
  <div v-if="daUniqueIDOfEachRowFromOrm.length > 0" class="block">
    <!-- 
      Q) Why we are using :arrow dynamic in slider?
      -- If number of slide in slider is 1 (computed function 'getNumOfCarouselSlides' return 1) then no need to show arrow in slider. In this case 'dsSliderArrowVisiblity' should be 'never'.
      Otherwise if number of slide in slider is greater then 1 then we need to show arrow for next/previous slide. In this case 'dsSliderArrowVisiblity' should be 'always'.
     -->
    <el-carousel
      :arrow="dsSliderArrowVisiblity"
      trigger="click"
      :autoplay="false"
      @change="slideChanged"
    >
      <!-- Reason for v-bind to pass boolean value https://stackoverflow.com/questions/49225002/passing-boolean-vue-prop-value-in-html -->
      <el-carousel-item v-for="slide in getNumOfCarouselSlides" :key="slide">
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

        <el-row type="flex" :gutter="20">
          <el-col v-for="recID in getArrayOfRecIDsToShowInThisCard" :key="recID">
            <el-card>
              <!-- For diff types of formType see reccl/c-ct.vue -->
              <ctChangeRec :first-prop="recID" form-type="embedded"></ctChangeRec>
            </el-card>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div v-else><el-alert title="No recommendation found." type="info" show-icon> </el-alert></div>
</template>
<script>
import objOrm from '../db/client-side/structure/rec-table.js'
import ctChangeRec from './c-ct.vue'
export default {
  components: { ctChangeRec },
  data() {
    return {
      daUniqueIDOfEachRowFromOrm: [],
      diVirtualSlideNumber: 0,
      dsSliderArrowVisiblity: 'never',
    }
  },
  computed: {
    console: () => console,
    getArrayOfRecIDsToShowInThisCard() {
      console.log('The virtual slide number is', this.diVirtualSlideNumber)
      const firstCard = this.diVirtualSlideNumber * 3
      console.log('First rec card', firstCard)
      const arr = this.daUniqueIDOfEachRowFromOrm.slice(firstCard, firstCard + 3)
      return arr
    },
    getNumOfCarouselSlides() {
      const count = this.daUniqueIDOfEachRowFromOrm.length / 3
      const intValue = Math.ceil(count)
      console.log('number of slides in carousel are', count, intValue)
      return intValue
    },
  },
  watch: {
    getNumOfCarouselSlides: {
      handler(newVal) {
        if (newVal > 1) {
          this.dsSliderArrowVisiblity = 'always'
        }
      },
    },
  },
  mounted() {
    console.log('In mounted function')
    const resultArFromOrm = objOrm.fnGetValidUniqueUuidNotEmptyRows('description')
    if (resultArFromOrm.length) {
      for (let i = 0; i < resultArFromOrm.length; i++) {
        this.daUniqueIDOfEachRowFromOrm.push(resultArFromOrm[i].$id)
      }
    }
    console.log(this.daUniqueIDOfEachRowFromOrm)
  },
  methods: {
    slideChanged(newSlideNumber, oldSlideNumber) {
      console.log('slide changed from: ', oldSlideNumber, 'to: ', newSlideNumber)
      this.diVirtualSlideNumber = newSlideNumber
    },
  },
}
</script>
