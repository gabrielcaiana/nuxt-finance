import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Modal from './index.vue'

describe('Header.vue', () => {
  it('render the correct component', () => {
    const wrapper = mount(Modal)
    expect(wrapper.exists()).toBeTruthy()
  })
})
