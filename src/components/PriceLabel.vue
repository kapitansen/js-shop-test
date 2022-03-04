<template>
  <el-tag size="medium" :color="color">₽ {{ price }}</el-tag>
</template>

<script>
export default {
  name: "PriceLabel.vue",
  props: {
    price: Number,
  },
  data: function () {
    return {
      color: ''
    }
  },
  watch: {
    price: {
      handler(price, oldPrice) {
        if (oldPrice !== undefined && oldPrice !== price ) {
          this.color = oldPrice > price ? '#f0f9eb' : '#fef0f0'
        }
      },
      immediate: true
    },
  },
}
</script>

<style scoped>

</style>