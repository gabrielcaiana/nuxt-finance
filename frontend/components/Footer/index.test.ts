import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Footer from './index.vue'

describe('Header.vue', () => {
  it('should render the correct component', () => {
    const wrapper = mount(Footer)
    expect(wrapper.exists()).toBeTruthy()
  })

  it('should render the correct text', () => {
    const wrapper = mount(Footer)
    const year = new Date().getFullYear()
    expect(wrapper.text()).toBe(`© ${year} Desenvolvido por Gabriel Caiana`)
  })
})
