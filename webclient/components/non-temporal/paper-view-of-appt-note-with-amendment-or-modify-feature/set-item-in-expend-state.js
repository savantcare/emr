export default {
  state: {
    arItemNameToExpend: [],
  },
  mutations: {
    mtfSetItemInExpendState(state, item) {
      const index = state.arItemNameToExpend.indexOf(item.nameOfCollapseItem)
      if (index > -1) {
        state.arItemNameToExpend.splice(index, 1)
      } else {
        state.arItemNameToExpend.push(item.nameOfCollapseItem)
      }
    },
  },
}
