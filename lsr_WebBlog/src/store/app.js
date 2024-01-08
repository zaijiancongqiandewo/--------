import { defineStore } from 'pinia'
export const useHeadSearch = defineStore({
  id: 'app',
  state: () => {
    return {
      headSearch:''
    }
  },
  getters:{
    getHeadSearch:(state)=>state.headSearch,
  },
  actions:{
    setHeadSearch(value){
      this.headSearch=value
    }
  }
})
