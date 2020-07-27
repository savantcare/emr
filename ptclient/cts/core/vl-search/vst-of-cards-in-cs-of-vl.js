// For flow chart see cts/vl-search/orm-search-phrases-of-ct:7
export default {
  state: {
    arCards: [], // Template has a for loop running on this.
  },
  mutations: {
    mtfSetArCards(state, value) {
      state.arCards = value
    },
    mtfShowCardInCsVl(state, pCard) {
      // CsVl is current state view layer
      state.arCards.push(pCard)
      console.log('state-> ', state)
    },
  },
}
