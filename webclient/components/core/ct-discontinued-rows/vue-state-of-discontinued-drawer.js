export default {
  state: {
    vblIsDiscontinuedDrawerVisible: false,
    vsDiscontinuedDrawerTitle: 'Discontinued',
    vaDiscontinuedDrawerData: [],
  },
  mutations: {
    mtfSetDiscontinuedDrawerValue(state, value) {
      state.vblIsDiscontinuedDrawerVisible = value.visibility
      state.vsDiscontinuedDrawerTitle = value.drawerTitle
      state.vaDiscontinuedDrawerData = value.drawerData
    },
  },
}
