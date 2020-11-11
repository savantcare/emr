<template>
  <div id="container-for-1-data-row" :style="mfGetBorder()" @mouseover="mOver()" @mouseleave="mLeave()">
    <div :style="mfGetCssClassNameForEachDataRow(propEntityRow)">
      <span v-for="(propFieldDef, id) in propFormDef.fieldsDef" :key="id">
        <div :id="id" v-if="propFieldDef.fieldType === 'heading' && propFieldDef.showFieldLabel">
          <!-- Each field type gets to control how it prints the field name -->
          <h3>{{ propFieldDef.fieldNameInUi }}</h3>
        </div>

        <div :id="id" v-else-if="propFieldDef.fieldType === 'button' && propFieldDef.showFieldLabel">
          <!-- Each field type gets to control how it prints the field name -->
          <el-button size="mini" type="primary" round>{{ propFieldDef.fieldNameInUi }}</el-button>
        </div>

        <!-- There may be many different types of fields. Here dealing with select type field -->
        <div v-else-if="propFieldDef.fieldNameInDb.includes('select')">
          <!-- Each field type gets to control how it prints the field name -->
          <div v-if="propFieldDef.showFieldLabel">
            <h3>{{ propFieldDef.fieldNameInUi }}</h3>
          </div>
          <!-- Since it is select there will be many options hence need to do a for loop on options -->
          <!-- Since it is View layer I should only show the selected options and not all the options -->
          <div
            v-for="item in propFormDef.fnGetAllSelectOptionsAndSelectedForAField(
              propFieldDef.fieldNameInDb,
              propEntityRow.clientSideUniqRowId
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
          <div v-if="propEntityRow[propFieldDef.fieldNameInDb] > 0">
            <div v-if="propFieldDef.showFieldLabel" id="field-name-in-ui">
              <h4>{{ propFieldDef.fieldNameInUi }}</h4>
            </div>
            <div id="field-value-in-db">
              <div v-if="propEntityRow[propFieldDef.fieldNameInDb] == 1">Not present</div>
              <div v-else-if="propEntityRow[propFieldDef.fieldNameInDb] == 2">Sub-Syndromal</div>
              <div v-else-if="propEntityRow[propFieldDef.fieldNameInDb] == 3">Syndromal</div>
              <div v-else>
                {{ propEntityRow[propFieldDef.fieldNameInDb] }}
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="propFieldDef.fieldType.includes('number')" id="field-type-number">
          <div v-if="propFieldDef.showFieldLabel" id="field-name-in-ui">{{ propFieldDef.fieldNameInUi }}</div>
          <div id="field-value-in-db">
            {{ propEntityRow[propFieldDef.fieldNameInDb] }} {{ propFieldDef.unitOfMeasurement }}
          </div>
        </div>

        <div v-else-if="propFieldDef.fieldType.includes('date')" id="field-type-date">
          <div v-if="propFieldDef.showFieldLabel" id="field-name-in-ui">{{ propFieldDef.fieldNameInUi }}</div>
          <div id="field-value-in-db">{{ propEntityRow[propFieldDef.fieldNameInDb] | moment }}</div>
        </div>

        <!-- Not specified field type -->
        <span v-else id="not-matched-field-type">
          <span v-if="propFieldDef.showFieldLabel" id="field-name-in-ui">{{ propFieldDef.fieldNameInUi }}</span>
          <!-- Goal: skip fields that are null or empty -->
          <span v-if="propEntityRow[propFieldDef.fieldNameInDb]" id="field-value-in-db">
            {{ propEntityRow[propFieldDef.fieldNameInDb] }}
          </span>
        </span>
      </span>
    </div>
    <div v-show="mouseOnThisRow" id="row-actions-when-appt-is-unlocked" v-if="_ApptStatus === 'unlocked'">
      <!-- Case 2/2: When this appt is un-locked what row actions to show-->

      <!-- Additional row actions example -> Take screen. The additional rows actions are defined in the formDef -->
      <span v-for="(additionalRowAction, id) in propFormDef.additionalRowActions" :key="id">
        <el-button @click="additionalRowAction.executeThisFn(propEntityRow)">{{
          additionalRowAction.textInUi
        }}</el-button>
      </span>

      <el-tooltip class="item" effect="light" content="Click to edit" placement="top-start" :open-delay="500">
        <!--
                    Why @click has a condition
                    Goal: If this row is not coming from DB but it was added on the client then:
                  1. For edit I do not want to create a copy. I want to edit the row that has been added.
                  Why?
                  A copied row when undone expect to be left with orginal
                  But a new row when undone does not expect to be left with original.

                  In case of new row created on client during edit do not create a copy.
                  -->
        <el-button
          style="padding: 3px; color: #c0c4cc; border: none; position: absolute"
          plain
          @click="
            String(propEntityRow.vnRowStateInSession).startsWith(2) && propEntityRow.vnRowStateInSession !== 24751
              ? mfOpenAddInEditLayer()
              : mxOpenEditCtInEditLayer(propEntityRow.clientSideUniqRowId)
          "
          class="el-icon-edit"
        >
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="info" placement="top-end" :open-delay="500">
        <el-button
          style="padding: 3px; color: #c0c4cc; border: none; position: absolute"
          plain
          class="el-icon-discover"
        >
        </el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="light" content="Click to delete" placement="top-end" :open-delay="500">
        <el-button
          style="padding: 3px; color: #c0c4cc; border: none; position: absolute"
          plain
          @click="mfIconDeleteClickedOnChildCard(propEntityRow.clientSideUniqRowId)"
          class="el-icon-circle-close"
        >
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { rowState } from '@/components/def-processors/crud/manage-rows-of-table-in-client-side-orm.js'

export default {
  data() {
    return {
      mouseOnThisRow: false,
    }
  },
  props: {
    propFormDef: {
      type: Object,
      required: true,
    },
    propEntityRow: {
      type: Object,
      required: true,
    },
    _ApptStatus: {
      required: true,
    },
  },
  methods: {
    mOver(pRowId) {
      console.log(this._ApptStatus)
      setTimeout(() => {
        this.mouseOnThisRow = true
      }, 200)
    },
    mLeave(pRowId) {
      setTimeout(() => {
        this.mouseOnThisRow = false
      }, 200)
    },
    mfOpenAddInEditLayer() {
      const term = 'add ' + this.propFormDef.id
      console.log(term)
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: term,
      })
    },
    mxOpenEditCtInEditLayer(pClientDataRowId) {
      /*
       We need rowID of vuexORM inside the change ct. Since change ct needs the exiting Desc of the reminber to change
       Option 1: Send the whole data row
       Option 2: Send just the ID in a prop.
        +ves:
          1. At some places I may need to call change where I have the reminder ID but
          i do not have the remainder of the data row. Hence this makes the Change Ct possible
          to use at other places
          2. When I send a paramter it is like calling a function. Sending the whole data row
          is like working on a gloal variable. So other Cts can also modify this global variable.
      */
      const payload = { searchTerm: 'edit ' + this.propFormDef.id, pPropsToGiveToCt: pClientDataRowId }
      console.log(payload)
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', payload)
    },
    mfGetCssClassNameForEachDataRow(pRow) {
      /* The color conventions are:
      Case 1: black: same as DB or it is a copy but no change has been done
      Case 2: orange: form validatoion has failed
      Case 3: green: some edits have been made and it pases form validation */

      let string = ''

      if (
        pRow.vnRowStateInSession.toString().endsWith(rowState.SameAsDB) ||
        pRow.vnRowStateInSession.toString().endsWith(rowState.Copy)
      ) {
        string = '' // this will take default color of parent element
      } else if (pRow.vnRowStateInSession.toString().endsWith(rowState.FormValidationFail)) {
        string = 'color: #E6A23C;' // this is hex code for orange
      } else if (pRow.vnRowStateInSession.toString().endsWith(rowState.FormValidationPass)) {
        string = 'color: #67c23a;' // this is hex code for green
      }
      return string
    },
    mfGetBorder() {
      let string = 'display: grid; grid-template-columns: 2fr 1fr;'
      if (this.mouseOnThisRow === true) {
        string = string + 'box-shadow: inset 0 -1px  rgba(144, 147, 153, 0.1);' /* It is inset to prevent jumping */
      }
      return string
    },
  },
}
</script>
<style scoped>
#field-value-in-db {
  margin-left: 3%; /* Without this the begining of the text was getting cut off inside the Horizontal slides scroll */
}
</style>
