<template>
  <el-popover
    width="350"
    trigger="hover"
  >
    <el-table :data="cartProducts" size="mini">
      <el-table-column property="title" label="商品"></el-table-column>
      <el-table-column property="price" label="价格"></el-table-column>
      <el-table-column property="count" label="数量"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteProduct(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <p>共{{ totalCount }}件商品 共计¥{{ totalPrice }}</p>
      <el-button size="mini" type="danger" @click="$router.push({ name: 'cart' })">去购物车</el-button>
    </div>
    <el-badge :value="totalCount" class="item" slot="reference">
      <el-button type="primary">我的购物车</el-button>
    </el-badge>
  </el-popover>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CartPop',
  computed: {
    ...mapState('cart', ['cartProducts']),
    ...mapGetters('cart', ['totalCount', 'totalPrice'])
  },

  // watch: {
  //   cartProducts: {
  //     handler (newVal, oldVal) { // 监视数据发生变化，调用 handler
  //       window.localStorage.setItem('cart-products', JSON.stringify(newVal))
  //     },
  //     deep: true // 深度监视，主要针对复杂数据类型（对象、数组）
  //   }
  // },

  methods: {
    ...mapMutations('cart', ['deleteProduct'])
  }

  // data () {
  //   return {
  //     cartProducts: [
  //       { 'id': 1, 'title': 'iPad 4 Mini', 'price': 500.01, isChecked: false, count: 0 },
  //       { 'id': 2, 'title': 'H&M T-Shirt White', 'price': 10.99, isChecked: false, count: 0 },
  //       { 'id': 3, 'title': 'Charli XCX - Sucker CD', 'price': 19.99, isChecked: false, count: 0 }
  //     ]
  //   }
  // }
}
</script>

<style>

</style>
