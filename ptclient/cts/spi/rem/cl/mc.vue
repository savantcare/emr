<!--
The tree structure is:

Carausel                           |
  -- Carausel item                 |   These are the slides
    -- Cards                       |   Each card is a reminder


Performance:
Inside rem/cl/c.vue:getRemDescUsingCache enable the console.log 
console.log(
        'Inside get desc. Only first time it needs to come from ORM and subsequently it can always come from cache, the value set by setRemDescOn5KeyPress'
      )
When this Ct is mounted it loads the ctChangeRem 204 times since the above console.log is put on console 204 times. 

Every time the slide is changed the getRemDescUsingCache() is again called 204 times since on console.log I see 204 messages

How to solve this?
1. Load with getNumOfCarouselSlides as 2. 
2. Each time prev and next is clicked increment or descrement the local variable currentSlideNumber.
3. getArrayOfRemIDsToShowInThisCard depends on this.diVirtualSlideNumber

-->
<template>
  <div v-if="daUniqueIDOfEachRowFromORM.length > 0" class="block">
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
          <el-col v-for="remID in getArrayOfRemIDsToShowInThisCard" :key="remID">
            <el-card>
              <!-- The form can be 
              formType
              1. Independent
              2. Embedded that means it has its own submit and other controls. But the same page has other forms also
              3. sub-part-of-another-form
              -->
              <ctChangeRem :first-param="remID" open-with="mc"></ctChangeRem>
            </el-card>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
  <div v-else><el-alert title="No reminder found." type="info" show-icon> </el-alert></div>
</template>
<script>
import ormRem from '@/cts/spi/rem/db/vuex-orm/rem.js'
import ctChangeRem from '@/cts/spi/rem/cl/c.vue'
export default {
  components: { ctChangeRem },
  data() {
    return {
      daUniqueIDOfEachRowFromORM: [],
      diVirtualSlideNumber: 0,
      dsSliderArrowVisiblity: 'never',
    }
  },
  computed: {
    console: () => console, // Ref: https://stackoverflow.com/questions/51080447/
    getArrayOfRemIDsToShowInThisCard() {
      // TODO: Need to know when I am at the last cards
      console.log('The virtual slide number is', this.diVirtualSlideNumber)
      const firstCard = this.diVirtualSlideNumber * 3
      console.log('First rem card', firstCard)
      const arr = this.daUniqueIDOfEachRowFromORM.slice(firstCard, firstCard + 3)
      return arr
    },
    getNumOfCarouselSlides() {
      /* Important performance matter here
          If I return the actual length of this.daUniqueIDOfEachRowFromORM.length
          say the length is 100 then 300 times the change component will get called with different params.
        */
      const count = this.daUniqueIDOfEachRowFromORM.length / 3
      const intValue = Math.ceil(count)
      console.log('number of slides in carousel are', count, intValue)
      if (intValue > 1) {
        this.dsSliderArrowVisiblity = 'always'
      }
      return intValue
    },
  },
  mounted() {
    console.log('In mounted function')
    const resultArFromORM = ormRem.getValidUniqueUuidNotEmptyRows('remDesc')
    if (resultArFromORM.length) {
      for (let i = 0; i < resultArFromORM.length; i++) {
        this.daUniqueIDOfEachRowFromORM.push(resultArFromORM[i].$id)
      }
    }
    console.log(this.daUniqueIDOfEachRowFromORM)
  },
  methods: {
    slideChanged(newSlideNumber, oldSlideNumber) {
      // This is virtual scroller. This improves performance substantially.
      console.log('slide changed from: ', oldSlideNumber, 'to: ', newSlideNumber)
      this.diVirtualSlideNumber = newSlideNumber
    },
  },
}
</script>
