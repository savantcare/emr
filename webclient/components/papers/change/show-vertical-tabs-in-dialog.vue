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
          :visible.sync="vblIsdialogHoldingTabsInEditLayerVisible"      

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
    width="80%"
  >
    <!-- Why not keep each el-tab-pane content inside v-if
When rem is loaded the user goes to rec and comes back to rem. I do not want rem to be created again.
Since if created again the whole state is created again.
So things like collapsible state will get destroyed. Even though the rem description is there inside vuex-orm
    -->
    <el-tabs tab-position="left" style="height: 900px" v-model="activeTabName" type="border-card">
      <el-tab-pane label="Chief complaint" name="chief_complaint" key="1">
        <span slot="label"><u>C</u>hief complaint</span>
        <editChiefComplaint />
      </el-tab-pane>
      <el-tab-pane label="Sub Psych ROS (HPI)" name="psych_review_of_system" key="2">
        <span slot="label">Sub Psych ROS (<u>H</u>PI)</span>
        <prosAdd />
      </el-tab-pane>
      <el-tab-pane label="Past psych history" name="past_psych_history" key="3">
        <span slot="label"><u>P</u>ast psych history</span>
        <pastPsychHistory />
      </el-tab-pane>
      <el-tab-pane label="Family history" name="family_history" key="4">
        <span slot="label"><u>F</u>amily history</span>
        <familyHistory />
      </el-tab-pane>
      <el-tab-pane label="M review of systems" name="medical_review_of_system" key="5">
        <span slot="label"><u>M</u> review of systems</span>
        <mrosAdd
      /></el-tab-pane>
      <el-tab-pane label="Allergies" name="allergies" key="6">
        <span slot="label"><u>A</u>llergies</span>
        <allergies />
      </el-tab-pane>
      <el-tab-pane label="Examination" name="examination" key="7">
        <span slot="label"><u>E</u>xamination</span>
        <examAdd />
      </el-tab-pane>
      <el-tab-pane label="Vitals" name="vitals" key="8">
        <span slot="label"><u>V</u>itals</span>
        <weightAdd name="weight" key="9" />
        <heightAdd name="height" key="10" />
        <pulseAdd name="pulse" key="11" />
        <temperatureAdd name="temperature" key="12" />
        <bloodPressureAdd name="blood_pressure" key="13" />
        <bloodSugarAdd name="blood_sugar" key="14" />
        <bmiAdd name="bmi" key="15" />
        <waistCircumferenceAdd name="waist_circumference" key="16"
      /></el-tab-pane>
      <el-tab-pane label="Asmnt & diagnosis" name="diagnosis" key="19">
        <span slot="label">Asmnt & <u>d</u>iagnosis</span>
        <dxAdd
      /></el-tab-pane>
      <el-tab-pane label="Screens" name="screens" key="20">
        <span slot="label">Sc<u>r</u>eens</span><screensAdd
      /></el-tab-pane>
      <el-tab-pane label="Goals" name="goals" key="21">
        <span slot="label"><u>G</u>oals</span>
        <goalsAdd
      /></el-tab-pane>
      <el-tab-pane label="Recommendations" name="recommendations">
        <span slot="label"><u>R</u>ecommendations</span> <recAdd
      /></el-tab-pane>
      <el-tab-pane label="Reminders" name="reminders">
        <span slot="label">Rem<u>i</u>nders</span>
        <el-tabs v-model="first">
          <el-tab-pane label="Fast" name="first">
            <el-divider>Add</el-divider> <remAdd /> <el-divider>Edit</el-divider><remMHorizontalEdit />
          </el-tab-pane>
          <el-tab-pane label="Timeline" name="second">Reminder timelime</el-tab-pane>
          <el-tab-pane label="Deleted reminders" name="third">Deleted reminders</el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="Plan comments" name="plan_comments" key="24">
        <span slot="label">P<u>l</u>an comments</span> <pcAdd
      /></el-tab-pane>
      <el-tab-pane label="Service statements" name="service_statements" key="25">
        <span slot="label"><u>S</u>ervice statements</span>
        <ssAdd />
      </el-tab-pane>
      <el-tab-pane label="Misc Note" name="miscellaneous_notes" key="17">
        <span slot="label">Mis<u>c</u> note</span> <miscNote
      /></el-tab-pane>
      <el-tab-pane label="Process Note" name="process_notes" key="18">
        <span slot="label">Pr<u>o</u>cess note</span> <processNote
      /></el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import allClientTbls from '@/components/def-processors/all-client-tables.js'

import editChiefComplaint from '@/components/temporal/chief-complaint/change-layer/add-chief-complaint.vue'
import prosAdd from '@/components/temporal/psych-review-of-system/change-layer/add-ss.vue'
import pastPsychHistory from '@/components/temporal/past-psych-history/change-layer/past-psych-history-add.vue'
import familyHistory from '@/components/temporal/family-history/change-layer/family-history-add.vue'
import allergies from '@/components/temporal/allergies/change-layer/allergy-add.vue'
import miscNote from '@/components/temporal/miscellaneous-notes/change-layer/add-ct.vue'
import processNote from '@/components/temporal/process-notes/change-layer/add-ct.vue'
import examAdd from '@/components/temporal/examination/change-layer/add-examination.vue'

import weightAdd from '@/components/temporal/weight/change-layer/add-weight.vue'
import pulseAdd from '@/components/temporal/pulse/change-layer/add-pulse.vue'
import heightAdd from '@/components/temporal/height/change-layer/add-height.vue'
import temperatureAdd from '@/components/temporal/temperature/change-layer/add-temperature.vue'
import bloodPressureAdd from '@/components/temporal/blood-pressure/change-layer/add-blood-pressure.vue'
import bloodSugarAdd from '@/components/temporal/blood-sugar/change-layer/add-blood-sugar.vue'
import waistCircumferenceAdd from '@/components/temporal/waist-circumference/change-layer/add-waist-circumference.vue'
import bmiAdd from '@/components/temporal/bmi/change-layer/add-bmi.vue'
import oxygenSaturationAdd from '@/components/temporal/oxygen-saturation/change-layer/add-oxygen-saturation.vue'

import mrosAdd from '@/components/temporal/medical-review-of-system/change-layer/add-ss.vue'
import dxAdd from '@/components/temporal/diagnosis/change-layer/diagnosis-add.vue'
import screensAdd from '@/components/temporal/screens/change-layer/add-ct.vue'
import goalsAdd from '@/components/temporal/goals/change-layer/add-ct.vue'

import recAdd from '@/components/temporal/recommendations/change-layer/recommendation-add.vue'

import remAdd from '@/components/temporal/reminders/change-layer/add-ct.vue'
import remMHorizontalEdit from '@/components/temporal/reminders/change-layer/medit-horizontal.vue'

import pcAdd from '@/components/temporal/plan-comments/change-layer/add-ct.vue'
import ssAdd from '@/components/temporal/service-statements/change-layer/add-ss.vue'

export default {
  name: 'CLTabsInDialogManager',
  data() {
    return {
      activeTabName: 'psych_review_of_system',
      formDefId: '',
    }
  },
  components: {
    editChiefComplaint,
    prosAdd,
    pastPsychHistory,
    familyHistory,
    allergies,
    miscNote,
    processNote,
    dxAdd,
    screensAdd,
    examAdd,
    weightAdd,
    heightAdd,
    pulseAdd,
    temperatureAdd,
    bloodPressureAdd,
    bloodSugarAdd,
    bmiAdd,
    waistCircumferenceAdd,
    mrosAdd,
    goalsAdd,
    recAdd,
    remAdd,
    remMHorizontalEdit,
    pcAdd,
    ssAdd,
  },
  watch: {
    activeTabName: {
      immediate: true,
      handler(pNVal, pOVal) {
        console.log('setting tabIndex for', pNVal)
      },
    },
  },
  computed: {
    vblIsdialogHoldingTabsInEditLayerVisible: {
      get() {
        this.dIsSettingsDialogVisible = true
      },
      set(value) {
        this.$store.commit('mtfSetTabDialogVisibility', value)
      },
    },
    cfDrawerVisibility() {
      const drawerVisibility = allClientTbls.common_for_all_cts.find('form-def-id-for-change-in-vertical-tabs')

      if (drawerVisibility) {
        if (drawerVisibility['fieldValue'] !== 'false') {
          this.formDefId = drawerVisibility['fieldValue']
          this.activeTabName = this.formDefId
          return true
        }
      }

      return false
    },
  },
  mounted() {
    this.vblIsdialogHoldingTabsInEditLayerVisible = false
  },
  methods: {
    handleClickOnSettingsIcon() {
      this.dIsSettingsDialogVisible = true
    },
    handleChange(val) {},
    handleClose(done) {
      allClientTbls.common_for_all_cts.insertOrUpdate({
        data: [{ fieldName: 'form-def-id-for-change-in-vertical-tabs', fieldValue: 'false' }],
      })
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
</style>
