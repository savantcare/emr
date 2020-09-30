<template>
  <!-- Why not use element.io inbuilt switch
        In element.io switch the label cannot be shown on top of the switch in June 20. 
        If a way is found to show H or O on top of the switch then this library should be removed and elemenet.io built in switch component should be used
      -->
  <toggle-button
    v-model="componentType"
    style="float: right"
    :labels="{ checked: 'H', unchecked: 'O' }"
    @change="handleChangeToggleButtonEvent"
  />
</template>

<script>
import clientSideTblOfLeftSideCards from '@/components/core/manage-mts-view-layer-cards/db/client-side/structure/table.js'
import clientSideTableOfCommonForAllComponents from '@/components/pt-info/single/1time-1row-mField/common-for-all-components/db/client-side/structure/table.js'

export default {
  data() {
    // KT: Why is this a function and not a object? Ref: https://vuejs.org/v2/style-guide/#Component-data-essential
    return {
      componentType: true,
    }
  },
  methods: {
    handleChangeToggleButtonEvent() {
      const type = this.componentType === true ? 'health' : 'other'

      // Goal: Decide if I need to do update or insert
      const arOfObjectsFromCommonForAllComponents = clientSideTableOfCommonForAllComponents
        .query()
        .where('fieldName', 'classificationOfComponentToShowOnMultiTimeStateSide')
        .get()

      if (arOfObjectsFromCommonForAllComponents.length > 0) {
        // Goal: The row already exists so I need to update it
        clientSideTableOfCommonForAllComponents.update({
          data: {
            clientSideUniqRowId: arOfObjectsFromCommonForAllComponents[0]['clientSideUniqRowId'],
            fieldValue: type,
          },
        })
      } else {
        // Goal: The row does not exist so I need to insert it
        clientSideTableOfCommonForAllComponents.insert({
          data: {
            fieldName: 'classificationOfComponentToShowOnMultiTimeStateSide',
            fieldValue: type,
          },
        })
      }
    },
  },
}
</script>
