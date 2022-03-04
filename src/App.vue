<template>
  <el-container>
    <el-header height="auto">
      <el-row type="flex" justify="space-between" align="middle" style="padding: 10px 0;">
        <el-col :span="12">
          <el-button type="primary" icon="el-icon-loading" size="mini">Time to refresh: {{ timeToUpdate }}</el-button>
        </el-col>
        <el-col :span="12" class="col-rate">
          <span style="color: #fff; padding-right: 7px;">1$ is</span>
          <el-input-number
              v-model="exchangeRates.RUB"
              :min="20"
              :max="80"
              :precision="2"
              :step="0.01"
              size="mini"
              @change="onChangeExchangeRate"
          ></el-input-number>
          <span style="color: #fff; padding-left: 7px;">₽</span>
        </el-col>
      </el-row>
    </el-header>
    <el-main v-loading="isLoading">
      <el-row :gutter="20">
        <el-col :span="12"><div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h3>Products</h3>
            </div>
            <ProductsTable/>
          </el-card>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h3>Cart</h3>
            </div>
            <ShopCart/>
          </el-card>
        </div></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import ProductsTable from './components/ProductsTable'
import ShopCart from './components/ShopCart'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'app',
  components: {
    ProductsTable,
    ShopCart,
  },
  computed: {
    ...mapState({
      isLoading: state  => state.isLoading,
      exchangeRates: state => state.products.exchangeRates
    })
  },
  data() {
    return {
      timeToUpdate: 0
    }
  },
  watch: {
    timeToUpdate: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timeToUpdate--
          }, 1000)
        }
        if (value === 0) {
          this.onUpdate()
        }
      },
      immediate: true
    }
  },
  beforeMount() {
    this.getProducts()
  },
  methods: {
    ...mapActions('products', ['getProducts']),
    ...mapMutations('products', ['updateExchangeRates']),
    onChangeExchangeRate(val) {
        this.updateExchangeRates({ key: 'RUB', val })
    },
    async onUpdate() {
      await this.getProducts()
      this.timeToUpdate = 15
    }
  }
}
</script>

<style>
html,body { margin: 0 !important;}
h1, h2, h3, h4, h5, h6 {
  color: #324e6a !important;
}
.el-header {
  background: #324e6a;
  height: auto;
}
.col-rate {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
