<template>
  <div id="vuexy-grid-demo">
    <!-- <div class="vx-row"> -->
    <koreanbank-overview v-bind:masterDetailResult="masterDetailResult[0]" v-bind:statusProps="masterDetailResult[0].status" v-bind:masterId="masterId"></koreanbank-overview>
    <koreanbank-search v-bind:masterDetailResult="masterDetailResult[0]" v-on:updateSearchStatistic="fetchStatisticUpdateSearch"></koreanbank-search>
    <koreanbank-table v-if="loaded" v-bind:propsdata="statisticSearch" v-bind:isArea="masterDetailResult[0].isArea" v-bind:cycle="masterDetailResult[0].cycle"></koreanbank-table>
    <br /><br />
    <!-- <koreanbank-chart v-if="loaded" v-bind:data="data"></koreanbank-chart> -->
    <vx-card class="mb-base" v-if="loaded" code-toggler>
        <div class="mt-5">
            <!-- <chartjs-component-line-chart :height="250" v-bind:data="this.propsdata" v-bind:options="options"></chartjs-component-line-chart> -->
            <koreanbank-chart :height="200" v-bind:data="data" v-bind:options="options"></koreanbank-chart>
        </div>
    </vx-card>
    <!-- </div> -->
  </div>
</template>

<script>
import KoreanbankChart from "./KoreanbankChart.vue";
import KoreanbankOverview from "./KoreanbankOverview.vue";
import KoreanbankSearch from "./KoreanbankSearch.vue";
import KoreanbankTable from "./KoreanbankTable.vue";

export default {
  name: "Koranbank",
  components: {
    KoreanbankOverview,
    KoreanbankSearch,
    KoreanbankTable,
    KoreanbankChart,
  },
  data:()=>({
    statisticSearch: [],
    masterId: [],
    propsToChart: {
      labels: [],
      data: [],
    },
    masterDetailResult: [],
    loaded: false,
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      legend: {
        display: false,
        position: 'top',
        labels: {
          boxWidth: 80,
          fontColor: 'black'
        }
      },
      title: {
        display: true,
        text: []
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            color: "black"
          },
          scaleLabel: {
            display: true,
            // labelString: [],
            fontColor: "black"
          }
        }],
        yAxes: [{
          gridLines: {
            color: "black",
            borderDash: [2, 5],
          },
          scaleLabel: {
            display: true,
            // labelString: [],
            fontColor: "black"
          }
        }]
      }
    }
  }),
  methods: {
    /* eslint-disable no-console */
    fetchStatisticUpdateSearch(info) {
      // this.loaded = true
      console.log(info);
      //나라 조건이 있을 때
      if(this.masterDetailResult[0].isArea) {
        let areaString = info.selected.join(',');
        console.log("areaString: ", areaString);
        return this.$http
        .get(`${process.env.VUE_APP_BASE_URL}/front/statisticSearch/multipleArea?masterId=${this.masterId}&itemName1=${areaString}&startTime=${info.fromTime}&endTime=${info.toTime}`)
        .then((res) => {
          this.statisticSearch = res.data;
          console.log("statisticSearch: ", this.statisticSearch);
          this.statisticSearchToChartData();
          this.loaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
      } else { //나라 조건이 없을 때
      console.log("no area");
        return this.$http
        .get(`${process.env.VUE_APP_BASE_URL}/front/statisticSearch?masterId=${this.masterId}&startTime=${info.fromTime}&endTime=${info.toTime}`)
        .then((res) => {
          this.statisticSearch = res.data;
          console.log("statisticSearch: ", this.statisticSearch);
          this.statisticSearchToChartData();
          this.loaded = true;
        })
      }
    },
    fetchMasterDetailResult() {
      return this.$http
        .get(`${process.env.VUE_APP_BASE_URL}/front/masterDetailResult?masterId=${this.masterId}`, {
          'headers': {'X-AUTH-TOKEN': this.$cookie.get('token')}
        })
          // `${url}/front/statisticSearch/area?masterId=${masterId}&itemName1=${itemName1}&startTime=${startTime}&endTime=${endTime})
        .then((res) => {
          this.masterDetailResult = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    timeFormat(time) {
      if(this.masterDetailResult[0].cycle === 'YY') {
        return time + '년';
      } else if(this.masterDetailResult[0].cycle === 'MM') {
        if(time.toString().substr(4,1) == "0") {
          return time.toString().substr(0,4) + '년 ' + time.toString().substr(5,1) + '월'
        } else {
          return time.toString().substr(0,4) + '년 ' + time.toString().substr(4,2) + '월'
        }
      } else if (this.masterDetailResult[0].cycle === 'QQ'){
        return time.toString().substr(0,4) + '년 ' + time.toString().substr(4,1) + '분기'
      }
    },
    statisticSearchToChartData() { // 차트 데이터 설정
      let data = [];
      let labels = [];
      let datasets = [];

      for(let i=0; i<this.statisticSearch.length; i++) {
        labels.push(this.timeFormat(this.statisticSearch[i].time));
        data.push(this.statisticSearch[i].dataValue);
      }
      
      console.log("labels: ", labels);
      console.log("data: ", data);

      datasets.push({
        data: data,
        label: this.masterDetailResult[0].statName,
        // borderColor: "#" + Math.round(Math.random()*0xFFFFFF).toString(16),
        borderColor: "#967BDC",
        fill: false
      })

      this.options.title.text = this.masterDetailResult[0].statName;

      this.data = {
        labels: labels,
        datasets: datasets
      }



      // this.data.options.title.text = this.masterDetailResult[0].statName;
      // this.options.title.text = this.statName;
      // console.log(this.options.title.text);

      // console.log("data: ",this.data.datasets);
    }
  },
  async created() {
    try {
    const fullPath = this.$router.history.current.fullPath;
    console.log(this.$router);

    this.masterId = fullPath.substring(fullPath.length - 1, fullPath.length);

    console.log(this.masterId);

    await this.fetchMasterDetailResult();
    console.log(this.masterDetailResult);

    } catch(e) {
      console.error(e);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/pages/grid.scss";
</style>
