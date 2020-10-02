<template>
  <el-card
    shadow="hover"
    class="box-card s-css-class-outer-most-card"
    v-if="OneTimeSwitchToHideCardAndMakeItAvailableOnlyOnRefresh === 1"
  >
    <!-- H E A D E R -->

    <div
      slot="header"
      class="s-css-class-outer-most-card-header clearfix"
      v-if="!$slots.headerSlotContentFromParent"
      v-on:click="mfOuterMostCardHeaderClicked"
    >
      <!-- If i remove slot="header" then no line below header. But body content starts to shift, when mouse is over icon in header -->
      <span>{{ propMainCardName }}</span>
      <el-button-group style="float: right; display: none">
        <el-tooltip
          v-for="tableLevelAction in propClientSideTableLevelActions"
          :key="tableLevelAction.actionDescription"
          class="item"
          effect="light"
          :content="tableLevelAction.actionDescription"
          placement="top-end"
          :open-delay="500"
        >
          <el-button
            style="padding: 3px; color: #c0c4cc; border: none"
            plain
            tabindex="-1"
            @click="mfActOnTableLevelIconClicked(tableLevelAction.actionDescription)"
            :class="tableLevelAction.actionUIByElementIoIconClass"
          ></el-button>
        </el-tooltip>
      </el-button-group>
    </div>
    <div v-else><slot name="headerSlotContentFromParent" /></div>

    <!-- B O D Y -->

    <div :class="mfGetTopMostCardBodyGrid()" v-if="toggleSwitchShowBodyContent === 1">
      <slot name="bodySlotContentFromParentToShowAboveChildCards" />
      <el-card
        v-for="card in propChildCardsArray"
        :key="card.clientSideUniqRowId"
        class="box-card sc-individual-child-card"
        shadow="hover"
        :style="mfGetCssClassNameForEachDataRow(card)"
      >
        <!-- Goal: Identify the data coming through socket -->
        <div v-if="card.vnRowStateInSession === 9" class="sc-individual-socket-messege-container">
          <span>Added from socket</span>
        </div>

        <el-button-group style="float: right; display: none">
          <el-tooltip
            v-for="rowLevelAction in propClientSideRowLevelActions"
            :key="rowLevelAction.actionDescription"
            class="item"
            effect="light"
            :content="rowLevelAction.actionDescription"
            placement="top-end"
            :open-delay="500"
          >
            <el-button
              :class="rowLevelAction.actionUIByElementIoIconClass"
              style="padding: 3px; color: #c0c4cc; border: none"
              plain
              tabindex="-1"
              @click="mfActOnRowLevelIconClicked(rowLevelAction.actionDescription, card)"
            ></el-button>
          </el-tooltip>
        </el-button-group>
        <div v-if="card.cardContentOfTypeStringToShowInBodyOfCards">
          {{ card.cardContentOfTypeStringToShowInBodyOfCards }}
        </div>
        <div v-else>
          <component :is="card.cardContentOfTypeComponentObjectToShowInBodyOfCards"></component>
        </div>
      </el-card>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    propMainCardName: String,
    propChildCardsArray: Array,
    propGridDesignTopMostParentBody: String,
    propClientSideTableLevelActions: Array,
    propClientSideRowLevelActions: Array,
  },
  data: function () {
    return {
      toggleSwitchShowBodyContent: 1,
      OneTimeSwitchToHideCardAndMakeItAvailableOnlyOnRefresh: 1,
    }
  },
  computed: {},
  methods: {
    mfOuterMostCardHeaderClicked() {
      for (let i = 0; i < this.propClientSideTableLevelActions.length; i++) {
        const className = this.propClientSideTableLevelActions[i]['actionUIByElementIoIconClass']
        if (className.includes('default')) {
          this.mfActOnTableLevelIconClicked(
            this.propClientSideTableLevelActions[i]['actionDescription']
          )
        }
      }
      // There is no default action given in the card header so nothing to do
    },

    // Goal: Change container font color as per client side row status
    mfGetCssClassNameForEachDataRow(clientSideDataRow) {
      if (!clientSideDataRow.vnRowStateInSession) return
      const strOfNumber = clientSideDataRow.vnRowStateInSession.toString()
      const lastCharecter = strOfNumber.slice(-1)
      if (lastCharecter === '4' || lastCharecter === '6') {
        // when data added only client side
        return 'color: #E6A23C;'
      } else if (lastCharecter === '9') {
        // when data added from socket overwrite default design
        return 'border:1px solid #67C23A;color: #67C23A;'
      } else {
        return 'color: #202020;'
      }
    },
    mfGetTopMostCardBodyGrid() {
      if (this.propGridDesignTopMostParentBody) {
        return this.propGridDesignTopMostParentBody
      }
      return 's-css-class-outer-most-card-body-grid-min-200px-max-1fr'
    },
    mfActOnTableLevelIconClicked(pActionDescription) {
      if (pActionDescription === 'Add') this.$parent.mxOpenAddCtInEditLayer()
      if (pActionDescription === 'Multi edit') this.$parent.mxOpenMultiEditCtInEditLayer()

      if (pActionDescription === 'Toggle card display')
        this.toggleSwitchShowBodyContent = 1 - this.toggleSwitchShowBodyContent
      if (pActionDescription === 'Show deleted') this.$parent.mxOpenTrashCanCtInEditLayer()
      if (pActionDescription === 'Close card')
        this.OneTimeSwitchToHideCardAndMakeItAvailableOnlyOnRefresh =
          1 - this.OneTimeSwitchToHideCardAndMakeItAvailableOnlyOnRefresh

      return
    },
    mfActOnRowLevelIconClicked(pActionDescription, pCard) {
      if (pActionDescription === 'Edit') this.$parent.mfEditIconClicked(pCard.clientSideUniqRowId)

      return
    },
  },
}
</script>

<style>
/* 

5 key concepts 
1. Rule
2. Class
3. id -> one of each on entire page. To target a ID you have to do #id-name
4. Space meaning look inside (https://www.youtube.com/watch?v=dcCCOiQ1ZuM)
5. classA, classB means apply rule to classA and to classB

Generation ->
==============
                                       .s-css-class-outer-most-card
 Generation 1                                      |
==============                     _________________________________
                                  |                                |
                    .s-css-class-outer-most-card-header              |
 Generatiobn 2                                                     |
                                    _______________________________|
                                  |
                  ..s-css-class-outer-most-card-body-grid-min-200px-max-1fr
==============                    |
                                  |
                   .sc-individual-child-card
Generatiobn 3                     |
                       ________________________________________________________________________________
                      |                                 |                                             |
        .sc-individual-child-card-content    .sc-individual-child-card-info-icon           .sc-individual-child-card-delete-icon

==============
*/

/* Generation Level 1. 
s-css-class-outer-most-card  class is applied in Line 4 of this file
Every card in element.io has the class .el-card__header so .el-card__header is not explicitly applied.

.s-css-class-outer-most-card .el-card__header => This will mean apply to an element that has 
1. A prent with the class .s-css-class-outer-most-card
2. This element has .el-card__header

.s-css-class-outer-most-card.el-card__header => This will mean apply to an element that has both
1. s-css-class-outer-most-card
2. el-card__header
*/
.s-css-class-outer-most-card .el-card__header {
  /* Goal: Manage Distance from border to content in header*/
  padding: 0.5rem !important;
}

/* Every card in element.io has the class .el-card__body so .el-card__body is not explicitly applied. */
.s-css-class-outer-most-card .el-card__body {
  /* Goal: Manage  Distance from border to content in body*/
  padding: 0.5rem !important;
}

/* Generation Level 2. This is Gen Level 2 since card has a header. Card is Gen 1 and Header is Gen 2. */

/* Goal: The font of the header of the outer most card should be 1.2 of the font size of the browser */
.s-css-class-outer-most-card-header {
  font-size: 1.2rem;
}

/* When anywhere inside the outer most card header make the action icons in the card header visible 
When you look in chrome developer tools you will see that "s-css-class-outer-most-card-header" is contained inside "el-card__header"
*/
.el-card__header:hover .s-css-class-outer-most-card-header .el-button-group {
  display: inline-block !important;
}

/* When inside the card header make the action icons in the card header -> level 2 visual */
.el-card__header:hover .s-css-class-outer-most-card-header .s-css-class-default-action {
  font-size: 1.5rem;
}

/* Generation Level 2 / Child 2 */

/* Goal: When less space display 1 card in a row. When more space display 100 cards in a row. */
.s-css-class-outer-most-card-body-grid-min-200px-max-1fr {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 0.1rem;
  grid-auto-flow: row; /* This is default value */
  margin: 0.1rem;
}

.s-css-class-outer-most-card-body-grid {
  display: grid;
  grid-gap: 0.1rem;
  grid-auto-flow: row; /* This is default value */
  margin: 0.1rem;
}

/* Generation Level 3 */

/* Goal: Margin and padding of individual card */

.sc-individual-child-card {
  cursor: pointer;
  overflow-wrap: break-word;
  position: relative;
  margin: 0.2rem;
  padding: 1rem 0.1rem 0.1rem !important; /* top - left / right - bottom */
  /* Goal: The contnet of child card should be 1 of the font size of the browser */
  font-size: 1rem;
  overflow: visible;
}

/* Goal: Design for socket messege container */
.sc-individual-socket-messege-container {
  font-size: 10px;
  color: #67c23a;
  position: absolute;
  font-weight: bolder;
  padding: 0 1px;
  top: -7px;
  left: 27%;
  background-color: #fff;
}

/* Goal: Header icon management  */
.sc-individual-child-card:hover .el-button-group {
  display: inline-block !important;
  position: absolute;
  top: 0px;
  right: 0px;
}

/* Used for EDIT at: 
Component           |  Side        | Location     | From front  | From back
  Reminder          |  Fixed       |  Row         |     1       |  -3
  */
.el-icon-edit:hover {
  color: #409eff !important;
  font-size: 1.5rem;
}

/* Used for TIMELINE at: 
Component           |  Side        | Location     | From front  | From back
  Reminder          |  Fixed       |  Row         |  2          |  -2
  */
.el-icon-discover:hover {
  color: #909399 !important;
  font-size: 1.5rem;
}

/* Used for DELETE-ROW at: 
Component           |  Side        | Location     | From front  | From back
  Reminder          |  Fixed       |  Row         |  3          |  -1
  */
.el-icon-circle-close:hover {
  color: #f56c6c !important;
  font-size: 1.5rem;
}

/* Used for SUBMIT-ROW at: 
Component           |  Side        | Location     | From front  | From back
  name              |  Flexible    |  Row         |  3          |  -2
  */
.el-icon-check:hover {
  color: #67c23a !important;
  font-size: 1.5rem;
}

/* Used for RESET-ROW at: 
Component           |  Side        | Location     | From front  | From back
  name              |  Flexible    |  Row         |  4          |  -1
  */
.el-icon-refresh:hover {
  color: #f56c6c !important;
  font-size: 1.5rem;
}

/* Used for CLOSE at: 
Component          |  Side         | Position    | From front  | Front back
Service statement  |  Flexible     | Header      |   3         |    -1
Mental status exam |  Flexible     | Header      |   3         |    -1
*/
.el-icon-close:hover {
  font-size: 1.5rem;
  color: #f56c6c !important;
}

/* Used for ADD at: 
Component         |  Side           | Position    | From front  | Front back
Reminder          |  Fixed          |  Header     |  1 
*/
.el-icon-circle-plus-outline:hover {
  color: #67c23a !important;
  font-size: 1.5rem;
}

/* Used for MULTI-EDIT at: 
Component          |  Side        | Position    | From front  | Front back
 Reminder          |  Fixed       |  Header     |   2         |    -3
 Service statement |  Flexible    |  Header     |   1         |    -3
 */
.el-icon-money:hover {
  color: #409eff !important;
  font-size: 1.5rem;
}

/* Used for MULTI-DELETE at: 
Component          |  Side        | Position    | From front  | Front back
  Reminder         |  Fixed       |  Header     |             | 
   */
.el-icon-document-delete:hover {
  color: #f56c6c !important;
  font-size: 1.5rem;
}

/* Used for MINIMIZE at: 
Component           |  Side        | Location     | From front  | From back
  Reminder          |  Fixed       |  Header      |  4          |  -1
  Corelate          |  Fixed       |  Header      |  1          |  -1
  Body measurement  |  Fixed       |  Header      |  1          |  -1
  Service statement |  Flexible    |  Header      |  2          |  -2
  */
.el-icon-remove-outline:hover {
  color: #909399 !important;
  font-size: 1.5rem;
}

/*  Used for TRASH-CAN at: 
Component          |  Side        | Position    | From front  | Front back
Reminder           |  Fixed       |  Header     |   5         | -1
*/
.el-icon-delete:hover {
  color: #909399 !important;
  font-size: 1.5rem;
}
</style>
