export default {
  state: {
    vblIsDeletedDrawerVisible: false,
    vsDeletedDrawerTitle: 'Deleted',
    vaDeletedDrawerData: [],
  },
  mutations: {
    mtfSetDeletedDrawerValue(state, value) {
      state.vblIsDeletedDrawerVisible = value.visibility
      state.vsDeletedDrawerTitle = value.drawerTitle
      state.vaDeletedDrawerData = value.drawerData
    },
  },
}
