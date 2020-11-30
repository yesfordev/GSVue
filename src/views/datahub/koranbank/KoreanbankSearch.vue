<template>
    <!-- <vx-card title="Overview"> -->
    <vx-card>
        <div>
            <h5>주기: 년</h5>
        </div>
        <br>
        <div>
            <h5>검색기간</h5>
        <!-- <template>
            <datepicker :minimumView="'month'" :maximumView="'month'"></datepicker>
        </template> -->
            <flat-pickr :config="configFromdateTimePicker" v-model="fromDate" placeholder="From Date" @on-change="onFromChange" />
            <flat-pickr :config="configTodateTimePicker" v-model="toDate" placeholder="To Date" @on-change="onToChange" />
        </div>
        <br>
        <div>
            <h5>나라</h5>
            <v-select multiple :closeOnSelect="false" v-model="selected" :options="options" :dir="$vs.rtl ? 'rtl' : 'ltr'" /><br>
        </div>

        <!-- <div class="demo-alignment vx-col w-full">
            <vs-button class="ml-auto mt-2" color="primary" type="filled">검색</vs-button>
        </div> -->
        <!-- userEditTabAccount.vue -->
        <div class="vx-row">
            <div class="vx-col w-full">
                <div class="mt-8 flex flex-wrap items-center justify-end">
                    <vs-button class="ml-auto mt-2" @click="save_changes">Search</vs-button>
                    <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
                </div>
            </div>
        </div>

    </vx-card>
</template>

<script>
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
    data () {
        return {
            selected: ['한국','중국'],
            options: ['한국','중국','일본','미국','캐나다','프랑스'],
            fromDate: null,
            toDate: null,
            configFromdateTimePicker: {
                minDate: new Date(),
                maxDate: null
            },
            configTodateTimePicker: {
                minDate: null
            }
        }
    },
    methods: {
      onFromChange(selectedDates, dateStr, instance) {
        this.$set(this.configTodateTimePicker, 'minDate', dateStr);
      },
      onToChange(selectedDates, dateStr, instance) {
        this.$set(this.configFromdateTimePicker, 'maxDate', dateStr);
      }
    },
    components: {
        'v-select': vSelect,
        Datepicker,
        flatPickr
    }
}
</script>
