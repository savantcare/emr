// For flow chart see cts/vl-search/orm-search-phrases-of-ct:7
export default {
  state: {
    arCards: [], // Template has a for loop running on this.
    vsSelectedCardId: '', // arCards might have 10 Cards. Out of those which Card is active needs to be stored outside the array of 10 Cards TODO: Is this needed?
  },
  mutations: {
    mtfSetvsSelectedCardId(state, value) {
      state.vsSelectedCardId = value
    },
    mtfSetArCards(state, value) {
      state.arCards = value
    },
    mtfShowCardInCsVl(state, pCard) {
      // CsVl is current state view layer
      state.arCards.push(pCard)
      state.vsSelectedCardId = pCard.id
      console.log('state-> ', state)
    },
  },
}
