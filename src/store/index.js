import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex)

const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    if (mutation.type.startsWith('cart/')) {
      window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
    }
  })
}

const store = new Vuex.Store({
  /**
   * 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误
   * process.env.NODE_ENV
   *    npm run serve: 'development'
   *    npm run build: 'production
   */
  strict: process.env.NODE_ENV !== 'production',
  state: {
    message: 'store message'
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    products,
    cart
  },
  plugins: [myPlugin]
})

export default store
