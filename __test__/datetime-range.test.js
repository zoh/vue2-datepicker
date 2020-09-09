import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import DatetimeRange from '../src/datetime/datetime-range';

let wrapper;

afterEach(() => {
  wrapper.destroy();
});

describe('DatetimeRange', () => {
  it('feat: click dates', async () => {
    wrapper = mount(DatetimeRange, {
      sync: false,
      propsData: {
        type: 'datetime',
        value: [new Date(2019, 9, 4, 18), new Date(2019, 9, 6, 12)],
      },
    });
    const td = wrapper.find('.mx-table-date td:nth-child(4)');
    const td2 = wrapper.find('.mx-table-date td:nth-child(5)');
    td.trigger('click');
    td2.trigger('click');
    await flushPromises();
    expect(wrapper.emitted().select[0][0]).toEqual([
      new Date(2019, 9, 2, 18),
      new Date(2019, 9, 3, 12),
    ]);
    let timeTitle = wrapper.find('.mx-time-header-title');
    expect(timeTitle.exists()).toBe(true);
    timeTitle.trigger('click');
    await flushPromises();
    timeTitle = wrapper.find('.mx-time-header-title');
    expect(timeTitle.exists()).toBe(false);
    td.trigger('click');
    td.trigger('click');
    await flushPromises();
    expect(wrapper.emitted().select[1][0]).toEqual([
      new Date(2019, 9, 2, 18),
      new Date(2019, 9, 2, 18),
    ]);
  });

  it('feat: disabled time', async () => {
    const disabledDate = date => date < new Date(2019, 9, 2);
    const disabledTime = date => date < new Date(2019, 9, 2, 12);
    wrapper = mount(DatetimeRange, {
      sync: false,
      propsData: {
        defaultValue: [new Date(2019, 9, 1), new Date(2019, 9, 1, 12)],
        disabledDate,
        disabledTime,
      },
    });
    const td = wrapper.find('.mx-table-date td:nth-child(4)');
    td.trigger('click');
    td.trigger('click');
    await flushPromises();
    expect(wrapper.emitted().select).toBeUndefined();
    const timeTitle = wrapper.find('.mx-time-header-title');
    expect(timeTitle.text()).toBe('2019-10-02');
    const defaultValue = [new Date(2019, 9, 2, 12), new Date(2019, 9, 2, 12)];
    wrapper.setProps({ defaultValue });
    td.trigger('click');
    td.trigger('click');
    await flushPromises();
    expect(wrapper.emitted().select[0][0]).toEqual(defaultValue);
  });
});
