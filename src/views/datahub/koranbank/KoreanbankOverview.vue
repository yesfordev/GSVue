<template>
    <!-- <vx-card title="Overview"> -->
    <vx-card>
        <!-- <p>지표에 관한 설명이 들어갈 자리입니다</p> -->
        <div v-html="this.masterDetailResult.description"></div>

        <br>
        <!-- <koreanbank-update></koreanbank-update> -->
        <template>
          <vx-card title="갱신관리" no-shadow card-border>
          <vs-divider/>
      <!-- chip -->
          <!-- <vs-chip color="success"></vs-chip> -->
          <vs-chip v-if="status === '정상'" color="success"></vs-chip>
          <vs-chip v-else-if="status === '업데이트 중'" color="warning"></vs-chip>
          <vs-chip v-else-if="status === '에러'" color="danger"></vs-chip>
          <div>
            <p class="my-3"><code> {{ status }} </code></p>
            <p class="my-3">최근 갱신일: <code>{{ time }}</code></p>
            <p class="my-3">갱신 주기: <code>{{ cycle }}</code> 
            <vs-button v-on:click="updateMaster" class="ml-auto mt-7 flex flex-wrap items-center justify-end">Update</vs-button>
            </p>
          </div>

          </vx-card>
        </template>

    </vx-card>
</template>

<script>

export default {
  components: {  },
  props: {
    masterDetailResult: {
      default: null
    },
    masterId: {
      type: String,
      default: null
    },
    statusProps: {
      default: null
    }
  },
  data:() => ({
    updateInfo: [],
    status: [],
    time: [],
    cycle: [],
  }),
  methods: {
    async updateMaster() {
      this.status = "업데이트 중";
      await this.$http
        .get(`${process.env.VUE_APP_BASE_URL}/search/stat/update/${this.masterId}`, {
          // 'headers': {'X-AUTH-TOKEN': this.$cookie.get('token')}
          'headers': {'X-AUTH-TOKEN': sessionStorage.getItem('token')}
        })
          // `${url}/front/statisticSearch/area?masterId=${masterId}&itemName1=${itemName1}&startTime=${startTime}&endTime=${endTime})
        .then((res) => {
          this.updateInfo = res.data;
        })
        .catch((error) => {
          console.log(error);
        });

        console.log("updateInfo", this.updateInfo);
      
      if(this.updateInfo.status == 0) {
        this.status = "정상";
      } else if(this.updateInfo.status == 2) {
        this.status = "업데이트 중";
      } else if(this.updateInfo.status == 1) {
        this.status = "에러";
      }


      this.time = this.updateInfo.rec_dt;
    }
  },
  mounted () {
    //갱신 상태
    if (this.statusProps === 0) {
      this.status = "정상";
    } else if (this.statusProps === 2) {
      this.status = "업데이트 중";
    } else if (this.statusProps === 1) {
      this.status = "에러";
    }

    //최근 갱신일
    if (!this.loaded) {
      this.time = this.masterDetailResult.rec_dt;
    }

    //갱신 주기

    if (this.masterDetailResult.cycle === 'YY') {
      this.cycle = "년"
    } else if (this.masterDetailResult.cycle === 'MM') {
      this.cycle = "월"
    } else if (this.masterDetailResult.cycle === 'QQ') {
      this.cycle = "분기"
    }

  },
  computed: {
    updateStatus () {
      return this.status;
    },
    updateTime () {
      return this.time;
    }
  }
};
</script>
