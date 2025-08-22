<script setup lang="ts">
import CardData from './modules/card-data.vue';
import LineChart from './modules/line-chart.vue';
import PieChart from './modules/pie-chart.vue';
</script>

<template>
  <ASpace direction="vertical" :size="16">
    <CardData />
    <ARow :gutter="[16, 16]">
      <ACol :span="24" :lg="14">
        <LineChart />
      </ACol>
      <ACol :span="24" :lg="10">
        <PieChart />
      </ACol>
    </ARow>
  </ASpace>
</template>

<style scoped></style>
