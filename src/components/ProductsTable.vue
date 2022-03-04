<template>
  <div id="ProductsTable">
    <el-collapse
        v-for="({ groupName, products }, groupId) in productsByGroups"
        :key="groupId"
    >
      <el-collapse-item
          :title="groupName"
          name="1"
          :disabled="Object.keys(products).length === 0"
      >
        <el-table
            :data="Object.values(products)"
            :show-header="false"
            style="width: 100%">
          <el-table-column
              prop="name"
              class-name="product_name"
          >
          </el-table-column>
          <el-table-column
              width="110"
              align="right">
            <template slot-scope="product">
              <PriceLabel :price="product.row.price.RUB"></PriceLabel>
            </template>
          </el-table-column>
          <el-table-column
              width="130"
              align="center">
            <template slot-scope="product">
              <el-button
                  size="mini"
                  icon="el-icon-goods"
                  type="success"
                  :disabled="!!product.quantity"
                  @click="onClickAddToCart(groupId, product.row.id, product.row.quantity)">Add to cart</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import PriceLabel from './PriceLabel'

export default {
  name: "ProductsTable.vue",
  components: {PriceLabel},
  computed: {
    ...mapState({
      productsByGroups: state => state.products.productsByGroups,
      cart: state => state.cart.cart
    })
  },
  methods: {
    ...mapMutations('cart', ['addToCart']),
    onClickAddToCart(groupId, productId, quantity) {
      const cartItemIndex = this.cart.findIndex(x => x.groupId === groupId && x.productId === productId)
      if (this.cart[cartItemIndex]?.quantity === quantity) return false
      this.addToCart({ groupId, productId })
    }
  }
}
</script>

<style>
.el-collapse {
  border: 1px solid #d9ecff !important;
}
.el-card {
  border: 1px solid #d9ecff;
}
.el-collapse-item__header.is-active {
  border-bottom-color: #d9ecff !important;
}
.el-collapse-item__header {
  padding-left: 10px;
  background-color: #ecf5ff !important;
  border-bottom: 1px solid #d9ecff !important;
}
.el-collapse-item__wrap {
  border-bottom: none !important;
}
.el-collapse-item__content {
  padding: 0 !important;
}
.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid #d9ecff !important;
}
.product_name .cell {
  font-size: 12px;
  line-height: 16px !important;
  word-break: break-word !important;
}
</style>