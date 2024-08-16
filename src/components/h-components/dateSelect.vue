<template>
  <v-row>
    <v-col cols="12" sm="4">
      <v-select
        label="Birth Year"
        v-model="selectedYear"
        :items="years"
        outlined
        dense
        color="blue"
      />
    </v-col>
    <v-col cols="12" sm="4">
      <v-select
        label="Birth Month"
        v-model="selectedMonth"
        :items="months"
        outlined
        dense
        color="blue"
      />
    </v-col>
    <v-col cols="12" sm="4">
      <v-select
        label="Birth Day"
        v-model="selectedDay"
        :items="days"
        outlined
        dense
        color="blue"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selectedYear: "",
      selectedMonth: "",
      selectedDay: "",
      years: [],
      months: [],
      days: [],
    };
  },
  created() {
    this.populateYears();
    this.populateMonths();
  },
  watch: {
    selectedYear() {
      this.populateDays();
      this.updateDate();
    },
    selectedMonth() {
      this.populateDays();
      this.updateDate();
    },
    selectedDay() {
      this.updateDate();
    },
  },
  methods: {
    populateYears() {
      const currentYear = new Date().getFullYear();
      for (let year = currentYear - 100; year <= currentYear; year++) {
        this.years.push(year);
      }
    },
    populateMonths() {
      this.months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    },
    populateDays() {
      if (this.selectedYear && this.selectedMonth) {
        const daysInMonth = new Date(
          this.selectedYear,
          this.months.indexOf(this.selectedMonth) + 1,
          0
        ).getDate();
        this.days = Array.from({ length: daysInMonth }, (v, k) => k + 1);
      } else {
        this.days = [];
      }
    },
    updateDate() {
      if (this.selectedYear && this.selectedMonth && this.selectedDay) {
        const monthIndex = this.months.indexOf(this.selectedMonth) + 1;
        const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
        const formattedDay =
          this.selectedDay < 10 ? `0${this.selectedDay}` : this.selectedDay;

        const formattedDate = `${this.selectedYear}-${formattedMonth}-${formattedDay}`;

        this.$emit("update:modelValue", formattedDate);
      }
    },
  },
};
</script>
<style lang=""></style>
