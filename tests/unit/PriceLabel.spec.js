import { mount } from '@vue/test-utils'
import PriceLabel from '@/components/PriceLabel.vue'

let wrapper;

beforeAll(() => {
    wrapper = mount(PriceLabel, {
        propsData: {
            price: 100
        }
    })
});

describe('PriceLabel', () => {

    it('is created with correct price', () => {
        const tag = wrapper.find('span.el-tag')
        expect(tag.text()).toBe('₽ 100')
    })

    it('is created with neutral color', () => {
        expect(wrapper.element.style.getPropertyValue('background-color')).toBe('');
    })

    it('is change color when new price is lower', async () => {
        await wrapper.setProps({ price: 99 })
        expect(wrapper.find('span.el-tag').attributes('style')).toContain('background-color: rgb(240, 249, 235)')
    })

    it('is change color when new price is higher', async () => {
        await wrapper.setProps({ price: 101})
        expect(wrapper.find('span.el-tag').attributes('style')).toContain('background-color: rgb(254, 240, 240)')
    })
})
