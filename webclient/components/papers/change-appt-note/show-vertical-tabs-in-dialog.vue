<template>
  <!--  Explanation of props sent to ct

        Goal: make it easy to read view layer and also show change layer as a seperate layer
          custom-class="multi-tab-dialog"
          :modal=false creates issue to edit layer close functionality by 'Esc' button
          setting :modal=true  fixed the 'Esc' button issue but creates shadow in background
          which is fixed by css in line 285
          :modal="true"

        Goal: declutter the screen and at the same time give easy way to close the diaglog. Hence:
          :close-on-click-modal="true"
          :close-on-press-escape="true"
          :show-close="false"

        Goal: control dialog visibility based on user actions
          :visible.sync="vIsDialogHoldingTabsInChangeLayerVisible"

        Earlier width="90%" but it has been removed why?
          Goal is to let user read as much of the view layer as possible when the user is in change layer
          By specifying a fixed width I take that control away from the user.

        Earlier top="5vh" but it has been removed why?
          Goal is to let user move as little mouse as possible. Keeping modal in center of page will make mouse movement least.
          By specifying top start at 5% of height  I make the user move the mouse more

        Goal: Dont scroll the parent when model is scrolled.
          :lock-scroll="true"

        Goal: edit layer needs to become smaller or bigger depending on the child ct
          :width="vsDialogWidth"
  -->
  <el-dialog
    custom-class="multi-tab-dialog"
    :modal="true"
    :close-on-click-modal="true"
    :before-close="handleClose"
    :close-on-press-escape="true"
    :show-close="false"
    :visible="cfDrawerVisibility"
    :lock-scroll="true"
    top="1vh"
    :width="widthOfDialogContainingVerticalTabsAndComponent"
  >
    <!-- Why not keep each el-tab-pane content inside v-if
When rem is loaded the user goes to rec and comes back to rem. I do not want rem to be created again.
Since if created again the whole state is created again.
So things like collapsible state will get destroyed. Even though the rem description is there inside vuex-orm
    -->

    <!--
      Form focus step: 6/9
        When we switching tab then call a method function called 'mf_send_id_of_focussed_field_to_ct_inside_tab'.
        Ref: https://element.eleme.io/#/en-US/component/tabs#tabs-events
    -->

    <!--
      Q). Why we have removed height from below el-tabs?
        Problem: Dialog box scroll in add is not working.
        Solution: I have removed height from below el-tabs section.
          Hence, the height of popup window is same as height of content. And if height of content is greater than
          parent window height then scroll on y-axis will automatically appear on parent window.

    <el-tabs
      tab-position="left"
      style="height: 900px"
      v-model="activeTabName"
      type="border-card"
      @tab-click="mf_send_id_of_focussed_field_to_ct_inside_tab(activeTabName)"
    >-->
    <el-tabs :tab-position="positionOfAllTabNames" v-model="activeTabName" type="border-card">
      <el-tab-pane label="Name" name="name" tabindex="0">
        <span slot="label"> Name </span>
        <name />
      </el-tab-pane>
      <el-tab-pane label="Date Of Birth" name="date_of_birth" tabindex="0">
        <span slot="label"> <u>D</u>OB</span>
        <routerDateOfBirth
          :key="new Date().getTime()"
          why="Generating key everytime since the router decides the clientSideUniqRowId of the row to be edited. If the mounted fn was not getting called then the correct ID was not being sent to the edit ct."
          improvement="here the key can be current appt ID. Since during one appt the router does not need to be invoked twice."
        />
      </el-tab-pane>
      <el-tab-pane label="Chief complaint" name="chief_complaint" tabindex="0">
        <span slot="label"> <u>C</u>hief complaint </span>
        <routeChiefComplaint
          :key="new Date().getTime()"
          why="Generating key everytime since the router decides the clientSideUniqRowId of the row to be edited. If the mounted fn was not getting called then the correct ID was not being sent to the edit ct."
          improvement="here the key can be current appt ID. Since during one appt the router does not need to be invoked twice."
        />
      </el-tab-pane>
      <el-tab-pane
        label="Sub Psych ROS (HPI)"
        name="psych_review_of_system"
        tabindex="0"
        problem1="This tab index is not getting applied to the child div inside el-tab-pane"
      >
        <span slot="label"> Sub Psych ROS (<u>H</u>PI) </span>
        <routePsychReviewOfSystem
          :key="new Date().getTime()"
          why="Generating key everytime since the router decides the clientSideUniqRowId of the row to be edited. If the mounted fn was not getting called then the correct ID was not being sent to the edit ct."
          improvement="here the key can be current appt ID. Since during one appt the router does not need to be invoked twice."
        />
      </el-tab-pane>
      <el-tab-pane label="Past psych history" name="past_psych_history">
        <span slot="label" tabindex="0"> <u>P</u>ast psych history </span>

        <routePastPsychHistory
          :key="new Date().getTime()"
          why="Generating key everytime since the router decides the clientSideUniqRowId of the row to be edited. If the mounted fn was not getting called then the correct ID was not being sent to the edit ct."
          improvement="here the key can be current appt ID. Since during one appt the router does not need to be invoked twice."
        />
      </el-tab-pane>
      <el-tab-pane label="Family history" name="family_history">
        <span slot="label" tabindex="0"> <u>F</u>amily history </span>
        <el-tabs v-model="activeHorizontalTab">
          <el-tab-pane label="Change" name="change">
            <el-divider>Add</el-divider>
            <familyHistory />
            <el-divider>Edit</el-divider>
            <fhHorizontalEdit />
          </el-tab-pane>
          <el-tab-pane label="Timeline" name="second">Family history timelime</el-tab-pane>
          <el-tab-pane label="Deleted" name="third">Deleted family history</el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="Medical history" name="medical_history">
        <span slot="label" tabindex="0"> Medical histor<u>y</u> </span>
        <el-tabs v-model="activeHorizontalTab">
          <el-tab-pane label="Change" name="change">
            <el-divider>Add</el-divider>
            <medicalHistory />
            <el-divider>Edit</el-divider>
            <mhHorizontalEdit />
          </el-tab-pane>
          <el-tab-pane label="Timeline" name="second">Medical history timelime</el-tab-pane>
          <el-tab-pane label="Deleted" name="third">Deleted medical history</el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <!--<el-tab-pane label="Medication list" name="medication_list">
        <span slot="label" tabindex="0">Medication list</span>
        <routeMedicationList :key="new Date().getTime()" />
      </el-tab-pane>-->
      <el-tab-pane label="Social history" name="social_history">
        <span slot="label" tabindex="0"> Social histor<u>y</u> </span>
        <routeSocialHistory :key="new Date().getTime()" />
      </el-tab-pane>
      <el-tab-pane label="M review of systems" name="medical_review_of_system">
        <span slot="label"> M revie<u>w</u> of systems </span>
        <routerMros :key="new Date().getTime()" />
      </el-tab-pane>
      <el-tab-pane label="Allergies" name="allergies">
        <span slot="label"> <u>A</u>llergies </span>
        <routeAllergies />
      </el-tab-pane>
      <el-tab-pane label="Examination" name="examination">
        <span slot="label"> <u>E</u>xamination </span>
        <routeExam :key="new Date().getTime()" />
      </el-tab-pane>
      <el-tab-pane label="Vitals" name="vitals">
        <span slot="label"> <u>V</u>itals </span>
        <routeWeight name="weight" />
        <routeHeight name="height" />
        <routePulse name="pulse" />
        <routeTemperature name="temperature" />
        <routeBloodPressure name="blood_pressure" />
        <routeBloodSugar name="blood_sugar" />
        <routeBmi name="bmi" />
        <routeOxygenSaturation name="oxygenSaturation" />
        <routeWaistCircumference name="waist_circumference" />
      </el-tab-pane>
      <el-tab-pane label="Asmnt & diagnosis" name="diagnosis">
        <span slot="label"> Asmnt & <u>d</u>iagnosis </span>
        <el-divider>Add</el-divider>
        <dxAdd />
        <el-divider>Edit</el-divider>
        <diagnosisMHorizontalEdit/>
      </el-tab-pane>
      <el-tab-pane label="Screens" name="screens">
        <span slot="label"> Sc<u>r</u>eens </span>
        <screensAdd />
      </el-tab-pane>

      <el-tab-pane label="Goals" name="goals">
        <span slot="label"> <u>G</u>oals </span>
        <el-tabs v-model="activeHorizontalTab">
          <el-tab-pane label="Change" name="change">
            <el-divider>Add</el-divider>
            <goalsAdd />
            <el-divider>Edit</el-divider>
            <goalMHorizontalEdit />
          </el-tab-pane>
          <el-tab-pane label="Timeline" name="second">Goal timelime</el-tab-pane>
          <el-tab-pane label="Deleted" name="third">Deleted goals</el-tab-pane>
        </el-tabs>
      </el-tab-pane>

      <el-tab-pane label="Medication orders" name="medication_orders">
        <span slot="label"> <u>M</u>edication orders </span>
        <routeMedicationAddAndList :key="new Date().getTime()" />
      </el-tab-pane>
      <el-tab-pane label="Recommendations" name="recommendations">
        <span slot="label"> Recommenda<u>t</u>ions </span>

        <el-tabs v-model="activeHorizontalTab">
          <el-tab-pane label="Change" name="change">
            <el-divider>Add</el-divider>
            <recAdd />
            <el-divider>Edit</el-divider>
            <recMHorizontalEdit />
          </el-tab-pane>
          <el-tab-pane label="Timeline" name="second">Reminder timelime</el-tab-pane>
          <el-tab-pane label="Deleted" name="third">Deleted reminders</el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="Reminders" name="reminders">
        <span slot="label"> Rem<u>i</u>nders </span>
        <el-tabs v-model="activeHorizontalTab">
          <el-tab-pane label="Change" name="change">
            <el-divider>Add</el-divider>
            <remAdd />
            <el-divider>Edit</el-divider>
            <remMHorizontalEdit />
          </el-tab-pane>
          <el-tab-pane label="Timeline" name="second">Reminder timelime</el-tab-pane>
          <el-tab-pane label="Deleted" name="third">Deleted reminders</el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="Plan comments" name="plan_comments" key="400">
        <span slot="label"> P<u>l</u>an comments </span>
        <el-tabs v-model="activeHorizontalTab">
          <el-tab-pane label="Change" name="change">
            <el-divider>Add</el-divider>
            <pcAdd />
            <el-divider>Edit</el-divider>
            <pcHorizontalEdit />
          </el-tab-pane>
          <el-tab-pane label="Timeline" name="second">Plan comments timelime</el-tab-pane>
          <el-tab-pane label="Deleted" name="third">Deleted plan comments</el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="Service statements" name="service_statements" key="300">
        <span slot="label"> <u>S</u>ervice statements </span>
        <routeSS :key="new Date().getTime()" />
      </el-tab-pane>
      <el-tab-pane label="Misc Note" name="miscellaneous_notes" key="200">
        <span slot="label"> Misc<u>n</u>ote </span>
        <el-tabs v-model="activeHorizontalTab">
          <el-tab-pane label="Change" name="change">
            <el-divider>Add</el-divider>
            <miscNote />
            <el-divider>Edit</el-divider>
            <miscHorizontalEdit />
          </el-tab-pane>
          <el-tab-pane label="Timeline" name="second">Misc notes timelime</el-tab-pane>
          <el-tab-pane label="Deleted" name="third">Misc Notes comments</el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="Process Note" name="process_notes" key="100">
        <span slot="label"> Pr<u>o</u>cess note </span>
        <el-tabs v-model="activeHorizontalTab">
          <el-tab-pane label="Change" name="change">
            <el-divider>Add</el-divider>
            <processNote />
            <el-divider>Edit</el-divider>
            <pnHorizontalEdit />
          </el-tab-pane>
          <el-tab-pane label="Timeline" name="second">Process note timelime</el-tab-pane>
          <el-tab-pane label="Deleted" name="third">Process note comments</el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import allPatientDataTbls from '@/components/non-temporal/form-manager/all-client-tables.js'

import routeChiefComplaint from '@/components/patient-data/chief-complaint/change-layer/router.vue'
import routerDateOfBirth from '@/components/patient-data/date-of-birth/change-layer/router.vue'
import routePastPsychHistory from '@/components/patient-data/past-psych-history/change-layer/router.vue'

import familyHistory from '@/components/patient-data/family-history/change-layer/family-history-add.vue'
import fhHorizontalEdit from '@/components/patient-data/family-history/change-layer/medit-horizontal.vue'

import routeSocialHistory from '@/components/patient-data/social-history/change-layer/router.vue'
import routeMedicationAddAndList from '@/components/patient-data/medication-orders/change-layer/router.vue'

import medicalHistory from '@/components/patient-data/medical-history/change-layer/medical-history-add.vue'
import name from '@/components/patient-data/name/change-layer/router.vue'
import mhHorizontalEdit from '@/components/patient-data/medical-history/change-layer/medit-horizontal.vue'

import routeAllergies from '@/components/patient-data/allergies/change-layer/router.vue'

import miscNote from '@/components/patient-data/miscellaneous-notes/change-layer/add-ct.vue'
import miscHorizontalEdit from '@/components/patient-data/miscellaneous-notes/change-layer/medit-horizontal.vue'

import processNote from '@/components/patient-data/process-notes/change-layer/add-ct.vue'
import pnHorizontalEdit from '@/components/patient-data/process-notes/change-layer/medit-horizontal.vue'

import routeExam from '@/components/patient-data/examination/change-layer/router.vue'

import routeWeight from '@/components/patient-data/weight/change-layer/router.vue'
import routePulse from '@/components/patient-data/pulse/change-layer/router.vue'
import routeHeight from '@/components/patient-data/height/change-layer/router.vue'
import routeTemperature from '@/components/patient-data/temperature/change-layer/router.vue'
import routeBloodPressure from '@/components/patient-data/blood-pressure/change-layer/router.vue'
import routeBloodSugar from '@/components/patient-data/blood-sugar/change-layer/router.vue'
import routeWaistCircumference from '@/components/patient-data/waist-circumference/change-layer/router.vue'
import routeBmi from '@/components/patient-data/bmi/change-layer/router.vue'
import routeOxygenSaturation from '@/components/patient-data/oxygen-saturation/change-layer/router.vue'

import routerMros from '@/components/patient-data/medical-review-of-system/change-layer/router.vue'
import dxAdd from '@/components/patient-data/diagnosis/change-layer/diagnosis-add.vue'
import diagnosisMHorizontalEdit from '@/components/patient-data/diagnosis/change-layer/medit-horizontal.vue'
import screensAdd from '@/components/patient-data/screens/change-layer/add-ct.vue'
import goalsAdd from '@/components/patient-data/goals/change-layer/add-ct.vue'
import goalMHorizontalEdit from '@/components/patient-data/goals/change-layer/medit-horizontal.vue'

import recAdd from '@/components/patient-data/recommendations/change-layer/recommendation-add.vue'
import recMHorizontalEdit from '@/components/patient-data/recommendations/change-layer/medit-horizontal.vue'

import remAdd from '@/components/patient-data/reminders/change-layer/add-ct.vue'
import remMHorizontalEdit from '@/components/patient-data/reminders/change-layer/medit-horizontal.vue'

import pcAdd from '@/components/patient-data/plan-comments/change-layer/add-ct.vue'
import pcHorizontalEdit from '@/components/patient-data/plan-comments/change-layer/medit-horizontal.vue'

import routeSS from '@/components/patient-data/service-statements/change-layer/router.vue'

import commonForAllCts from '@/components/non-temporal/common-for-all-components/db/client-side/structure/table.js'
import routePsychReviewOfSystem from '@/components/patient-data/psych-review-of-system/change-layer/router.vue'
export default {
  name: 'CLTabsInDialogManager',
  data() {
    return {
      activeTabName: 'psych_review_of_system',
      formDefId: '',
      /**
       * Form focus step: 4/9
       *  Initialize a array named 'arFormFieldIndexWithFocus' for storing cursor focus position.
       */
      arFormFieldIndexWithFocus: {},
      activeHorizontalTab: 'change',
      widthOfDialogContainingVerticalTabsAndComponent: '80%',
      positionOfAllTabNames: 'left',
      daOfAllComponentInVitals: [
        'weight', 'height', 'pulse', 'temperature', 'blood_pressure', 'blood_sugar', 'bmi', 'oxygen_saturation', 'waist_circumference'
      ]
    }
  },
  components: {
    routeChiefComplaint,
    routerDateOfBirth,
    routePastPsychHistory,
    familyHistory,
    fhHorizontalEdit,
    routeSocialHistory,
    medicalHistory,
    name,
    mhHorizontalEdit,
    routeAllergies,
    miscNote,
    miscHorizontalEdit,
    processNote,
    pnHorizontalEdit,
    dxAdd,
    screensAdd,
    routeExam,
    routeWeight,
    routeHeight,
    routePulse,
    routeTemperature,
    routeBloodPressure,
    routeBloodSugar,
    routeBmi,
    routeOxygenSaturation,
    routeWaistCircumference,
    routerMros,
    goalsAdd,
    goalMHorizontalEdit,
    diagnosisMHorizontalEdit,
    recAdd,
    recMHorizontalEdit,
    remAdd,
    remMHorizontalEdit,
    pcAdd,
    pcHorizontalEdit,
    routeSS,
    routeMedicationAddAndList,
    routePsychReviewOfSystem,
  },
  watch: {
    activeTabName: {
      immediate: true,
      handler(pVal) {
        // console.log('setting tabIndex for', pVal)

        /**
         * Problem: When I use keyboard shortcut to go to a different tab the focus does not change.
         * Solution: If activetabName will change then call method function to focus form field instead of @tab-click
         */
        this.mf_send_id_of_focussed_field_to_ct_inside_tab(pVal)

        /* Goal2: Help large horizontal spae needing Ct. medication-list. Increase the width if this is medication list */
        if (pVal === 'medication_list') {
          this.widthOfDialogContainingVerticalTabsAndComponent = '100%'
          this.positionOfAllTabNames = 'bottom'
        } else {
          this.widthOfDialogContainingVerticalTabsAndComponent = '80%'
          this.positionOfAllTabNames = 'left'
        }
      },
    },
    cfDrawerVisibility: {
      /**
       * Why we added this watcher on computed function named 'cfDrawerVisibility'
       * Problem: I click outside the change paper and then open the change paper again then focus not working.
       * Solution: If value of cfDrawerVisibility will change and if it will true then call method function to focus field
       */
      immediate: true,
      handler(pVal) {
        if (pVal) {
          /**
           * Why we have added setTimeout function below?
           * -- In the below function named 'mf_send_id_of_focussed_field_to_ct_inside_tab',
           * fired a event to the 'add-form.vue' page.
           * In the mounted hook of 'add-form.vue' page, listen the below fired event and then process to focus.
           *
           * In this case, when I click first time on the 'm review of system' after page load,
           * initializing mounted hook of 'add-form.vue' after the event fired, thats the problem.
           * So, to solve this problem I have added 200 millisecond delay to fire event in the time of popup load.
           */
          setTimeout(() => this.mf_send_id_of_focussed_field_to_ct_inside_tab(this.activeTabName), 200)
        }
      },
    },
  },
  computed: {
    vIsDialogHoldingTabsInChangeLayerVisible: {
      get() {
        this.dIsSettingsDialogVisible = true
      },
      set(value) {
        this.$store.commit('mtfSetTabDialogVisibility', value)
      },
    },
    cfDrawerVisibility() {
      const drawerVisibility = commonForAllCts.find('form-def-id-for-change-in-vertical-tabs')

      if (drawerVisibility) {
        if (drawerVisibility['fieldValue'] !== 'false') {
          if (this.daOfAllComponentInVitals.includes(drawerVisibility['fieldValue'])) {
            this.formDefId = 'vitals'
          } else {
            this.formDefId = drawerVisibility['fieldValue']
          }
          this.activeTabName = this.formDefId
          return true
        }
      }

      return false
    },
  },
  mounted() {
    this.vIsDialogHoldingTabsInChangeLayerVisible = false

    /**
     * Form focus step: 3/9
     *  Receive fieldNameInDb and form index (focus posiotion detail) from event listener
     *  then call a method function named 'mf_store_id_of_focussed_field_in_tab' to store focus position details.
     * Doc should have explained why is timeout needed ? @raj
     */
    const eventName = 'event-from-form-field-to-set-focus'
    this.$root.$on(eventName, (pFormDefId, pFieldNameInDb, pIndex) => {
      setTimeout(() => this.mf_store_id_of_focussed_field_in_tab(pFormDefId, pFieldNameInDb, pIndex), 200)
    })
  },
  methods: {
    mf_store_id_of_focussed_field_in_tab(pFormDefId, pFieldNameInDb, pIndex) {
      /**
       * Form focus step: 5/9
       *  Storing form focus position details in a multidimentional array
       *
       * In the case of vitals, activeTabName and pFormDefId is different.
       * To resolve this above case, I have sent activeTabName as array key and added one more item as formDefId
       */
      this.arFormFieldIndexWithFocus[this.activeTabName] = []
      this.arFormFieldIndexWithFocus[this.activeTabName]['formDefId'] = pFormDefId
      this.arFormFieldIndexWithFocus[this.activeTabName]['index'] = pIndex
      this.arFormFieldIndexWithFocus[this.activeTabName]['fieldNameInDb'] = pFieldNameInDb
    },
    handleClickOnSettingsIcon() {
      this.dIsSettingsDialogVisible = true
    },
    handleChange(val) {},
    handleClose(done) {
      commonForAllCts.insertOrUpdate({
        data: [{ fieldName: 'form-def-id-for-change-in-vertical-tabs', fieldValue: 'false' }],
      })
    },
    mf_send_id_of_focussed_field_to_ct_inside_tab(pActiveTabName) {
      /**
       * Form focus step: 7/9
       *  Send activeTabName and focus position array set (previously stored focus position for this tab) to 'add-form.vue' page using event listener
       */
      const eventName = 'event-from-tab-change-to-focus-form-field'
      this.$root.$emit(eventName, pActiveTabName, this.arFormFieldIndexWithFocus[pActiveTabName])
    },
  },
}
</script>

<style>
/* Why put the shadow?
Goal
1. Read the view layer even when I have change layer open
2. Clearly see the change layer as different from view layer

Option 1:
When I set modal=true in el-dialog the background content is hard to read. Hence goal 1 is defeated.

Option 2:
When I set modal=false in el-dialog the popup that comes in change layer is hard to distinguish from view layer. Hence Goal 2 is defeated.

Option 3:
Setting modal=false to get the popup of change layer where the view layer is still readable and the shadow to make the change layer seem seperate from view layer

Hence chose option 3.

Q) How to put the shadow?
   https://stackoverflow.com/questions/3448813/jqueryui-how-to-make-a-shadow-around-a-dialog-box
*/
.multi-tab-dialog {
  -webkit-box-shadow: 0px 0px 120px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 120px rgba(0, 0, 0, 0.5);
}
.set-of-tabs {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  width: auto;
}
/*
Disabled shadow provided by modal=true in line 50
*/
.v-modal {
  background: none;
}

/**
  Problem: Div gets a border in psych ROS
  -- To remove focus outline from a div, we need to add a css 'outline: 0' to that div
  Ref: https://stackoverflow.com/questions/33632907/remove-border-outline-that-appears-after-i-click-an-element-on-my-page
*/
.el-tabs__content .el-tab-pane:focus {
  outline: 0;
}

/** Goal: When using the top horizontal tab bar. There is a extra line below the bar. I removed the line to make the system cleaner.
The horizontal bar at the bottom of the tabs is visible at: https://element.eleme.io/#/en-US/component/tabs
 */
.el-tabs__nav-wrap::after {
  background-color: #fff;
}
</style>
