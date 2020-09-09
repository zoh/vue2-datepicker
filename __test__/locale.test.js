import { mount } from '@vue/test-utils';
import DatePicker from '../src/date-picker.vue';
import '../src/locale/zh-cn';

let wrapper;

afterEach(() => {
  wrapper.destroy();
});

describe('Locale', () => {
  it('render the correct default locale', () => {
    wrapper = mount(DatePicker, {
      propsData: {
        value: new Date(2019, 9, 10),
        open: true,
      },
    });
    expect(wrapper.find('.mx-table-date th').text()).toBe('一');
    expect(wrapper.find('.mx-table-date td').element.title).toBe('2019-09-30');
  });

  it('prop: lang - string', () => {
    wrapper = mount(DatePicker, {
      propsData: {
        value: new Date(2019, 9, 10),
        open: true,
        lang: 'en',
        titleFormat: 'MMM DD, YYYY',
      },
    });
    expect(wrapper.find('.mx-table-date th').text()).toBe('Su');
    expect(wrapper.find('.mx-table-month td').text()).toBe('Jan');
    expect(wrapper.find('.mx-btn-current-month').text()).toBe('Oct');
    expect(wrapper.find('.mx-table-date .active').element.title).toBe('Oct 10, 2019');
    wrapper.setProps({ lang: 'zh-cn' });
    expect(wrapper.find('.mx-table-date th').text()).toBe('一');
    expect(wrapper.find('.mx-table-month td').text()).toBe('1月');
    expect(wrapper.find('.mx-btn-current-month').text()).toBe('10月');
    expect(wrapper.find('.mx-table-date .active').element.title).toBe('10月 10, 2019');
  });

  it('prop: lang - object', () => {
    wrapper = mount(DatePicker, {
      propsData: {
        open: true,
        lang: {
          formatLocale: {
            firstDayOfWeek: 2,
          },
          days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        },
      },
    });
    expect(wrapper.find('.mx-table-date th').text()).toBe('周二');
  });
});
