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
      return false // without this when the allergies form opens it will have a written in it
    })
    this.$mousetrap.bind(['c', 'ctrl+c'], function (e) {
      parentScope.activateTab(e, 'chief_complaint')
      return false
    })
    this.$mousetrap.bind(['d', 'ctrl+d'], function (e) {
      parentScope.activateTab(e, 'diagnosis')
      return false
    })
    this.$mousetrap.bind(['e', 'ctrl+e'], function (e) {
      parentScope.activateTab(e, 'examination')
      return false
    })
    this.$mousetrap.bind(['f', 'ctrl+f'], function (e) {
      parentScope.activateTab(e, 'family_history')
      return false
    })
    this.$mousetrap.bind(['g', 'ctrl+g'], function (e) {
      parentScope.activateTab(e, 'goals')
      return false
    })
    this.$mousetrap.bind(['h', 'ctrl+h'], function (e) {
      parentScope.activateTab(e, 'psych_review_of_system')
      return false
    })
    this.$mousetrap.bind(['i', 'ctrl+i'], function (e) {
      parentScope.activateTab(e, 'reminders')
      return false
    })
    this.$mousetrap.bind(['l', 'ctrl+l'], function (e) {
      parentScope.activateTab(e, 'plan_comments')
      return false
    })
    this.$mousetrap.bind(['m', 'ctrl+w'], function (e) {
      parentScope.activateTab(e, 'medication_orders')
      return false
    })
    this.$mousetrap.bind(['n', 'ctrl+n'], function (e) {
      parentScope.activateTab(e, 'miscellaneous_notes')
      return false
    })
    this.$mousetrap.bind(['o', 'ctrl+o'], function (e) {
      parentScope.activateTab(e, 'process_notes')
      return false
    })
    this.$mousetrap.bind(['p', 'ctrl+p'], function (e) {
      parentScope.activateTab(e, 'past_psych_history')
      return false
    })
    this.$mousetrap.bind(['r', 'ctrl+r'], function (e) {
      parentScope.activateTab(e, 'screens')
      return false
    })
    this.$mousetrap.bind(['s', 'ctrl+s'], function (e) {
      parentScope.activateTab(e, 'service_statements')
      return false
    })
    this.$mousetrap.bind(['t', 'ctrl+t'], function (e) {
      parentScope.activateTab(e, 'recommendations')
      return false
    })
    this.$mousetrap.bind(['v', 'ctrl+v'], function (e) {
      parentScope.activateTab(e, 'vitals')
      return false
    })
    this.$mousetrap.bind(['w', 'ctrl+w'], function (e) {
      parentScope.activateTab(e, 'medical_review_of_system')
      return false
    })
    this.$mousetrap.bind(['y', 'ctrl+f'], function (e) {
      parentScope.activateTab(e, 'medical_history')
      return false
    })

    // Open dot phrases
    this.$mousetrap.bind(['. a', 'ctrl+f'], this.dotPhrases)
  },
  methods: {
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
    dotPhrases() {
      console.log('invoke dp')
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
