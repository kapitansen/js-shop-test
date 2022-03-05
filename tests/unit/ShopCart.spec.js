import { mount } from '@vue/test-utils'
import ShopCart from '@/components/ShopCart.vue'

let wrapper, total;

let cart = [{"groupId":"10","productId":194,"quantity":1},{"groupId":"15","productId":12,"quantity":1}]
let productsByGroups = {"10":{"groupName":"Запчасти для машин","products":{"194":{"id":194,"name":"Ремень приводной","quantity":51,"price":{"USD":1.22,"RUB":73.2}}}},"15":{"groupName":"Сувениры","products":{"12":{"id":12,"name":"Брелок-рулетка","quantity":55,"price":{"USD":1.18,"RUB":70.8}},"63":{"id":63,"name":"Брелок-открывалка","quantity":64,"price":{"USD":1.55,"RUB":93}},"64":{"id":64,"name":"Ручка-стилус шариковая","quantity":77,"price":{"USD":1.55,"RUB":93}}}}}

beforeEach(() => {
    wrapper = mount(ShopCart, {
        data: function () {
            return {
                cart: cart,
                productsByGroups: productsByGroups,
            }
        }
    })
    total = wrapper.find('.cart_total > span')
});

describe('ShopCart', () => {

    it('is created with correct total price', () => {
         expect(total.text()).toBe('144')
    })

    it('is products names correct', () => {
        let names = wrapper.findAll('.product_name > .cell')
        expect(names.at(0).text()).toBe('Ремень приводной')
        expect(names.at(1).text()).toBe('Брелок-рулетка')
    })

    it('is products prices correct', () => {
        let names = wrapper.findAll('.el-tag')
        expect(names.at(0).text()).toBe('₽ 73.2')
        expect(names.at(1).text()).toBe('₽ 70.8')
    })

    it('is products quantity correct', () => {
        let names = wrapper.findAll('.el-input__inner')
        expect(names.at(0).attributes('aria-valuenow')).toBe('1')
        expect(names.at(1).attributes('aria-valuenow')).toBe('1')
    })

    it('is total price correct after removing from cart', async () => {
        await wrapper.setData({ cart: [{"groupId":"10","productId":194,"quantity":1}]})
        expect(total.text()).toBe('73.2')
    })

    it('is total price correct after increasing quantity', async () => {
        await wrapper.setData({ cart: [{"groupId":"10","productId":194,"quantity":2}]})
        expect(total.text()).toBe('146.4')
    })

    it('is empty cart displaying correct', async () => {
        await wrapper.setData({ cart: []})
        expect(wrapper.find('.el-empty').isVisible()).toBe(true)
        expect(wrapper.contains('.el-table')).toBe(false)
        expect(wrapper.contains('.cart_total')).toBe(false)
    })

})
