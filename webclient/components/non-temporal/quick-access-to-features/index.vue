<template>
  <div></div>
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

    // Overwriting the Stopcallback fn so by default all shortcuts will work in input area. Ref: https://craig.is/killing/mice
    this.$mousetrap.prototype.stopCallback = function (e, element, combo) {
      return false
    }

    // For reason of reasign see: https://stackoverflow.com/questions/52311630/problem-with-scope-functions-in-method-from-vue-js
    var parentScope = this

    this.$mousetrap.bind(['a', 'ctrl+a'], function (e) {
      return parentScope.activateTab(e, 'allergies') // if actuvateTab returns true then the charecter shows in the form. Otherwise the charecter does not show in form
    })
    this.$mousetrap.bind(['c', 'ctrl+c'], function (e) {
      return parentScope.activateTab(e, 'chief_complaint')
    })
    this.$mousetrap.bind(['d', 'ctrl+d'], function (e) {
      return parentScope.activateTab(e, 'diagnosis')
    })
    this.$mousetrap.bind(['e', 'ctrl+e'], function (e) {
      return parentScope.activateTab(e, 'examination')
    })
    this.$mousetrap.bind(['f', 'ctrl+f'], function (e) {
      return parentScope.activateTab(e, 'family_history')
    })
    this.$mousetrap.bind(['g', 'ctrl+g'], function (e) {
      return parentScope.activateTab(e, 'goals')
    })
    this.$mousetrap.bind(['h', 'ctrl+h'], function (e) {
      return parentScope.activateTab(e, 'psych_review_of_system')
    })
    this.$mousetrap.bind(['i', 'ctrl+i'], function (e) {
      return parentScope.activateTab(e, 'reminders')
    })
    this.$mousetrap.bind(['l', 'ctrl+l'], function (e) {
      return parentScope.activateTab(e, 'plan_comments')
    })
    this.$mousetrap.bind(['m', 'ctrl+w'], function (e) {
      return parentScope.activateTab(e, 'medication_orders')
    })
    this.$mousetrap.bind(['n', 'ctrl+n'], function (e) {
      return parentScope.activateTab(e, 'miscellaneous_notes')
    })
    this.$mousetrap.bind(['o', 'ctrl+o'], function (e) {
      return parentScope.activateTab(e, 'process_notes')
    })
    this.$mousetrap.bind(['p', 'ctrl+p'], function (e) {
      return parentScope.activateTab(e, 'past_psych_history')
    })
    this.$mousetrap.bind(['r', 'ctrl+r'], function (e) {
      return parentScope.activateTab(e, 'screens')
    })
    this.$mousetrap.bind(['s', 'ctrl+s'], function (e) {
      return parentScope.activateTab(e, 'service_statements')
    })
    this.$mousetrap.bind(['t', 'ctrl+t'], function (e) {
      return parentScope.activateTab(e, 'recommendations')
    })
    this.$mousetrap.bind(['v', 'ctrl+v'], function (e) {
      return parentScope.activateTab(e, 'vitals')
    })
    this.$mousetrap.bind(['w', 'ctrl+w'], function (e) {
      return parentScope.activateTab(e, 'medical_review_of_system')
    })
    this.$mousetrap.bind(['y', 'ctrl+f'], function (e) {
      return parentScope.activateTab(e, 'medical_history')
    })

    // Open dot phrases
    this.$mousetrap.bind(
      [
        '. a',
        '. b',
        '. c',
        '. d',
        '. e',
        '. f',
        '. g',
        '. h',
        '. i',
        '. j',
        '. k',
        '. l',
        '. m',
        '. n',
        '. o',
        '. p',
        '. q',
        '. r',
        '. s',
        '. t',
        '. u',
        '. v',
        '. w',
        '. x',
        '. y',
        '. z',
      ],
      this.dotPhrases
    )
  },
  methods: {
    activateTab(e, pTab) {
      // This if is needed so that ".a" and any such pattern will work from input and textarea.
      if (
        e.srcElement.tagName == 'INPUT' ||
        e.srcElement.tagName == 'SELECT' ||
        e.srcElement.tagName == 'TEXTAREA' ||
        (e.srcElement.contentEditable && e.srcElement.contentEditable == 'true')
      ) {
        // case: Shortcut not allowed here
        return true // If user pressed a .. this a will be visisble since I am returning true here
      } else {
        clientTblOfCommonForAllComponents.insertOrUpdate({
          data: [{ fieldName: 'form-def-id-for-change-in-vertical-tabs', fieldValue: pTab }],
        })
        // Goal: Do not see C typed in the input field
        return false
      }
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
