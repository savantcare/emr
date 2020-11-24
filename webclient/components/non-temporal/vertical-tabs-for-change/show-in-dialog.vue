<!-- Is ctShowAddAndRemoveTabsInDialog a component or a view? View is actually intended to be
accessed by navigation url Ref:
https://stackoverflow.com/questions/50865828/what-is-the-difference-between-the-views-and-components-folders-in-a-vue-project
ctShowAddAndRemoveTabsInDialog is not expected to be accessed by a URL. */

Create a tree strucrure that looks like:

dialog
 -- tabs
   --- tabpane
      ---- Component

-->
<template>
  <div>
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
    <el-button plain round size="mini" @click="handleClickOnSettingsIcon">
      {{ _entity.charAt(0).toUpperCase() + _entity.slice(1) }}
    </el-button>

    <el-dialog
      custom-class="multi-tab-dialog"
      :modal="true"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="false"
      :visible.sync="dIsSettingsDialogVisible"
      :lock-scroll="true"
      top="1vh"
      width="80%"
    >
      <div style="display: grid; grid-template-columns: 1fr">
        <!-- By passing editable we tell element.io to give add and close option Red: https://element.eleme.io/#/en-US/component/tabs#tabs-attributes -->
        <!-- 
        Active Tab is changed in following 3 cases:
          1. If a tab is removed, an adjacent tab is made active
          2. When left and right arrow are pressed the active tab changes.
          3. When a number on KB is pressed the active tab changes.

        How is active tab changed?
          The active tab depends on ct -> el-tabs -> v-model = cfVSSelectedTabId (line 72 of this file)
          When cfVSSelectedTabId (Line 117 of this file) changes the active tab will change. 
          Since cfVSSelectedTabId is a computed function it will change when anything it depends on changes
          cfVSSelectedTabId depends on this.$store.state.vstObjTabsInCL.vsSelectedTabId (Line 119 of this file)
          So any Ct can change this.$store.state.vstObjTabsInCL.vsSelectedTabId and that will change the active Tab
          The flowchart of changes is:       
          
                           ┌──────────┐                           
                           │  Any ct  │                           ctShowAddAndRemoveTabsInDialog:171
                           └────┬─────┘                           
                                │                                 
                ┌───────────────▼─────────────────┐               
                │  Call state mutation function   │                 vstOfTabsAndDialogInEditLayer:36            
                └────────────────┬────────────────┘               
                                 │                                
┌────────────────────────────────▼───────────────────────────────┐
│Changes this.$store.state.vstObjTabsInCL.vsSelectedTabId        │  vstOfTabsAndDialogInEditLayer:37 
└────────────────────────────────┬───────────────────────────────┘
                                 │                                
                 ┌───────────────▼────────────────────────────┐               
                 │Changes computed function cfVSSelectedTabId │     ctShowAddAndRemoveTabsInDialog:117         
                 └────────────────┬───────────────────────────┘               
                                  │                               
                       ┌──────────▼─────────────┐                 
                       │changes el-tabs v-model │                   ctShowAddAndRemoveTabsInDialog:72
                       └──────────┬─────────────┘                 
                                  │                               
                       ┌──────────▼─────────────┐                 
                       │Active tab changed in UI│                 
                       └────────────────────────┘                          
      -->
        <el-tabs tab-position="left" style="height: 900px">
          <el-tab-pane label="Chief complaint"><editChiefComplaint /></el-tab-pane>
          <el-tab-pane label="P review of systems"><prosAdd /></el-tab-pane>
          <el-tab-pane label="Past psych history"><pastPsychHistory /></el-tab-pane>
          <el-tab-pane label="Family history"><familyHistory /></el-tab-pane>
          <el-tab-pane label="M review of systems"><mrosAdd /></el-tab-pane>
          <el-tab-pane label="Allergies"><allergies /></el-tab-pane>
          <el-tab-pane label="Examination"><examAdd /></el-tab-pane>
          <el-tab-pane label="Vitals"
            ><weightAdd />
            <heightAdd />
            <pulseAdd />
            <temperatureAdd />
            <bloodPressureAdd />
            <bloodSugarAdd />
            <bmiAdd />
            <waistCircumferenceAdd
          /></el-tab-pane>
          <el-tab-pane label="Misc Note"> <miscNote /></el-tab-pane>
          <el-tab-pane label="Process Note"> <processNote /></el-tab-pane>
          <el-tab-pane label="Diagnosis"><dxAdd /></el-tab-pane>
          <el-tab-pane label="Screens"><screensAdd /></el-tab-pane>
          <el-tab-pane label="Goals"><goalsAdd /></el-tab-pane>
          <el-tab-pane label="Recommendations"><recAdd /></el-tab-pane>
          <el-tab-pane label="Reminders"><remAdd /></el-tab-pane>
          <el-tab-pane label="Plan comments"><pcAdd /></el-tab-pane>
          <el-tab-pane label="Service statements"><ssAdd /></el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
import pcAdd from '@/components/temporal/plan-comments/change-layer/add-ct.vue'
import ssAdd from '@/components/temporal/service-statements/change-layer/add-ss.vue'

export default {
  name: 'CLTabsInDialogManager',
  data() {
    return {
      dIsSettingsDialogVisible: false,
    }
  },
  props: {
    _entity: {
      type: String,
    },
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
    pcAdd,
    ssAdd,
  },
  computed: {
    cfArTabsInEditLayer: {
      get() {
        return this.$store.state.vstObjTabsInCL.arTabs
      },
      set(value) {
        this.$store.commit('mtfSetArTabs', value)
      },
    },
    cfVSSelectedTabId: {
      get() {
        return this.$store.state.vstObjTabsInCL.vsSelectedTabId
      },
      set(value) {
        this.$store.commit('mtfSetvsSelectedTabId', value)
      },
    },
    vblIsdialogHoldingTabsInEditLayerVisible: {
      get() {
        this.dIsSettingsDialogVisible = true
      },
      set(value) {
        this.$store.commit('mtfSetTabDialogVisibility', value)
      },
    },
    vsDialogWidth: {
      get() {
        /*
        get the edit layer dialog width based on tab width
        if tab width is 'large' then dialog width will be 80%
        for tab width is 'small' dialog width will be 50%
        */
        const cfDialogWidth = this.$store.state.vstObjTabsInCL.vsDialogWidth
        return cfDialogWidth === '' || cfDialogWidth === 'small' ? '50%' : '95%'
      },
      set(value) {
        this.$store.commit('mtfSetTabDialogWidth', value)
      },
    },
  },
  mounted() {
    this.vblIsdialogHoldingTabsInEditLayerVisible = false
    this.cfArTabsInEditLayer = [] // Template has a for loop running on this.
    this.cfVSSelectedTabId = ''
  },
  methods: {
    // #region kbselect
    selectActiveTabFromKeyboard(pEvent) {
      /*
      Try to get this working with vue-shortkey. Note added by VK oct 5th 2020
      if (this.vblIsdialogHoldingTabsInEditLayerVisible === false) {
        // Rejection reason 1: 2nd layer not active
        return
      }
      if (pEvent.srcElement.type === 'text') {
        // Rejection reason 2: inside text input hence meant as form entry hence dont activate tab
        return
      }
      if (pEvent.keyCode === 37) {
        // left arrow pressed let us find the position of the tab
        const currentTabIdx = this.cfArTabsInEditLayer.findIndex(
          (tab) => tab.id === this.cfVSSelectedTabId
        )
        // Current tab idx is: ', currentTabIdx
        if (currentTabIdx === 0) {
          // at first tab so ignore
        } else {
          this.$store.commit(
            'mtfSetvsSelectedTabId',
            this.cfArTabsInEditLayer[currentTabIdx - 1].id
          )
        }
        return
      }
      if (pEvent.keyCode === 39) {
        // right arrow pressed let us find the position of the tab
        const currentTabIdx = this.cfArTabsInEditLayer.findIndex(
          (tab) => tab.id === this.cfVSSelectedTabId
        )
        if (currentTabIdx === this.cfArTabsInEditLayer.length - 1) {
          // at last tab so ignore
        } else {
          this.$store.commit(
            'mtfSetvsSelectedTabId',
            this.cfArTabsInEditLayer[currentTabIdx + 1].id
          )
        }
        return
      }
      const maxValidKeyCodeEnteredByUser = 48 + this.cfArTabsInEditLayer.length
      // max code:', maxValidKeyCodeEnteredByUser, 'pressed code is', pEvent.keyCode
      if (pEvent.keyCode >= '49' && pEvent.keyCode <= maxValidKeyCodeEnteredByUser) {
        // Activating tab at position' + pEvent.key
        this.$store.commit('mtfSetvsSelectedTabId', this.cfArTabsInEditLayer[pEvent.key - 1].id)
      } else {
        // Rejection reason 3: User entered # is higher then max tabs
      }
      */
    },
    // #endregion kbselect
    mfHandleTabRemove(pTabBeingRemovedId) {
      let tabToRemoveFoundAt = false // this is needed to find which tab to activate
      let loopCount = 0
      const arNewTabs = this.cfArTabsInEditLayer.filter((tab) => {
        if (tab.id !== pTabBeingRemovedId) {
          loopCount++
          return true
        } else {
          // this is the tab that is being removed
          tabToRemoveFoundAt = loopCount
          return false
        }
      })

      this.$store.commit('mtfSetArTabs', arNewTabs)

      // If there are no more tabs in the diaglog then hide the dialog
      if (arNewTabs.length === 0) {
        this.vblIsdialogHoldingTabsInEditLayerVisible = false
      } else {
        // Once a tab is removed an existing tab needs to be made active

        let idOfNewActiveTab = 0
        if (tabToRemoveFoundAt === 0) {
          idOfNewActiveTab = 0
        } else {
          idOfNewActiveTab = tabToRemoveFoundAt - 1
        }
        this.$store.commit('mtfSetvsSelectedTabId', arNewTabs[idOfNewActiveTab].id)
      }
    },
    handleClickOnSettingsIcon() {
      this.dIsSettingsDialogVisible = true
    },
    handleChange(val) {},
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
