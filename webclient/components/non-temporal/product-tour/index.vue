<template>
  <VTour name="myTour" :steps="steps" :options="{ highlight: true }" :callbacks="myCallbacks"></VTour>
</template>

<script>
/* Ref: https://github.com/pulsardev/vue-tour
Why download the source code and then run it?
I wanted to use element.io UI and that was not possible with a npm package.
v-tour has slots that allow some customization. But it was not possible to bring the complete look of element.ui
*/
import VTour from '@/components/non-temporal/external/vue-tour/components/VTour.vue'
import VStep from '@/components/non-temporal/external/vue-tour/components/VStep.vue'

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
          target: '.el-icon-setting',
          content: 'This is the appointment timeline. Each dot represents a different appointment',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false, // Ref: https://github.com/pulsardev/vue-tour/wiki/Features#disable-scroll-between-steps
          },
        },
        {
          target: '.el-icon-setting',
          content: 'Click on any of the dots to see the printable NOTE on that date',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false, // Ref: https://github.com/pulsardev/vue-tour/wiki/Features#disable-scroll-between-steps
          },
        },
        {
          target: '.el-icon-setting',
          content: 'You can click on the icons inside the printable note to add information like a reminder',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false, // Ref: https://github.com/pulsardev/vue-tour/wiki/Features#disable-scroll-between-steps
          },
        },
        {
          target: '.el-icon-setting',
          content: 'Click on the blue button to lock the note',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false, // Ref: https://github.com/pulsardev/vue-tour/wiki/Features#disable-scroll-between-steps
          },
        },
        {
          target: '.el-icon-setting',
          /**
           * In the example given in the el-card it is used as a template which generates a html content dynamically at the time of app load.
           * But when el-card is used as a content it gets loaded as it is written in the content and cannot generate dynamic html format.
           * So, we have used the rendered html format of el-card as a content.
           */
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F2 gets you work product mode</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',

          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '#layer1RightSide .s-css-class-outer-most-card-header',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F3 gets you analysis mode</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F1 gets you the dashboard</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '#layer1RightSide .s-css-class-outer-most-card-header',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F4 Compares current note with previous note</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F5 Is the quickest way to add a task</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F6 Is the quickest way to add a medication order</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F7 Is the quickest way to add a reminder</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F8 Is the quickest way to add a recommendation</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F9 Is the quickest way to do MSE</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
        {
          target: '.el-icon-setting',
          content:
            '<div class="el-card box-card is-always-shadow"><div class="el-card__header"><div class="clearfix"><span>F10 totoggle between health and other components</span> </div></div><div class="el-card__body"> <div class="text item"><img src=https://cdn.osxdaily.com/wp-content/uploads/2011/01/quick-system-preferences-option-key-macbook.jpg height=300px class="image"></div></div></div>',
          params: {
            placement: 'top', // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
            enableScrolling: false,
          },
        },
      ],
    }
  },
  methods: {
    myCustomNextStepCallback(pCurrentStep) {
      this.actOnCurrentStep(pCurrentStep + 1)
    },
    myCustomPreviousStepCallback(pCurrentStep) {
      this.actOnCurrentStep(pCurrentStep - 1)
    },
    actOnCurrentStep(pCurrentStep) {
      if (pCurrentStep === 6) {
        this.$root.$emit('from-product-tour-start-dashboard-mode')
      }
      if (pCurrentStep === 4) {
        this.$root.$emit('from-product-tour-start-work-product-mode')
      }
      if (pCurrentStep === 5) {
        this.$root.$emit('from-product-tour-start-analysis-mode')
      }
    },
  },
}
</script>

<style>
/**
  I have added the following css to display tour guide div on the top most layer
  The z-index of the drawer is changing dynamically and taking values of more than 2000 like 2001,2013,2020 etc. There is no pattern found for this z-index logic. To make help tour guide appear on top of the drawer i need to give z-index that will always be more than the drawer z-index. I have put 99999 to be safe.
*/
body .v-tour > div {
  z-index: 99999;
}

/**
  To make tooltip appear on the top of the tour guide I need to give z-index more than tour guide z-index which is given 99999 in the above css line no.:- 195. 
  I have put 100000 to appear on the top lavel.
 */
.el-tooltip__popper {
  z-index: 100000 !important;
}
</style>
