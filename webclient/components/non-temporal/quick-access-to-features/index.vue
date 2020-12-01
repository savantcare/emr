<template>
  <div>
    <!-- Goal: Implement "system preferences -> Mission control -> hot corners" concept of MacOS on the view area -->
    <span
      @mouseover="actOnMouseOverSpan('analysis')"
      style="position: absolute; width: 4px; height: 50px; background-color: blue"
    ></span>
    <span
      @mouseover="actOnMouseOverSpan('production')"
      style="position: absolute; width: 4px; height: 50px; background-color: green; right: 0"
    ></span>
    <!-- END of hot corner area defination -->
  </div>
</template>

<script>
import clientTblOfCommonForAllComponents from '~/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'
import reminders from '../../patient-data/reminders/db/client-side/structure/reminders-of-a-patient-table'

export default {
  data() {
    return {}
  },
  computed: {},

  mounted() {
    // Goal: Open different "patient data sections" in the change layer with KB shortcuts-->

    this.$mousetrap.prototype.stopCallback = function (e, element, combo) {
      return false
    }

    // For reason of reasign see: https://stackoverflow.com/questions/52311630/problem-with-scope-functions-in-method-from-vue-js
    var parentScope = this

    this.$mousetrap.bind(['a', 'ctrl+a'], function (e) {
      parentScope.activateTab(e, 'allergies')
    })
    this.$mousetrap.bind(['c', 'ctrl+c'], this.actOnUserIntentToSeeChiefComplaint)
    this.$mousetrap.bind(['d', 'ctrl+d'], this.diagnosis)
    this.$mousetrap.bind(['e', 'ctrl+e'], this.examination)
    this.$mousetrap.bind(['f', 'ctrl+f'], this.actOnUserIntentToSeeFamilyHistory)
    this.$mousetrap.bind(['g', 'ctrl+g'], this.goals)
    this.$mousetrap.bind(['h', 'ctrl+h'], this.actOnUserIntentToSeeHPI)
    this.$mousetrap.bind(['i', 'ctrl+i'], this.reminders)
    this.$mousetrap.bind(['l', 'ctrl+l'], this.plan_comments)
    this.$mousetrap.bind(['m', 'ctrl+w'], this.medication_orders)
    this.$mousetrap.bind(['n', 'ctrl+n'], this.miscellaneous_notes)
    this.$mousetrap.bind(['o', 'ctrl+o'], this.process_notes)
    this.$mousetrap.bind(['p', 'ctrl+p'], this.actOnUserIntentToSeePastPsychHistory)
    this.$mousetrap.bind(['r', 'ctrl+r'], this.screens)
    this.$mousetrap.bind(['s', 'ctrl+s'], this.service_statements)
    this.$mousetrap.bind(['t', 'ctrl+t'], this.recommendations)
    this.$mousetrap.bind(['v', 'ctrl+v'], this.vitals)
    this.$mousetrap.bind(['w', 'ctrl+w'], this.medical_review_of_system)
    this.$mousetrap.bind(['y', 'ctrl+f'], this.medicalHistory)

    // Open dot phrases
    this.$mousetrap.bind(['. a', 'ctrl+f'], this.dotPhrases)

    // Goal: Implement "system preferences -> Mission control -> Show desktop -> Function key assignment" concept of MacOS on the view area -->
    this.$mousetrap.bind(['f1'], this.actOnF1ShortKeyPressed)
    this.$mousetrap.bind(['f2'], this.actOnF2ShortKeyPressed)
    this.$mousetrap.bind(['f3'], this.actOnF3ShortKeyPressed)
    this.$mousetrap.bind(['f10'], this.actOnF10ShortKeyPressed)

    this.$root.$on('from-product-tour-start-work-product-mode', (pRowId) => {
      this.goToWorkProductMode()
    })

    this.$root.$on('from-product-tour-start-dashboard-mode', (pRowId) => {
      this.goToDashboardMode()
    })

    this.$root.$on('from-product-tour-start-analysis-mode', (pRowId) => {
      this.goToAnalysisMode()
    })
  },
  methods: {
    // Goal: Catch KB events
    actOnF1ShortKeyPressed() {
      this.goToDashboardMode()
    },
    actOnF2ShortKeyPressed() {
      this.goToWorkProductMode()
    },
    actOnF3ShortKeyPressed() {
      this.goToAnalysisMode()
    },
    actOnF10ShortKeyPressed() {
      this.toggleBetweenHealthAndOtherComponents()
    },
    activateTab(e, pTab) {
      //      debugger
      if (
        e.srcElement.tagName == 'INPUT' ||
        e.srcElement.tagName == 'SELECT' ||
        e.srcElement.tagName == 'TEXTAREA' ||
        (e.srcElement.contentEditable && e.srcElement.contentEditable == 'true')
      ) {
        console.log('this shortcut not allowed here')
      } else {
        clientTblOfCommonForAllComponents.insertOrUpdate({
          data: [{ fieldName: 'form-def-id-for-change-in-vertical-tabs', fieldValue: pTab }],
        })
      }
      // Goal: Do not see C typed in the input field
      return false
    },
    actOnUserIntentToSeeChiefComplaint() {
      return this.activateTab('chief_complaint')
    },
    actOnUserIntentToSeeHPI() {
      return this.activateTab('psych_review_of_system')
    },
    actOnUserIntentToSeePastPsychHistory() {
      return this.activateTab('past_psych_history')
    },
    actOnUserIntentToSeeFamilyHistory() {
      return this.activateTab('family_history')
    },
    medicalHistory() {
      return this.activateTab('medical_history')
    },
    medical_review_of_system() {
      return this.activateTab('medical_review_of_system')
    },
    allergies(e) {
      return this.activateTab('allergies', e)
    },
    examination() {
      return this.activateTab('examination')
    },
    vitals() {
      return this.activateTab('vitals')
    },
    medication_orders() {
      return this.activateTab('medication_orders')
    },
    diagnosis() {
      return this.activateTab('diagnosis')
    },
    screens() {
      return this.activateTab('screens')
    },
    goals() {
      return this.activateTab('goals')
    },
    recommendations() {
      return this.activateTab('recommendations')
    },
    reminders() {
      return this.activateTab('reminders')
    },
    plan_comments() {
      return this.activateTab('plan_comments')
    },
    service_statements() {
      return this.activateTab('service_statements')
    },
    miscellaneous_notes() {
      return this.activateTab('miscellaneous_notes')
    },
    process_notes() {
      return this.activateTab('process_notes')
    },

    dotPhrases() {
      console.log('invoke dp')
    },

    goToDashboardMode() {
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'right-screen-extension-drawer-visibility', fieldValue: false }],
      })

      // For left side extension drawer // TODO: rename this to mtfSetLeftSideExtensionDrawerVisibility
      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'left-screen-extension-drawer-visibility', fieldValue: false }],
      })

      // set the split dimensions

      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-left-side-split-size', fieldValue: 50 }],
      })

      clientTblOfCommonForAllComponents.insertOrUpdate({
        data: [{ fieldName: 'layer1-right-side-split-size', fieldValue: 50 }],
      })
      this.$notify.success({
        message: 'Welcome to dashboard',
        position: 'top-left',
        duration: 1000,
        showClose: false,
        type: 'success',
      })
    },

    toggleBetweenHealthAndOtherComponents() {
      // Goal: Decide if I need to do update or insert
      const arOfObjectsFromCommonForAllComponents = clientTblOfCommonForAllComponents.find(
        'classification-of-component-to-show-on-left-hand-side'
      )

      if (arOfObjectsFromCommonForAllComponents) {
        if (arOfObjectsFromCommonForAllComponents['fieldValue'] == 'health') {
          clientTblOfCommonForAllComponents.insertOrUpdate({
            data: [
              {
                fieldName: 'classification-of-component-to-show-on-left-hand-side',
                fieldValue: 'other',
              },
            ],
          })
        } else {
          clientTblOfCommonForAllComponents.insertOrUpdate({
            data: [
              {
                fieldName: 'classification-of-component-to-show-on-left-hand-side',
                fieldValue: 'health',
              },
            ],
          })
        }
      } else {
        clientTblOfCommonForAllComponents.insertOrUpdate({
          data: [
            {
              fieldName: 'classification-of-component-to-show-on-left-hand-side',
              fieldValue: 'other',
            },
          ],
        })
      }
    },
  },
}
</script>
