<template>
  <VTour
    name="myTour"
    :steps="steps"
    :options="{ highlight: true }"
    :callbacks="myCallbacks"
  ></VTour>
</template>

<script>
/* Ref: https://github.com/pulsardev/vue-tour
Why download the source code and then run it?
I wanted to use element.io UI and that was not possible with a npm package.
v-tour has slots that allow some customization. But it was not possible to bring the complete look of element.ui
*/
import VTour from '@/components/others/external/vue-tour/components/vTour.vue'
import VStep from '@/components/others/external/vue-tour/components/VStep.vue'

export default {
  mounted() {
    // this initialized the vuetour. The $tours is abailable to all Cts as it has been added as Vue.prototype.$tours = {} see line 82
    this.$tours['myTour'].start()
  },
  components: {
    VTour,
    VStep,
  },
  data() {
    return {
      myCallbacks: {
        onPreviousStep: this.myCustomPreviousStepCallback,
        onNextStep: this.myCustomNextStepCallback,
      },
      steps: [
        {
          target: '[data-v-step="appt-timeline"]',
          content:
            'This is the appointment timeline. Use this to compare notes between appointment ',

          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false, // Ref: https://github.com/pulsardev/vue-tour/wiki/Features#disable-scroll-between-steps
          },
        },
        {
          target: '.el-icon-setting',
          content: 'Use this to decide which notes show up in the timeline',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<el-card class="box-card"><div slot="header" class="clearfix"><span>F1 gets you the dashboard</span></div><div><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></el-card>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },

        {
          target: '.el-icon-setting',
          content:
            '<el-card class="box-card"><div slot="header" class="clearfix"><span>F2 gets you work product mode</span></div><div><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></el-card>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<el-card class="box-card"><div slot="header" class="clearfix"><span>F3 gets you analysis mode</span></div><div><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></el-card>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<el-card class="box-card"><div slot="header" class="clearfix"><span>F4 Compares current note with previous note</span></div><div><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></el-card>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<el-card class="box-card"><div slot="header" class="clearfix"><span>F5 Is the quickest way to add a task</span></div><div><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></el-card>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<el-card class="box-card"><div slot="header" class="clearfix"><span>F6 Is the quickest way to add a medication order</span></div><div><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></el-card>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<el-card class="box-card"><div slot="header" class="clearfix"><span>F7 Is the quickest way to add a reminder</span></div><div><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></el-card>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<el-card class="box-card"><div slot="header" class="clearfix"><span>F8 Is the quickest way to add a recommendation</span></div><div><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></el-card>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<el-card class="box-card"><div slot="header" class="clearfix"><span>F9 Is the quickest way to do MSE</span></div><div><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></el-card>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<el-card class="box-card"><div slot="header" class="clearfix"><span>F10 totoggle between health and other components</span></div><div><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></el-card>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
      ],
    }
  },
  methods: {
    myCustomPreviousStepCallback(currentStep) {
      console.log('prev step called')
      if (currentStep === 2) {
        console.log('[Vue Tour] Go to work product mode')
        this.$root.$emit('from-product-tour-start-work-product-mode')
      }
      if (currentStep === 3) {
        console.log('[Vue Tour] Go to analysis mode')
        this.$root.$emit('from-product-tour-start-analysis-mode')
      }
    },
    myCustomNextStepCallback(currentStep) {
      console.log('next step called')
      if (currentStep === 2) {
        console.log('[Vue Tour] Go to work product mode')
        this.$root.$emit('from-product-tour-start-work-product-mode')
      }
      if (currentStep === 3) {
        console.log('[Vue Tour] Go to analysis mode')
        this.$root.$emit('from-product-tour-start-analysis-mode')
      }
    },
  },
}
</script>
