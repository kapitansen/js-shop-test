<template>
  <div id="ShopCart">
    <el-empty v-if="!total" description="The cart is empty"></el-empty>
    <div v-if="total">
      <el-table
          :data="cart"
          :show-header="false"
          :row-key="row => row.groupId + '-' + row.productId"
          border
          style="width: 100%">
        <el-table-column
            class-name="product_name"
        >
          <template slot-scope="cart">
            {{ productsByGroups[cart.row.groupId].products[cart.row.productId].name }}
          </template>
        </el-table-column>
        <el-table-column
            width="110"
            align="right">
          <template slot-scope="cart">
            <PriceLabel :price="productsByGroups[cart.row.groupId].products[cart.row.productId].price.RUB"></PriceLabel>
          </template>
        </el-table-column>
        <el-table-column
            width="120"
            class-name="product_quantity"
            align="center">
          <template slot-scope="cart">
            <el-input-number size="mini" v-model="cart.row.quantity" :min="1" :max="productsByGroups[cart.row.groupId].products[cart.row.productId].quantity"></el-input-number>
            <div class = "product_limited_quantity"
                 v-if="productsByGroups[cart.row.groupId].products[cart.row.productId].quantity < 5"
            >The quantity is limited</div>
          </template>
        </el-table-column>
        <el-table-column
            width="80"
            align="center">
          <template slot-scope="cart">
            <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeFromCart({ groupId: cart.row.groupId, productId: cart.row.productId })"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="cart_total">Total cost: ₽ <span>{{ total }}</span></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import PriceLabel from './PriceLabel'

export default {
  name: "ShopCart.vue",
  components: {PriceLabel},
  computed: {
    ...mapState({
      cart: state => state.cart.cart,
      productsByGroups: state => state.products.productsByGroups
    }),
    total() {
      let result = 0
      for (let { groupId, productId, quantity } of this.cart) {
        result += this.productsByGroups[groupId].products[productId].price.RUB * quantity
      }
      return +(result).toFixed(2)
    }
  },
  methods: {
    ...mapMutations('cart',['removeFromCart']),
  }
}
</script>

<style scoped>
.product_quantity .el-input-number.el-input-number--mini {
  width: 95px;
}
.product_limited_quantity {
  font-size: 10px;
  color: #ea3636;
}
.cart_total {
    margin-top: 15px;
    display: inline-block;
    border: solid 1px #ebeef5;
    padding: 15px 20px;
    background: #ecf5ff;
}
.cart_total span {
  color: #324e6a;
}
</style>