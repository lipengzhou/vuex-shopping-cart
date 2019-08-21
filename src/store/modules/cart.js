import axios from 'axios'

/**
 * 购物车相关的状态容器
 */

const state = {
  message: 'cart message',
  cartProducts: JSON.parse(window.localStorage.getItem('cart-products')) || [],
  checkoutStat: true
}

const getters = {
  /**
   * 商品总数
   */
  totalCount (state) {
    return state.cartProducts.reduce((count, item) => count + item.count, 0)
  },

  /**
   * 商品总价格
   */
  totalPrice (state) {
    return state.cartProducts.reduce((price, item) => price + item.price, 0).toFixed(2)
  },

  /**
   * 选中商品总数
   */
  checkedTotalCount (state) {
    return state.cartProducts.reduce((count, item) => {
      if (item.isChecked) {
        count += item.count
      }
      return count
    }, 0)
  },

  /**
   * 选中商品总价格
   */
  checkedTotalPrice (state) {
    return state.cartProducts.reduce((price, item) => {
      if (item.isChecked) {
        price += (item.price * item.count)
      }
      return price
    }, 0).toFixed(2)
  }
}

const mutations = {
  /**
   * 删除商品
   */
  deleteProduct (state, productId) {
    const index = state.cartProducts.findIndex(prod => prod.id === productId)
    index !== -1 && state.cartProducts.splice(index, 1)
  },

  /**
   * 添加购物车
   */
  addToCart (state, product) {
    const prod = state.cartProducts.find(item => item.id === product.id)

    // 如果购物车中已经有了这个商品，则让购物车中的这个商品的数量+1
    if (prod) {
      prod.count++
      prod.isChecked = true
    } else {
      // 如果没有，则添加商品到购物车中
      state.cartProducts.push({
        ...product, // { id, title, price }
        count: 1, // 存储商品的数量
        isChecked: true // 存储商品的选中状态
      })
    }
  },

  /**
   * 更新商品数量
   */
  updateProductCount (state, { productId, count }) {
    const prod = state.cartProducts.find(item => item.id === productId)
    prod && (prod.count = count)
  },

  /**
   * 更新商品选中状态
   */
  updateProductChecked (state, { productId, checked }) {
    const prod = state.cartProducts.find(item => item.id === productId)
    prod && (prod.isChecked = checked)
  },

  /**
   * 更新购物车
   */
  setCartProducts (state, products) {
    state.cartProducts = products
  },

  /**
   * 更新所有商品选中状态
   */
  updateAllProductChecked (state, checked) {
    state.cartProducts.forEach(item => (item.isChecked = checked))
  }
}

const actions = {
  /**
   * 结算
   */
  async checkout (context) {
    // 请求结算
    const { data } = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/checkout'
    })

    // 成功，清空购物车
    if (data.success) {
      context.commit('setCartProducts', [])
    } else {
      window.alert('结算失败！')
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
