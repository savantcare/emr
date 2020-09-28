<template>
  <el-card
    shadow="hover"
    class="box-card sc-top-most-parent-all-content"
    v-if="flipSwitchShowCard === 1"
  >
    <div slot="header" class="sc-top-most-parent-header clearfix">
      <span>{{ propMainCardName }}</span>
      <el-button-group style="float: right; display: none">
        <el-tooltip
          v-for="action in propClientSideTableLevelActions"
          :key="action.content"
          class="item"
          effect="light"
          :content="action.content"
          placement="top-end"
          :open-delay="500"
        >
          <el-button
            style="padding: 3px; color: #c0c4cc; border: none"
            plain
            tabindex="-1"
            @click="mfIconClicked(action.content)"
            :class="action.class"
          ></el-button>
        </el-tooltip>
      </el-button-group>
    </div>
    <div :class="mfGetClass()" v-if="toggleSwitchShowBodyContent === 1">
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
            class="item"
            effect="light"
            content="Timeline"
            placement="top-end"
            :open-delay="500"
          >
            <el-button
              class="el-icon-discover"
              style="padding: 3px; color: #c0c4cc; border: none"
              plain
              tabindex="-1"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="light"
            content="Delete"
            placement="top-end"
            :open-delay="500"
          >
            <el-button
              class="el-icon-circle-close"
              style="padding: 3px; color: #c0c4cc; border: none"
              plain
              tabindex="-1"
              @click="mfIconDeleteClickedOnChildCard(card.clientSideUniqRowId)"
            ></el-button>
          </el-tooltip>
        </el-button-group>
        <div v-if="card.cardContent">{{ card.cardContent }}</div>
        <div v-if="card.componentPath"><component :is="card.componentObj"></component></div>
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
  },
  data: function () {
    return {
      toggleSwitchShowBodyContent: 1,
      flipSwitchShowCard: 1,
    }
  },
  computed: {},
  methods: {
    mfOpenEditCtInEditLayer() {
      this.$parent.mfOpenEditCtInEditLayer()
    },
    mfIconDeleteClickedOnChildCard(pChildCardUniqId) {
      this.$parent.mfIconDeleteClickedOnChildCard(pChildCardUniqId)
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
    mfGetClass() {
      console.log(this.propClientSideTableLevelActions)
      if (this.propGridDesignTopMostParentBody) {
        return this.propGridDesignTopMostParentBody
      }
      return 'sc-top-most-parent-body-grid-min-200px-max-1fr'
    },
    mfIconClicked(pAction) {
      console.log(pAction)
      this.toggleSwitchShowBodyContent = 1 - this.toggleSwitchShowBodyContent
    },
    mfRemoveOutlineClicked(pAction) {
      console.log(pAction)
      this.toggleSwitchShowBodyContent = 1 - this.toggleSwitchShowBodyContent
    },
    mfIconCloseClicked() {
      this.flipSwitchShowCard = 1 - this.flipSwitchShowCard
    },
  },
}
</script>

<style>
/* Generation ->
==============
                                       .sc-top-most-parent-all-content
 Generation 1                                      |
==============                     _________________________________
                                  |                                |
                    .sc-top-most-parent-header                |
 Generatiobn 2                                                     |
                                    _______________________________|
                                  |
                  ..sc-top-most-parent-body-grid-min-200px-max-1fr
==============                    |
                                  |
                   .sc-individual-child-card
Generatiobn 3                     |
                       ________________________________________________________________________________
                      |                                 |                                             |
        .sc-individual-child-card-content    .sc-individual-child-card-info-icon           .sc-individual-child-card-delete-icon

==============
*/

/* Generation Level 1 */
.sc-top-most-parent-all-content .el-card__header {
  /* Goal: Manage Distance from border to content in header*/
  padding: 0.5rem !important;
}

.sc-top-most-parent-all-content .el-card__body {
  /* Goal: Manage  Distance from border to content in body*/
  padding: 0.5rem !important;
}

/* Generation Level 2 / Child 1 == Goal: Header icon management */

/* Goal: The header of the parent card should be 1.2 of the font size of the browser */
.sc-top-most-parent-header {
  font-size: 1.2rem;
}

/* When anywhere inside the card make the action icons in the card header -> level 1 visual */
.el-card:hover .sc-top-most-parent-header .el-button-group {
  display: inline-block !important;
}

/* When inside the card header make the action icons in the card header -> level 2 visual */
.el-card__header:hover .sc-top-most-parent-header .el-icon-edit {
  color: #67c23a !important;
  font-size: 1.5rem;
}
.el-card__header:hover .sc-top-most-parent-header .el-icon-s-grid {
  color: #409eff !important;
}

/* Generation Level 2 / Child 2 */

/* Goal: When less space display 1 card in a row. When more space display 100 cards in a row. */
.sc-top-most-parent-body-grid-min-200px-max-1fr {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Some other grid-template-columns options are :
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fit, max(200px)); compared to minmax(200px, 1fr) there is more magin between cols and less content fits.
  */
  grid-gap: 0.1rem;
  grid-auto-flow: row; /* This is default value */
  margin: 0.1rem;
}

.sc-top-most-parent-body-grid {
  display: grid;
  /* Some other grid-template-columns options are :
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fit, max(200px)); compared to minmax(200px, 1fr) there is more magin between cols and less content fits.
  */
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
.el-card:hover .sc-individual-child-card .el-button-group {
  display: inline-block !important;
  position: absolute;
  top: 0px;
  right: 0px;
}

/* Not sure where used */
.el-icon-close:hover {
  font-size: 1.5rem;
}

/* Used at: Reminder Ct Row Position 1  */
.el-icon-discover:hover {
  color: #909399 !important;
  font-size: 1.5rem;
}

/* Used at: Reminder Ct Row Position 2  */

.el-icon-circle-close:hover {
  color: #f56c6c !important;
  font-size: 1.5rem;
}

/* Used at: 
  Reminder Ct Table Position 1 
  Corelate Ct Table Position 1 
  Body measurement Ct Table Position 1  */
.el-icon-remove-outline:hover {
  color: #f56c6c !important;
  font-size: 1.5rem;
}

/* Used at: Reminder Ct Table Position 2 */
.el-icon-circle-plus-outline:hover {
  color: #67c23a !important;
  font-size: 1.5rem;
}

/* Used at: Reminder Ct Table Position 3 */
.el-icon-money:hover {
  color: #67c23a !important;
  font-size: 1.5rem;
}

/* Used at: Reminder Ct Table Position 4 */
.el-icon-document-delete:hover {
  color: #f56c6c !important;
  font-size: 1.5rem;
}

/*  Used at: Reminder Ct Table Position 5 */
.el-icon-delete:hover {
  color: #909399 !important;
  font-size: 1.5rem;
}
</style>
