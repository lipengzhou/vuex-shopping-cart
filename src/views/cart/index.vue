<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="cartProducts"
      style="width: 100%"
    >
      <el-table-column
        width="55">
        <!--
          element 表格组件自定义列头的时候，如果绑定了数据，则必须使用 template 进行包裹，而且必须设定 slot-scope="scope"
          如果你没有绑定任何数据，则不用这么做
          注意：这是一个比较恶心的问题。或者说这是第三方组件库的问题，它要求这么做
         -->
        <template slot="header" slot-scope="scope">
          <el-checkbox
            size="mini"
            v-model="toggleAll"
          ></el-checkbox>
        </template>
        <template slot-scope="scope">
          <el-checkbox
            size="mini"
            :value="scope.row.isChecked"
            @change="updateProductChecked({
              productId: scope.row.id,
              checked: $event
            })"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="商品">
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="count"
        label="数量">
        <!--
          @change="onChange" 有默认事件参数
          @change="onChange(123)" 默认参数就丢失了

          我们依然可以在自定义传参之后继续接收原来的事件参数
          $event 不是瞎写的，一个固定的 API
          @change="onChange(123, $event)"
         -->
        <template slot-scope="scope">
          <el-input-number
            size="mini"
            :min="1"
            :value="scope.row.count"
            @change="updateProductCount({
              productId: scope.row.id,
              count: $event
            })"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="小计">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteProduct(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <p>已选 <span>{{ checkedTotalCount }}</span> 件商品，总价：<span>{{ checkedTotalPrice }}</span></p>
      <el-button type="danger" @click="checkout">结算</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartIndex',
  computed: {
    ...mapState('cart', ['cartProducts']),
    ...mapGetters('cart', ['checkedTotalCount', 'checkedTotalPrice']),
    toggleAll: {
      get () {
        return this.cartProducts.every(item => item.isChecked === true)
      },

      set (checked) {
        this.updateAllProductChecked(checked)
      }
    }
  },

  methods: {
    ...mapMutations('cart', [
      'deleteProduct',
      'updateProductCount',
      'updateProductChecked',
      'updateAllProductChecked'
    ]),
    ...mapActions('cart', ['checkout'])
  }
}
</script>

<style></style>
