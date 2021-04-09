<template>
    <div id="vuexy-grid-demo">
        <koreanbank-overview
            v-bind:masterDetailResult="masterDetailResult[0]"
            v-bind:statusProps="masterDetailResult[0].status"
            v-bind:masterId="masterId"></koreanbank-overview>
        <koreanbank-search
            v-bind:masterDetailResult="masterDetailResult[0]"
            v-on:updateSearchStatistic="fetchStatisticUpdateSearch"
            v-bind:masterId="masterId"></koreanbank-search>
        <br>
        <koreanbank-table
            v-if="loaded"
            v-bind:propsdata="statisticSearch"
            v-bind:isArea="masterDetailResult[0].isArea"
            v-bind:cycle="masterDetailResult[0].cycle"></koreanbank-table>
        <br/><br/>
        <vx-card class="mb-base" v-if="loaded" code-toggler="code-toggler">
            <div class="mt-5">
                <koreanbank-chart :height="200" v-bind:data="data" v-bind:options="options"></koreanbank-chart>
            </div>
        </vx-card>
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
            KoreanbankChart
        },
        data: () => ({
            statisticSearch: [],
            masterId: [],
            masterDetailResult: [],
            loaded: false,
            data: {
                labels: [],
                datasets: []
            },
            options: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 20,
                        fontColor: 'black'
                    }
                },
                title: {
                    display: true,
                    text: []
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                                color: "black"
                            },
                            scaleLabel: {
                                display: true,
                                // labelString: [],
                                fontColor: "black"
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                color: "black",
                                borderDash: [2, 5]
                            },
                            scaleLabel: {
                                display: true,
                                fontColor: "black"
                            }
                        }
                    ]
                }
            }
        }),
        methods: {
            /* eslint-disable no-console */
            fetchStatisticUpdateSearch(info) {
                //나라 조건이 있을 때
                if (this.masterDetailResult[0].isArea) {
                    let areaString = info
                        .selected
                        .join(',');
                    return this
                        .$http
                        .get(
                            `${process.env.VUE_APP_BASE_URL}/front/statisticSearch/multipleArea?masterId=${this.masterId}&itemName1=${areaString}&startTime=${info.fromTime}&endTime=${info.toTime}`,
                            {
                                'headers': {
                                    'X-AUTH-TOKEN': sessionStorage.getItem('token')
                                }
                            }
                        )
                        .then((res) => {
                            this.statisticSearch = res.data;
                            if(this.masterDetailResult[0].isArea) {
                              this.statisticSearchAreaToChartData(info);
                              this.loaded = true;
                            } else {
                              this.statisticSearchToChartData();
                              this.loaded = true;
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else { //나라 조건이 없을 때
                    return this
                        .$http
                        .get(
                            `${process.env.VUE_APP_BASE_URL}/front/statisticSearch?masterId=${this.masterId}&startTime=${info.fromTime}&endTime=${info.toTime}`,
                            {
                                // 'headers': {'X-AUTH-TOKEN': this.$cookie.get('token')}
                                'headers': {
                                    'X-AUTH-TOKEN': sessionStorage.getItem('token')
                                }
                            }
                        )
                        .then((res) => {
                            this.statisticSearch = res.data;
                            this.statisticSearchToChartData();
                            this.loaded = true;
                        })
                        .catch((error) => {
                          console.log(error);
                          alert("다시 로그인해주세요");
                          this.$router.push({path: '/pages/login'}).catch(() => {})
                        })
                }
            },
            fetchMasterDetailResult() {
                return this
                    .$http
                    .get(
                        `${process.env.VUE_APP_BASE_URL}/front/masterDetailResult?masterId=${this.masterId}`,
                        {
                            'headers': {
                                'X-AUTH-TOKEN': sessionStorage.getItem('token')
                            }
                        }
                    )
                    .then((res) => {
                        this.masterDetailResult = res.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            timeFormat(time) {
                if (this.masterDetailResult[0].cycle === 'YY') {
                    return time + '년';
                } else if (this.masterDetailResult[0].cycle === 'MM') {
                    if (time.toString().substr(4, 1) == "0") {
                        return time
                            .toString()
                            .substr(0, 4) + '년 ' + time
                            .toString()
                            .substr(5, 1) + '월'
                    } else {
                        return time
                            .toString()
                            .substr(0, 4) + '년 ' + time
                            .toString()
                            .substr(4, 2) + '월'
                    }
                } else if (this.masterDetailResult[0].cycle === 'QQ') {
                    return time
                        .toString()
                        .substr(0, 4) + '년 ' + time
                        .toString()
                        .substr(4, 1) + '분기'
                }
            },
            statisticSearchToChartData() { // 차트 데이터 설정
                let data = [];
                let labels = [];
                let datasets = [];

                    for (let i = 0; i < this.statisticSearch.length; i++) {
                        labels.push(this.timeFormat(this.statisticSearch[i].time));
                        data.push(this.statisticSearch[i].dataValue);
                    }

                    datasets.push({
                        data: data, label: this
                            .masterDetailResult[0]
                            .statName,
                        borderColor: "#967BDC",
                        fill: false
                    })

                    this.options.title.text = this
                        .masterDetailResult[0]
                        .statName;

                    this.data = {
                        labels: labels,
                        datasets: datasets
                    }
                },
            statisticSearchAreaToChartData(info) { // 나라차트 데이터 설정
                let data = [];
                let labels = [];
                let datasets = [];

                    let areaString = info
                        .selected
                        .join(',');
                    return this
                        .$http
                        .get(
                            `${process.env.VUE_APP_BASE_URL}/front/statisticSearch/chart/multipleArea?cycle=${this.masterDetailResult[0].cycle}&masterId=${this.masterId}&itemName1=${areaString}&startTime=${info.fromTime}&endTime=${info.toTime}`,
                            {
                                'headers': {
                                    'X-AUTH-TOKEN': sessionStorage.getItem('token')
                                }
                            }
                        )
                        .then((res) => {
                          this.data = {
                            labels: res.data.labels,
                            datasets: res.data.datasets
                          }

                        this.options.title.text = this.masterDetailResult[0].statName;
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
        },
        async created() {
            try {
                const fullPath = this.$router.history.current.fullPath;

                this.masterId = fullPath.substring(fullPath.length - 1, fullPath.length);

                await this.fetchMasterDetailResult();

            } catch (e) {
                console.error(e);
            }
        }
    };
</script>

<style lang="scss">
    @import "@/assets/scss/vuexy/pages/grid.scss";
</style>