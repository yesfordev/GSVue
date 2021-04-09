<template>
<div>
    <vx-card>
        <div>
            <h5>주기: {{ cycle }}</h5>
        </div>
        <br>
        <div>
            <h5>검색기간</h5>
            <br>
            <!-- 월, 분기일 때 -->
            <div v-if="cycle === '월' || cycle === '분기'" class="vx-row">
                <div class="vx-col sm:w-1/5 w-full mb-2">
                    <datepicker v-model="fromMonth" :disabled-dates="disabledDates" :minimumView="'month'" :maximumView="'year'" placeholder="시작"></datepicker>
                </div>
                <div class="vx-col sm:w-1/5 w-full mb-2">
                    <datepicker v-model="toMonth" :disabled-dates="disabledDates" :minimumView="'month'" :maximumView="'year'" placeholder="마침"></datepicker>
                </div>
            </div>
            <p v-if="cycle === '분기'">월을 선택하시면 분기 전환되어 검색됩니다</p>
            <!-- 년일 때 -->
             <div v-if="cycle === '년'" class="vx-row">
                <div class="vx-col sm:w-1/5 w-full mb-2">
                    <datepicker v-model="fromYear" :disabled-dates="disabledDates" :minimumView="'year'" :maximumView="'year'" placeholder="시작"></datepicker>
                </div>
                <div class="vx-col sm:w-1/5 w-full mb-2">
                    <datepicker v-model="toYear" :disabled-dates="disabledDates" :minimumView="'year'" :maximumView="'year'" placeholder="마침"></datepicker>
                </div>
            </div>
        </div>
        <br>
        <div v-if="isArea">
            <h5>나라</h5>
            <v-select multiple :closeOnSelect="false" v-model="selected" :options="options" :dir="$vs.rtl ? 'rtl' : 'ltr'" /><br>
        </div>

        <div class="vx-row">
            <div class="vx-col w-full">
                    <vs-button class="ml-auto mt-2" type="relief" v-on:click="search">Search</vs-button>
                    <vs-button class="ml-4 mt-2" type="relief" color="warning" v-on:click="reset">Reset</vs-button>
                

                    <vs-popup class="holamundo" title="검색 조건 부족" :active.sync="popupActive">
                        <p> 검색 기간 또는 검색 조건을 입력해주세요</p>
                    </vs-popup>
            </div>
        </div>

    </vx-card>
    <div class="mt-8 flex flex-wrap items-center justify-end">
        <vs-button class="ml-auto mt-2" type="relief" v-on:click="downloadExcel">검색 조건으로 Excel Download</vs-button>
    </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
    data () {
        return {
            selected: [],
            options: [],
            cycle: [],
            isArea: false,
            fromMonth: null,
            toMonth: null,
            fromYear: null,
            toYear: null,
            popupActive: false,
            disabledDates: {
                to: new Date(1949,12,31),
                from: new Date()
            }
        }
    },
    props: {
        masterDetailResult: {
            default: null
        },
        masterId: {
            type: String,
            default: ""
        }
    },
    methods: {
      onFromChange(selectedDates, dateStr, instance) {
        this.$set(this.configTodateTimePicker, 'minDate', dateStr);
      },
      onToChange(selectedDates, dateStr, instance) {
        this.$set(this.configFromdateTimePicker, 'maxDate', dateStr);
      },
      checkIsArea() {
          if(this.masterDetailResult.isArea === true) {
              this.isArea = true;
          } else {
              this.isArea = false;
          }
      },
      alertPopup() { //검색 조건 확인
          if((this.selected.length === 0) && this.isArea) {
            return this.popupActive=true;
        } 
        
        if(this.masterDetailResult.cycle == 'YY') {
            if(this.fromYear === null || this.toYear === null) {
                return this.popupActive=true;
            }
        } else {
            if(this.fromMonth === null || this.toMonth === null) {
                return this.popupActive=true;
            }
        }
      },
      search() {
        this.alertPopup();

        let fromTime = '';
        let toTime = '';

        if(this.masterDetailResult.cycle === 'MM') {
            fromTime = moment(this.fromMonth).format('yyyyMM');
            toTime = moment(this.toMonth).format('yyyyMM');
        } else if(this.masterDetailResult.cycle === 'QQ') {
            fromTime = moment(this.fromMonth).format('yyyyQ');
            toTime = moment(this.toMonth).format('yyyyQ');
        } else if(this.masterDetailResult.cycle === 'YY') {
            fromTime = moment(this.fromYear).format('yyyy');
            toTime = moment(this.toYear).format('yyyy');
        }

        this.$emit('updateSearchStatistic', {
                selected: this.selected,
                fromTime: fromTime,
                toTime: toTime
            })
      },
      reset() {
          this.selected = [];
          this.fromMonth = null;
          this.toMonth = null;
          this.fromYear = null;
          this.toYear = null;
      },
      downloadExcel() {
          this.alertPopup();

          let fromTime = '';
          let toTime = '';

          if(this.masterDetailResult.cycle === 'MM') {
            fromTime = moment(this.fromMonth).format('yyyyMM');
            toTime = moment(this.toMonth).format('yyyyMM');
          } else if(this.masterDetailResult.cycle === 'QQ') {
            fromTime = moment(this.fromMonth).format('yyyyQ');
            toTime = moment(this.toMonth).format('yyyyQ');
          } else if(this.masterDetailResult.cycle === 'YY') {
            fromTime = moment(this.fromYear).format('yyyy');
            toTime = moment(this.toYear).format('yyyy');
          }

          if(this.isArea) {
              let areaString = this.selected
                        .join(',');
                    return this
                        .$http
                        .get(
                            `${process.env.VUE_APP_BASE_URL}/SearchData/export-csv?masterId=${this.masterId}&itemName1=${areaString}&startTime=${fromTime}&endTime=${toTime}`,
                            {
                                'headers': {
                                    'X-AUTH-TOKEN': sessionStorage.getItem('token')
                                },
                                responseType: 'blob'
                            }
                        )
                        .then((response) => {
                            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'SearchData.csv');
                            document.body.appendChild(link);
                            link.click();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
          } else {
              return this
                        .$http
                        .get(
                            `${process.env.VUE_APP_BASE_URL}/SearchData/export-csv?masterId=${this.masterId}&startTime=${fromTime}&endTime=${toTime}`,
                            {
                                'headers': {
                                    'X-AUTH-TOKEN': sessionStorage.getItem('token')
                                },
                                responseType: 'blob'
                            }
                        )
                        .then((response) => {
                            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'SearchData.csv');
                            document.body.appendChild(link);
                            link.click();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
          }
 
      }
    },
    computed: {
        updateSelected() {
            return this.selected;
        },
    },
    components: {
        'v-select': vSelect,
        Datepicker,
        flatPickr
    },
    mounted () {
        //나라 존재 여부
        this.checkIsArea();
        if(this.masterDetailResult.isArea) {
            this.options = this.masterDetailResult.area;
        }

        //주기
        if (this.masterDetailResult.cycle === 'YY') {
            this.cycle = "년"
        } else if (this.masterDetailResult.cycle === 'MM') {
            this.cycle = "월"
        } else if (this.masterDetailResult.cycle === 'QQ') {
            this.cycle = "분기"
        }
    }
}
</script>
