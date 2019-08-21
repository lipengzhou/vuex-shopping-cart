/**
 * 商品列表相关的状态容器
 */

import axios from 'axios'

const state = {
  message: 'products message',
  allProducts: [
    // { 'id': 1, 'title': 'iPad 4 Mini', 'price': 500.01 },
    // { 'id': 2, 'title': 'H&M T-Shirt White', 'price': 10.99 },
    // { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 19.99 }
  ]
}

const getters = {}

const mutations = {
  setAllProducts (state, products) {
    state.allProducts = products
  }
}

const actions = {
  async getAllProducts (context) {
    const { data } = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/products'
    })

    context.commit('setAllProducts', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
