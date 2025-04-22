import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore({
  id : 'stats',
  state: () => ({
    Tcustomer: 120,
    Tproduct: 0,
    Tbrands: 0,
    Torder: 0,

  }),
   
  actions: {
   
  },

  getters: {
  
  }

})


export const useCatagoryStore = defineStore({
  id : 'category',
  state: () => ({
    c1title: " ",
    c2title: " ",
    c3title: " ",
    c1:0,
    c2:0,
    c3:0
  }),
   
  actions: {
   
  },

  getters: {
  
  }

})