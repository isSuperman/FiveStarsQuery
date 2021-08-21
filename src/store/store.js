import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
export default new Vuex.Store({
  state:{
    wb:"",
    showInfo:false,
    infoMsg:""
  },
  mutations:{
    storeData (state, n){
      state.wb = n
    },
    setShowInfo (state,show){
      state.showInfo = show
    },
    setInfoMsg (state,msg){
      state.infoMsg = msg
    }
  }
})