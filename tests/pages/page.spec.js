import { mount } from '@vue/test-utils';
import Page from '@/pages/index.vue';

describe('Page', () => {
  test('mounts properly', () => {
    const wrapper = mount(Page);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
