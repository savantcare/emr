<template>
  <div>
    <!-- Section 1/2: This is a single row with 2 columns. The 1st col is the Heading and 2nd col are the buttons -->
    <el-row type="flex" justify="left" class="header3 sectionHeader" style="padding: 0rem; margin: 0rem">
      <!-- First col of the header. This has the Section name -->
      <el-col :span="9" class="sectionHeading">{{
        propFormDef.plural.charAt(0).toUpperCase() + propFormDef.plural.slice(1)
      }}</el-col>
      <!-- 2nd col of the header. This has the header action buttons -->
      <el-col :span="12"
        ><div class="grid-content">
          <!-- Case 1/2: When this appt is locked. This decides what header action buttons to show when the appt is locked -->
          <el-button-group style="float: left; display: none">
            <span v-if="currentApptObj['apptStatus'] === 'locked'">
              <el-popover placement="right" width="400" v-model="isAddendumPopoverVisible">
                <div style="text-align: right; margin: 0">
                  <el-input type="textarea" :rows="4" v-model="amendmentData"></el-input>
                  <!-- Amendment icon -->
                  <el-button
                    v-if="amendmentData.length > 0"
                    type="success"
                    icon="el-icon-check"
                    style="position: absolute; bottom: 15px; right: 15px"
                    size="mini"
                    @click="mfSaveAddendum(amendmentData, propFormDef.id)"
                    circle
                  ></el-button>
                </div>
                <el-button
                  slot="reference"
                  class="el-icon-edit-outline"
                  size="mini"
                  style="padding: 3px; color: #c0c4cc; border: none"
                />
              </el-popover>
            </span>
            <!-- Case 2/2: When this appt is un-locked. This decides what header action buttons to show when the appt is not locked -->
            <span v-else>
              <!-- Add. v-if makes sure that for Ct like chief complaint it will not display add if greater then 0 rows. !propFormDef.maxNumberOfRows makes sure that is a ct has not defined max Rows then the add button comes. -->
              <el-button
                v-if="
                  mfGetArOfDataRows(this.currentApptObj).length < propFormDef.maxNumberOfRows ||
                  !propFormDef.maxNumberOfRows
                "
                class="el-icon-circle-plus-outline"
                size="mini"
                @click="mfOpenAddInEditLayer"
                style="padding: 3px; color: #c0c4cc; border: none"
              ></el-button>
              <!-- Multi edit. v-if stops giving multiedit when there is only a single row. There has to be more then 1 row for multi edit to make sense -->
              <el-button
                v-if="mfGetArOfDataRows(this.currentApptObj).length > 1"
                class="el-icon-money"
                size="mini"
                @click="mfOpenMultiEditCtInEditLayer"
                style="padding: 3px; color: #c0c4cc; border: none"
              ></el-button>
            </span>
            <!-- Minimize or maximize. This appears if appt is locked or unlocked -->
            <el-button
              v-if="mfGetArOfDataRows(this.currentApptObj).length > 0"
              :class="OnAndOffSwitchToShowContent ? 'el-icon-remove-outline' : 'el-icon-full-screen'"
              size="mini"
              @click="OnAndOffSwitchToShowContent = !OnAndOffSwitchToShowContent"
              style="padding: 3px; color: #c0c4cc; border: none"
            ></el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>
    <!-- Section 2/2: This starts after the header ends -->
    <div :style="cfGetDataRowStyle">
      <!-- Goal: Only do this if this section has not been minimized -->
      <div v-if="OnAndOffSwitchToShowContent">
        <!-- This is for each data row -->
        <!-- Design: 

        Goal 1: Each data row is made into a grid with 3 columns
          How? display: grid; grid-template-columns: 1fr 1fr 1fr
        
        Goal 2: Between columns there is some space
          How? style="grid-column-gap: 1rem
        
        Goal 3: If 1st and 2nd field has no value then 3rd field should be in 1st col and not in 3rd col
          Solution 1:
          How? grid-template-columns: min-content 1fr;
          With 1fr you're telling the second col to consume any and all free space available in the row. Hence, when there is no content in the .first element, the .second element takes the space.
          Ref: https://stackoverflow.com/a/50709699

          Solution 2:
          div for id="each-field-of-data-row" has a if statement. So this div does not get generated if this field does not have content.
          v-if="row[propFieldDef.fieldNameInDb].toString().length > 0"


        Goal 4: Each time a heading type field comes go to the next row   
          Ref: https://stackoverflow.com/a/47077596
        -->

        <div style="padding: 0px; margin: 0px">
          <div
            id="each-data-row"
            v-for="row in mfGetArOfDataRows(this.currentApptObj)"
            :key="row.clientSideUniqRowId"
            style="padding: 0px; margin: 0px; display: grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 1rem"
          >
            <!-- This is to loop on fields. Since some rows may have 1 and other rows may have 4 fields -->

            <div
              id="each-field-of-data-row"
              :class="'field-type-' + propFieldDef.fieldType"
              v-for="(propFieldDef, id) in propFormDef.fieldsDef"
              :key="id"
              :style="mfGetCssClassNameForEachDataRow(row)"
              v-if="row[propFieldDef.fieldNameInDb].toString().length > 0"
            >
              <div :id="id" v-if="propFieldDef.fieldType === 'heading' && propFieldDef.showFieldLabel">
                <!-- the field printing is not common for all field types so that heading can be applied -->
                <h3>{{ propFieldDef.fieldNameInUi }}</h3>
              </div>
              <!-- Goal: Skip any empty fields in the row 
              row[propFieldDef.fieldNameInDb] can either be integer or string
              For e.g. for recs it is string and for psych review of systems it is number
              -->

              <!-- There may be many different types of fields. Here dealing with select type field -->
              <div v-else-if="propFieldDef.fieldNameInDb.includes('select')">
                <!-- Each fieldtype gets to control its own way of showing the field label -->
                <div v-if="propFieldDef.showFieldLabel">
                  <h3>{{ propFieldDef.fieldNameInUi }}</h3>
                </div>
                <!-- Since it is select there will be many options hence need to do a for loop on options -->
                <!-- Since it is View layer I should only show the selected options and not all the options -->
                <div
                  v-for="item in propFormDef.fnGetAllSelectOptionsAndSelectedForAField(
                    propFieldDef.fieldNameInDb,
                    row.clientSideUniqRowId
                  )"
                  :key="item.id"
                  v-if="item.selected"
                >
                  <!-- this v-if is part of this div and not <div id="selected-option"> 
                  reason: So that empty divs are not generated.
                  If <div id="selected-option" v-if="item.selected">
                    then a empty divs for each of the select options will get generated.
                  -->

                  <!-- Goal: Only show the selected option -->
                  <div id="selected-option">
                    {{ item.value }}
                  </div>
                </div>
              </div>
              <!-- Slider field type -->
              <div v-else-if="propFieldDef.fieldType.includes('slider')" id="field-type-slider">
                <div v-if="row[propFieldDef.fieldNameInDb] > 0">
                  <div v-if="propFieldDef.showFieldLabel" id="field-name-in-ui">
                    <h4>{{ propFieldDef.fieldNameInUi }}</h4>
                  </div>
                  <div id="field-value-in-db">
                    <div v-if="row[propFieldDef.fieldNameInDb] == 1">Not present</div>
                    <div v-else-if="row[propFieldDef.fieldNameInDb] == 2">Sub-Syndromal</div>
                    <div v-else-if="row[propFieldDef.fieldNameInDb] == 3">Syndromal</div>
                    <div v-else>
                      {{ row[propFieldDef.fieldNameInDb] }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- Next field type -->
              <div v-else id="not-matched-field-type">
                <div id="field-name-in-ui">{{ propFieldDef.fieldNameInUi }}</div>

                <div id="field-value-in-db">{{ row[propFieldDef.fieldNameInDb] }}</div>
              </div>
            </div>
            <!-- This is for action associated with each row -->
            <div v-if="currentApptObj['apptStatus'] === 'locked'" id="row-actions-when-app-is-locked"></div>
            <!-- Case 1/2: When this appt is locked what row actions to show-->
            <div v-else id="row-actions-when-app-is-unlocked">
              <!-- Case 2/2: When this appt is un-locked what row actions to show-->
              <div>
                <el-button-group style="float: right">
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="Click to edit"
                    placement="top-start"
                    :open-delay="500"
                  >
                    <!-- Goal: If this row is not coming from DB but it was added on the client then:
                  1. For edit I do not want to create a copy. I want to edit the row that has been added.
                  Why?
                  A copied row when undone expect to be left with orginal
                  But a new row when undone does not expect to be left with original.

                  In case of new row created on client during edit do not create a copy.
                  -->
                    <el-button
                      style="padding: 3px; color: #c0c4cc; border: none"
                      plain
                      @click="
                        String(row.vnRowStateInSession).startsWith(2)
                          ? mfOpenAddInEditLayer()
                          : mxOpenEditCtInEditLayer(row.clientSideUniqRowId)
                      "
                      class="el-icon-edit"
                    >
                    </el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="light" content="info" placement="top-end" :open-delay="500">
                    <el-button style="padding: 3px; color: #c0c4cc; border: none" plain class="el-icon-discover">
                    </el-button>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="light"
                    content="Click to delete"
                    placement="top-end"
                    :open-delay="500"
                  >
                    <el-button
                      style="padding: 3px; color: #c0c4cc; border: none"
                      plain
                      @click="mfIconDeleteClickedOnChildCard(row.clientSideUniqRowId)"
                      class="el-icon-circle-close"
                    >
                    </el-button>
                  </el-tooltip>
                </el-button-group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="cfArOfAddendumForDisplay && cfArOfAddendumForDisplay.length > 0">
        <h4>Addendum:</h4>
        <div v-for="row in cfArOfAddendumForDisplay" :key="row.clientSideUniqRowId">
          <div style="margin: 5px 0">
            {{ row.description }}
            <br />
            <span style="font-size: 10px">Added by {{ row.addedBy }} at {{ row.ROW_START | moment }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clientTblOfAddendums from '~/components/temporal/amendment/db/client-side/structure/amendment-client-side-table.js'
import clientTblOfAppointments from '@/components/temporal/appointments/db/client-side/structure/appointment-client-side-table.js'
import clientTblOfLeftSideViewCards from '@/components/non-temporal/components-container-in-lhs-of-layer1/db/client-side/structure/left-hand-side-table-of-cards.js'

import clInvokeMixin from '@/components//framework/view/cl-invoke-mixin.js'

import moment from 'moment'

import allClientTbls from '@/components/framework/all-client-tables.js'

export default {
  data() {
    return {
      currentApptObj: {},
      amendmentData: '',
      isAddendumPopoverVisible: false,
      OnAndOffSwitchToShowContent: true,
    }
  },
  mixins: [clInvokeMixin],

  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm a')
    },
  },
  props: {
    propApptId: {
      type: Number,
      required: true,
    },
    propFormDef: {
      type: Object,
      required: true,
    },
  },
  async mounted() {
    if (!this.propApptId === 0) {
      return
    }
    this.currentApptObj = await clientTblOfAppointments.find(this.propApptId)
  },
  computed: {
    cfGetDataRowStyle() {
      let secondaryDuringComparisonApptObj = {}
      let secondaryDuringComparisonDataRows = {}

      const printableApptNoteComponentCardObj = clientTblOfLeftSideViewCards.find(2)

      // Goal: Find if current ID matches with firstParam or secondParam. It has to match with one of those 2
      if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting'] === this.propApptId) {
        // Handle the case when the current ID matches with the second param Need to compare with first
        secondaryDuringComparisonApptObj = clientTblOfAppointments.find(
          printableApptNoteComponentCardObj['firstParameterGivenToComponentBeforeMounting']
        )
        secondaryDuringComparisonDataRows = this.mfGetArOfDataRows(secondaryDuringComparisonApptObj)
        if (secondaryDuringComparisonDataRows.length > this.mfGetArOfDataRows(this.currentApptObj).length) {
          return 'border:1px solid #E6A23C'
        } else if (secondaryDuringComparisonDataRows.length < this.mfGetArOfDataRows(this.currentApptObj).length) {
          return 'border:1px solid #67C23A'
        } else {
          return ''
        }
      } else {
        //
        // Case when this appt is not the 2nd param so it is the first param
        //

        // there may or may not be a second paramters. If no second parameter then there is no comparison to be made
        if (printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting']) {
          // Need to compare with second
          secondaryDuringComparisonApptObj = clientTblOfAppointments.find(
            printableApptNoteComponentCardObj['secondParameterGivenToComponentBeforeMounting']
          )

          secondaryDuringComparisonDataRows = this.mfGetArOfDataRows(secondaryDuringComparisonApptObj)
          if (secondaryDuringComparisonDataRows.length > this.mfGetArOfDataRows(this.currentApptObj).length) {
            return 'border:1px solid #E6A23C'
          } else if (secondaryDuringComparisonDataRows.length < this.mfGetArOfDataRows(this.currentApptObj).length) {
            return 'border:1px solid #67C23A'
          } else {
            return
          }
        }
      }
      // Nothing to compare with
    },
    cfArOfAddendumForDisplay() {
      const arFromClientTblOfAddendums = clientTblOfAddendums
        .query()
        .where('appointmentId', this.propApptId)
        .where('component', 'reminders')
        .orderBy('ROW_START', 'asc')
        .get()

      return arFromClientTblOfAddendums
    },
  },
  methods: {
    log(item) {
      console.log(item)
    },
    mfOpenMultiEditCtInEditLayer() {
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: 'multi edit reminders',
      })
    },
    mfOpenAddInEditLayer() {
      const term = 'add ' + this.propFormDef.id
      console.log(term)
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: term,
      })
    },
    mfSaveAddendum(pAddendumData, component) {
      clientTblOfAddendums.insert({
        data: {
          appointmentId: this.currentApptObj.clientSideUniqRowId,
          component: component,
          description: pAddendumData,
          ROW_START: Math.floor(Date.now()),
        },
      })

      // remove modal value after save
      this.amendmentData = ''
    },
    mfGetArOfDataRows(pApptObj) {
      const emptyArray = []

      if (!pApptObj) {
        // returning empty array and not null. Since others deprend on the length of the array. If I return null there will be errors when length of that is calculated.
        return emptyArray
      }
      if (!pApptObj['apptStatus']) {
        return emptyArray
      }

      let arOfObjectsFromClientDB = []

      if (pApptObj['apptStatus'] === 'unlocked') {
        arOfObjectsFromClientDB = allClientTbls[this.propFormDef.id].fnGetPresentUniqueUuidNotEmptyRows(
          this.propFormDef.atLeastOneOfFieldsForCheckingIfRowIsEmpty
        )
        console.log(arOfObjectsFromClientDB)
      } else {
        arOfObjectsFromClientDB = allClientTbls[this.propFormDef.id]
          .query()
          .where('ROW_END', (value) => value > pApptObj['ROW_END'])
          .where('ROW_START', (value) => value < pApptObj['ROW_END'])
          .get()
      }
      return arOfObjectsFromClientDB
    },
    mfGetCssClassNameForEachDataRow(pRow) {
      const strOfNumber = pRow.vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        return 'color: #E6A23C;'
      } else {
        return 'color: #202020;'
      }
    },
    cfApptLockDateInHumanReadableFormat() {
      return moment(this.patientCurrentApptObj['ROW_END']).format('MMM DD YYYY HH:mm') // parse integer
    },
  },
}
</script>

<style scoped>
.header3:hover .el-button-group {
  display: inline-block !important;
  position: absolute; /* This makes sure there is no jumping when mouse is taken over the icon */
}

h3 {
  border-bottom: 1px solid #dcdfe6;
  margin-top: 1rem;
  width: 100%;
  float: none;
  display: flex;
}
.sectionHeader {
  margin-top: 1rem !important;
  padding-bottom: 0.1rem !important;
  border-bottom: 1px solid #dcdfe6;
}
.sectionHeading {
  font-size: 1rem;
  color: #606266;
}
.subSectionHeader {
  margin-top: 1rem !important;
  padding-bottom: 0.1rem !important;
  border-bottom: 1px solid #dcdfe6;
}

.field-type-heading {
  grid-column-start: 1;
}
</style>
