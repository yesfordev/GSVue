<!-- =========================================================================================
    File Name: Grid.vue
    Description: Theme Grid System - Imports page portions
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div id="vuexy-grid-demo">
        <!-- <koreanbank-overview></koreanbank-overview> -->
        <!-- <div class="vx-row"> -->
        <koreanbank-overview></koreanbank-overview>
        <koreanbank-search></koreanbank-search>
        <koreanbank-table></koreanbank-table>
        <br><br>
        <koreanbank-chart></koreanbank-chart>
        <!-- </div> -->
    </div>
</template>

<script>
import KoreanbankChart from './KoreanbankChart.vue'
import KoreanbankOverview from './KoreanbankOverview.vue'
import KoreanbankSearch from './KoreanbankSearch.vue'
import KoreanbankTable from './KoreanbankTable.vue'
// import GridDesignConcept from './GridDesignConcept.vue'
// import GridColumnOffset from './GridColumnOffset.vue'
// import GridFlexLayout from './GridFlexLayout.vue'
// import GridFlexAlignment from './GridFlexAlignment.vue'
// import GridFlexOrder from './GridFlexOrder.vue'
// import GridResponsiveLayout from './GridResponsiveLayout.vue'

export default{
  components: {
    KoreanbankOverview,
    KoreanbankSearch,
    // GridDesignConcept,
    KoreanbankTable,
    KoreanbankChart,
    // GridFlexLayout,
    // GridFlexAlignment,
    // GridFlexOrder,
    // GridResponsiveLayout
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/pages/grid.scss";
</style>
