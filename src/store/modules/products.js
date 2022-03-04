export default {
  namespaced: true,
  state: {
    productsByGroups: {},
    exchangeRates: { RUB: 60 },
  },
  mutations: {
    updateExchangeRates({ exchangeRates, productsByGroups }, { key, val }) {
      exchangeRates[key] = val
      for (let groupId in productsByGroups) {
        for (let itemId in productsByGroups[groupId].products) {
          productsByGroups[groupId].products[itemId].price[key] = +(productsByGroups[groupId].products[itemId].price.USD * val).toFixed(2)
        }
      }
    },
    setProductsByGroups(state, { data, groups }) {
      const productsByGroups = Object.fromEntries(Object.entries(groups).map(x => [x[0], { groupName: x[1].G, products: {} }]))
      for (let {C: priceInUSD, G: groupId, T: productId, P: quantity} of data) {
        if (groups[groupId]?.B[productId]) {
          let priceInRUB = +(state.exchangeRates.RUB * priceInUSD).toFixed(2)
          // Write product to state.productsByGroups
          productsByGroups[groupId].products[productId] = {
            id: productId,
            name: groups[groupId].B[productId].N,
            quantity,
            price: {
              USD: priceInUSD,
              RUB: priceInRUB
            }
          }
        }
      }
      state.productsByGroups = productsByGroups
    }
  },
  actions: {
    async getProducts({ dispatch, commit }) {
        commit('setLoading', true, { root: true })
        const groups = await dispatch('getProductsGroups')
        const data = await dispatch('getProductsData')
        commit('setProductsByGroups', { data: data.Value.Goods, groups })
        commit('setLoading', false, { root: true })
    },
    async getProductsGroups() {
      let response = await fetch('/json/names.json')
      if (response.ok) {
        return await response.json()
      }
      throw new Error("HTTP error " + response.status)
    },
    async getProductsData() {
      let response = await fetch('/json/data.json')
      if (response.ok) {
        return await response.json()
      }
      throw new Error("HTTP error " + response.status)
    }
  }
}
