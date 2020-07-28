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
  <!--  Explanation of props sent to ct 

        Goal: make it easy to read view layer and also show change layer as a seperate layer
          custom-class="multi-tab-dialog"
          :modal=false creates issue to CL close functionality by 'Esc' button
          setting :modal=true  fixed the 'Esc' button issue but creates shadow in background
          which is fixed by css in line 285
          :modal="true"

        Goal: declutter the screen and at the same time give easy way to close the diaglog. Hence:
          :close-on-click-modal="true"
          :close-on-press-escape="true"
          :show-close="false"

        Goal: control dialog visibility based on user actions
          :visible.sync="vblIsdialogHoldingTabsInClVisible"      

        Earlier width="90%" but it has been removed why?
          Goal is to let user read as much of the view layer as possible when the user is in change layer
          By specifying a fixed width I take that control away from the user.

        Earlier top="5vh" but it has been removed why?
          Goal is to let user move as little mouse as possible. Keeping modal in center of page will make mouse movement least.
          By specifying top start at 5% of height  I make the user move the mouse more

        Goal: Dont scroll the parent when model is scrolled.
          :lock-scroll="true"

        Goal: CL needs to become smaller or bigger depending on the child ct
          :width="vsDialogWidth"
    -->
  <el-dialog
    custom-class="multi-tab-dialog"
    :modal="true"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    :show-close="false"
    :visible.sync="vblIsdialogHoldingTabsInClVisible"
    :lock-scroll="true"
    :width="vsDialogWidth"
  >
    <el-row type="flex">
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
                │  Call state mutation function   │                 vstOfTabsAndDialogInCl:36            
                └────────────────┬────────────────┘               
                                 │                                
┌────────────────────────────────▼───────────────────────────────┐
│Changes this.$store.state.vstObjTabsInCL.vsSelectedTabId        │  vstOfTabsAndDialogInCl:37 
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
      TODO: cfArTabs is better called cfArTabsInCl
      -->

      <el-col :span="24">
        <el-tabs v-model="cfVSSelectedTabId" type="card" @tab-remove="mfHandleTabRemove">
          <el-tab-pane
            v-for="(tab, loopCount) in cfArTabs"
            :key="tab.id"
            :label="tab.label + '(' + (loopCount + 1) + ')'"
            :name="tab.id"
            :closable="tab.closable"
          >
            <!-- Using https://vuejs.org/v2/guide/components.html#Dynamic-Components -->
            <component :is="tab.ctToShow" :first-param="tab.vstPropsToGiveToCt"></component>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col class="set-of-tabs">
        <ctSetOfTabs></ctSetOfTabs>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import ctSetOfTabs from './ct-set-of-tabs'

export default {
  name: 'CLTabsInDialogManager',
  components: {
    ctSetOfTabs,
  },
  data() {
    return {}
  },

  computed: {
    cfArTabs: {
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
    vblIsdialogHoldingTabsInClVisible: {
      get() {
        return this.$store.state.vstObjTabsInCL.vblIsdialogHoldingTabsInClVisible
      },
      set(value) {
        this.$store.commit('mtfSetTabDialogVisibility', value)
      },
    },
    vsDialogWidth: {
      get() {
        /*
        get the Cl dialog width based on tab width
        if tab width is 'large' then dialog width will be 80%
        for tab width is 'small' dialog width will be 50%
        */
        const cfDialogWidth = this.$store.state.vstObjTabsInCL.vsDialogWidth
        console.log('cfDialogWidth', cfDialogWidth)
        return cfDialogWidth === '' || cfDialogWidth === 'small' ? '50%' : '80%'
      },
      set(value) {
        this.$store.commit('mtfSetTabDialogWidth', value)
      },
    },
  },
  mounted() {
    this.vblIsdialogHoldingTabsInClVisible = false
    this.cfArTabs = [] // Template has a for loop running on this.
    this.cfVSSelectedTabId = ''
    /*
    const self = this // this is not available inside addEventListener since execution context changes. Hence assining this to self Ref: https://stackoverflow.com/a/50818181
      window.addEventListener(
      'keyup',
      function (e) {
        console.log('the keyboard key up detected')
        self.selectActiveTabFromKeyboard(e)
      }.bind()
    )
    */
  },
  methods: {
    // #region kbselect
    selectActiveTabFromKeyboard(pEvent) {
      if (this.vblIsdialogHoldingTabsInClVisible === false) {
        console.log('Rejection reason 1: 2nd layer not active')
        return
      }
      if (pEvent.srcElement.type === 'text') {
        console.log(
          'Rejection reason 2: inside text input hence meant as form entry hence dont activate tab'
        )
        return
      }
      if (pEvent.keyCode === 37) {
        console.log('left arrow pressed let us find the position of the tab')
        const currentTabIdx = this.cfArTabs.findIndex((tab) => tab.id === this.cfVSSelectedTabId)
        console.log('Current tab idx is: ', currentTabIdx)
        if (currentTabIdx === 0) {
          console.log('at first tab so ignore')
        } else {
          this.$store.commit('mtfSetvsSelectedTabId', this.cfArTabs[currentTabIdx - 1].id)
        }
        return
      }
      if (pEvent.keyCode === 39) {
        console.log('right arrow pressed let us find the position of the tab')
        const currentTabIdx = this.cfArTabs.findIndex((tab) => tab.id === this.cfVSSelectedTabId)
        if (currentTabIdx === this.cfArTabs.length - 1) {
          console.log('at last tab so ignore')
        } else {
          this.$store.commit('mtfSetvsSelectedTabId', this.cfArTabs[currentTabIdx + 1].id)
        }
        return
      }
      const maxValidKeyCodeEnteredByUser = 48 + this.cfArTabs.length
      console.log('max code:', maxValidKeyCodeEnteredByUser, 'pressed code is', pEvent.keyCode)
      if (pEvent.keyCode >= '49' && pEvent.keyCode <= maxValidKeyCodeEnteredByUser) {
        console.log('Activating tab at position' + pEvent.key)
        this.$store.commit('mtfSetvsSelectedTabId', this.cfArTabs[pEvent.key - 1].id)
      } else {
        console.log('Rejection reason 3: User entered # is higher then max tabs')
      }
    },
    // #endregion kbselect
    mfHandleTabRemove(pTabBeingRemovedID) {
      let tabToRemoveFoundAt = false // this is needed to find which tab to activate
      let loopCount = 0
      const arNewTabs = this.cfArTabs.filter((tab) => {
        if (tab.id !== pTabBeingRemovedID) {
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
        this.vblIsdialogHoldingTabsInClVisible = false
      } else {
        // Once a tab is removed an existing tab needs to be made active
        console.log(tabToRemoveFoundAt, arNewTabs)
        let idOfNewActiveTab = 0
        if (tabToRemoveFoundAt === 0) {
          idOfNewActiveTab = 0
        } else {
          idOfNewActiveTab = tabToRemoveFoundAt - 1
        }
        this.$store.commit('mtfSetvsSelectedTabId', arNewTabs[idOfNewActiveTab].id)
      }
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
