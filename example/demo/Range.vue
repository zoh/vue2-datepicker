<template>
  <section>
    <div class="box">
      <section>
        <p>date range</p>
        <date-picker
          v-model="value1"
          type="date"
          range
          placeholder="Select date range"
        ></date-picker>
      </section>
      <section>
        <p>datetime range</p>
        <date-picker
          v-model="value2"
          type="datetime"
          range
          placeholder="Select datetime range"
        ></date-picker>
      </section>
    </div>

    <section>
      <p>datetime range custom</p>
      <date-picker
        v-model="value"
        type="datetime"
        placeholder=""
        range
        lang="ru"
        format="DD.MM.YYYY HH:mm"
        :show-time-panel="showTimeRangePanel"
        confirm
        confirm-text="Apply"
        :handle-select-transformation="transformation"
        @close="handleRangeClose"
        @keyup.native="onKeyDown"
      >
        <template v-slot:footer="{ isEmptyCurValue }">
          <button
            :disabled="isEmptyCurValue"
            :class="{ disabled: isEmptyCurValue }"
            class="mx-btn mx-btn-text"
            @click="toggleTimeRangePanel"
          >
            {{ showTimeRangePanel ? 'выбрать дату' : 'выбрать время' }}
          </button>
        </template>
      </date-picker>

      <p>{{ value }}</p>
    </section>
  </section>
</template>

<script>
import { endOfDay, startOfDay } from 'date-fns';

export default {
  name: 'Range',
  data() {
    return {
      value: [],
      value1: [new Date(2019, 9, 8), new Date(2019, 9, 19)],
      value2: [],

      showTimeRangePanel: false,
    };
  },

  methods: {
    onKeyDown(e) {
      e.stopPropagation();
    },

    handleChange() {
      // todo: smthing
    },

    transformation(data) {
      let [from, to] = data;

      if (from && from - to === 0) {
        // нужно дату расширить
        from = startOfDay(from);
        to = endOfDay(to);

        data = [from, to];
      }

      return data;
    },

    toggleTimeRangePanel() {
      this.showTimeRangePanel = !this.showTimeRangePanel;
    },
    handleRangeClose() {
      this.showTimeRangePanel = false;
    },
  },
};
</script>
