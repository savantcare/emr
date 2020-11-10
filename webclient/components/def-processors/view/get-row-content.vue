<template>
  <div>
    <span v-for="field in propFormDef.fieldsDef">
      {{ propEntityRow[field['fieldNameInDb']] }}
    </span>
    <span id="row-actions-when-app-is-unlocked">
      <!-- Case 2/2: When this appt is un-locked what row actions to show-->

      <!-- Additional row actions example -> Take screen. The additional rows actions are defined in the formDef -->
      <el-button-group style="float: right">
        <div v-for="(additionalRowAction, id) in propFormDef.additionalRowActions" :key="id">
          <el-button @click="additionalRowAction.executeThisFn(propEntityRow)">{{
            additionalRowAction.textInUi
          }}</el-button>
        </div>

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
            style="padding: 3px; color: #c0c4cc; border: none"
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
          <el-button style="padding: 3px; color: #c0c4cc; border: none" plain class="el-icon-discover"> </el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="Click to delete" placement="top-end" :open-delay="500">
          <el-button
            style="padding: 3px; color: #c0c4cc; border: none"
            plain
            @click="mfIconDeleteClickedOnChildCard(propEntityRow.clientSideUniqRowId)"
            class="el-icon-circle-close"
          >
          </el-button>
        </el-tooltip>
      </el-button-group>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    propFormDef: {
      type: Object,
      required: true,
    },
    propEntityRow: {
      type: Object,
      required: true,
    },
  },
  methods: {
    mfOpenAddInEditLayer() {
      const term = 'add ' + this.propFormDef.id
      console.log(term)
      this.$store.commit('mtfShowNewFirstTabInEditLayerFromSearchPhrase', {
        searchTerm: term,
      })
    },
  },
}
</script>
<style></style>
