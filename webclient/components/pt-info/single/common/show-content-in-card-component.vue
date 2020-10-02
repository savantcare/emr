<template>
  <el-card
    shadow="hover"
    class="box-card s-css-class-outer-most-card"
    v-if="OneTimeSwitchToHideCardAndMakeItAvailableOnlyOnBrowserRefresh === 1"
  >
    <!-- H E A D E R -->

    <div
      slot="header"
      class="s-css-class-outer-most-card-header clearfix"
      v-if="!$slots.headerSlotContentFromParent"
      v-on:click="mfOuterMostCardHeaderClicked"
      :style="sendCssVariablesToStyleSheet"
    >
      <!-- If i remove slot="header" then no line below header. But body content starts to shift, when mouse is over icon in header -->
      <span>{{ propMainCardName }}</span>
      <el-button-group style="float: right; display: none">
        <el-tooltip
          v-for="singleCardHeaderAction in propActionsThatCanBeInvokedFromCardHeader"
          :key="singleCardHeaderAction.actionDescription"
          class="item"
          effect="light"
          :content="singleCardHeaderAction.actionDescription"
          placement="top-end"
          :open-delay="1000"
          ><span
            @mouseenter="
              mfHandleNewMouseEnterEventInCardHeader(singleCardHeaderAction.actionDescription)
            "
            @mouseout="mfHandleNewMouseOutEventInCardHeader()"
          >
            <!-- class="mfGetClassForCardHeaderActionIcon(singleCardHeaderAction)" is made dynamic so I can chose which action will get the 
            class of s-css-class-this-is-icon-of-default-action-in-this-card-header -->
            <el-button
              style="padding: 3px; color: #c0c4cc; border: none"
              plain
              tabindex="-1"
              @click.stop="
                mfActOnCardHeaderActionIconClicked(singleCardHeaderAction.actionDescription)
              "
              :class="mfGetClassForCardHeaderActionIcon(singleCardHeaderAction)"
            ></el-button>
          </span>
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
            :open-delay="1000"
          >
            <el-button
              :class="rowLevelAction.actionUIRepresentedByElementIoIconClass"
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
    propActionsThatCanBeInvokedFromCardHeader: Array,
    propClientSideRowLevelActions: Array,
  },
  data: function () {
    return {
      toggleSwitchShowBodyContent: 1,
      OneTimeSwitchToHideCardAndMakeItAvailableOnlyOnBrowserRefresh: 1,
      actionIconBelowMousePointer: null,
      defaultActionDescription: null,
      iconColorChartWhenOnClickWillExecuteThisAction: {
        Add: '#67c23a',
        'Toggle card display': '#909399',
        'Multi edit': '#409eff',
        'Multi delete': '#f56c6c',
        'Show deleted': '#909399',
        'Close card': '#f56c6c',
      },
    }
  },
  computed: {
    sendCssVariablesToStyleSheet() {
      // For basic knowledge read: https://www.telerik.com/blogs/passing-variables-to-css-on-a-vue-component

      if (!this.defaultActionDescription) {
        for (let i = 0; i < this.propActionsThatCanBeInvokedFromCardHeader.length; i++) {
          if (this.propActionsThatCanBeInvokedFromCardHeader[i].isDefaultAction) {
            this.defaultActionDescription = this.propActionsThatCanBeInvokedFromCardHeader[i][
              'actionDescription'
            ]
          }
        }
      }

      // If following condition is false means no icon has been selected and hence we should be highlighting the default icon
      if (this.actionIconBelowMousePointer) {
        // I come here if there is a icon below the mouse.
        // Now there are 2 possibilities. Possibility 1: This is the default action Possibility2: This is not default action
        if (this.actionIconBelowMousePointer !== this.defaultActionDescription) {
          return {
            '--size-of-icon-that-represents-default-action-of-header': '1rem',
            '--color-of-icon-that-represents-default-action-of-header': '#c0c4cc',
          }
        }
      }

      /* This is true means:
        1. The mouse is not over any icon 
        2. Hence, the deault icon should be highlighted in its default color
       */
      return {
        // This find the color of the default icon
        '--color-of-icon-that-represents-default-action-of-header': this
          .iconColorChartWhenOnClickWillExecuteThisAction[this.defaultActionDescription],
        '--size-of-icon-that-represents-default-action-of-header': '1.5rem',
      }
    },
  },
  methods: {
    mfHandleNewMouseEnterEventInCardHeader(pDescription) {
      this.actionIconBelowMousePointer = pDescription
    },
    mfHandleNewMouseOutEventInCardHeader(pDescription) {
      this.actionIconBelowMousePointer = null
    },

    mfOuterMostCardHeaderClicked() {
      for (let i = 0; i < this.propActionsThatCanBeInvokedFromCardHeader.length; i++) {
        if (this.propActionsThatCanBeInvokedFromCardHeader[i].isDefaultAction) {
          this.mfActOnCardHeaderActionIconClicked(
            this.propActionsThatCanBeInvokedFromCardHeader[i]['actionDescription']
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
    mfActOnCardHeaderActionIconClicked(pActionDescription) {
      if (pActionDescription === 'Add') this.$parent.mxOpenAddCtInEditLayer()
      if (pActionDescription === 'Multi edit') this.$parent.mxOpenMultiEditCtInEditLayer()

      if (pActionDescription === 'Toggle card display')
        this.toggleSwitchShowBodyContent = 1 - this.toggleSwitchShowBodyContent
      if (pActionDescription === 'Show deleted') this.$parent.mxOpenTrashCanCtInEditLayer()
      if (pActionDescription === 'Close card')
        this.OneTimeSwitchToHideCardAndMakeItAvailableOnlyOnBrowserRefresh =
          1 - this.OneTimeSwitchToHideCardAndMakeItAvailableOnlyOnBrowserRefresh

      return
    },
    mfGetClassForCardHeaderActionIcon(pAction) {
      if (pAction.actionDescription === 'Add') {
        if (pAction.isDefaultAction) {
          return 'el-icon-circle-plus-outline s-css-class-this-is-icon-of-default-action-in-this-card-header'
        } else return 'el-icon-circle-plus-outline'
      }

      if (pAction.actionDescription === 'Multi edit') {
        if (pAction.isDefaultAction) {
          return 'el-icon-money s-css-class-this-is-icon-of-default-action-in-this-card-header'
        } else return 'el-icon-money'
      }

      if (pAction.actionDescription === 'Multi delete') {
        if (pAction.isDefaultAction) {
          return 'el-icon-document-delete s-css-class-this-is-icon-of-default-action-in-this-card-header'
        } else return 'el-icon-document-delete'
      }

      if (pAction.actionDescription === 'Toggle card display') {
        if (pAction.isDefaultAction) {
          return 'el-icon-remove-outline s-css-class-this-is-icon-of-default-action-in-this-card-header'
        } else return 'el-icon-remove-outline'
      }

      if (pAction.actionDescription === 'Show deleted') {
        if (pAction.isDefaultAction) {
          return 'el-icon-delete s-css-class-this-is-icon-of-default-action-in-this-card-header'
        } else return 'el-icon-delete'
      }

      if (pAction.actionDescription === 'Close card') {
        if (pAction.isDefaultAction) {
          return 'el-icon-close s-css-class-this-is-icon-of-default-action-in-this-card-header'
        } else return 'el-icon-close'
      }
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
  padding: 0.1rem !important;
}

/* Every card in element.io has the class .el-card__body so .el-card__body is not explicitly applied. */
.s-css-class-outer-most-card .el-card__body {
  /* Goal: Manage  Distance from border to content in body*/
  padding: 0.5rem !important;
}

/* Generation Level 2. This is Gen Level 2 since card has a header. Card is Gen 1 and Header is Gen 2. */

/* Goal: The font of the header of the outer most card should be 1.2 of the font size of the browser */
.s-css-class-outer-most-card-header {
  font-size: 1.6rem;
}

/* When cursor is inside the outer most card header make the action icons in the card header visible 
When you look in chrome developer tools you will see that "s-css-class-outer-most-card-header" is contained inside "el-card__header"
*/
.el-card__header:hover .s-css-class-outer-most-card-header .el-button-group {
  display: inline-block !important;
}

/* Goal: 
1. When cursor is inside the top most card header then make the default action icon in the card header larger size 
2. When cursor goes over any other icon then make the default action back to normal size.

Logic sequence is
Step1: Apply a unique class to the default action.
        Done by mfGetClassForCardHeaderActionIcon
Step2: Inside this class make font-size a css/vue variable
        See line 345
Step3: Make this vue variable take value of 1 or 1.5 depending on where the mouse pointer is
       Done by sendCssVariablesToStyleSheet      
Step4: Inner working of sendCssVariablesToStyleSheet
      vue sets the font-size based on following logic:
      1. If the mouse over some other icon then font-size = 1
      2. If the mouse is over this icon or in the header then font-size = 1.5
*/
.el-card__header:hover
  .s-css-class-outer-most-card-header
  .s-css-class-this-is-icon-of-default-action-in-this-card-header {
  font-size: var(
    --size-of-icon-that-represents-default-action-of-header
  ); /* only 2 possibilities Possibility1: 1rem  Possibility2: 1.5rem */
  color: var(--color-of-icon-that-represents-default-action-of-header) !important;
  /* only 2 possibilities Possibility1: Grey color  Possibility2: Color assocaited with that action. 
  For the different colors associated with the actions see the colorChart at show-contnet-in-card-components:111 */
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

/*  Used for TRASH-CAN at: 
Component          |  Side        | Position    | From front  | Front back
Reminder           |  Fixed       |  Header     |   5         | -1
*/
.el-icon-delete:hover {
  color: #909399 !important;
  font-size: 1.5rem;
}

/* Used for Toggle card display at: 
Component           |  Side        | Location     | From front  | From back
  Reminder          |  Fixed       |  Header      |  4          |  -1
  Corelate          |  Fixed       |  Header      |  1          |  -1
  Body measurement  |  Fixed       |  Header      |  1          |  -1
  Service statement |  Flexible    |  Header      |  2          |  -2
  */
.el-icon-remove-outline:hover {
  color: #e6a23c !important;
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
</style>
