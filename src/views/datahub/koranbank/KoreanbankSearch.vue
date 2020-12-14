<template>
    <!-- <vx-card title="Overview"> -->
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

        <!-- <div class="demo-alignment vx-col w-full">
            <vs-button class="ml-auto mt-2" color="primary" type="filled">검색</vs-button>
        </div> -->
        <!-- userEditTabAccount.vue -->
        <div class="vx-row">
            <div class="vx-col w-full">
                <!-- <div class="mt-8 flex flex-wrap items-center justify-end">
                    <vs-button class="ml-auto mt-2" @click="save_changes">Search</vs-button>
                    <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button> -->
                    <vs-button class="ml-auto mt-2" type="relief" v-on:click="search">Search</vs-button>
                    <vs-button class="ml-4 mt-2" type="relief" color="warning" v-on:click="reset">Reset</vs-button>

                    <vs-popup class="holamundo" title="검색 조건 부족" :active.sync="popupActive">
                        <p> 검색 기간 또는 검색 조건을 입력해주세요</p>
                    </vs-popup>
                <!-- </div> -->
            </div>
        </div>

    </vx-card>
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
            // selected: ['한국','중국'],
            // options: ['한국','중국','일본','미국','캐나다','프랑스'],
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
            // configFromdateTimePicker: {
            //     minDate: new Date(),
            //     maxDate: null,
            // },
            // configTodateTimePicker: {
            //     minDate: null
            // }
        }
    },
    props: {
        masterDetailResult: {
            default: null
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
      search(e) {
          //selected와 기간을 정하지 않으면 안된다는 문구가 뜨는 로직 추가
        // console.log("fromMonth", this.fromMonth);
        // console.log(this.selected.length);
        // console.log(moment(this.fromYear).format('yyyyMM'));
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
      }
    },
    computed: {
        updateSelected() {
            return this.selected;
        },
        // updateIsArea() {
        //     return this.isArea;
        // }
    },
    components: {
        'v-select': vSelect,
        Datepicker,
        flatPickr
    },
    mounted () {
        //나라 존재 여부
        this.checkIsArea();
        // if(this.masterDetailResult.isArea === true) {
        //     this.isArea = true
        // }
        // console.log("isArea: ", this.isArea);

        //나라
        // if(this.isArea) {
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
