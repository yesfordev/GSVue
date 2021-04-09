
<template lang="html">
<div>
  <!-- 나라 있을 때 -->
  <div v-if="isArea">
    <vs-table stripe max-items="15" pagination :data="this.propsdata">
 
      <template slot="thead">
        <vs-th>No.</vs-th>
        <vs-th>Area</vs-th>
        <vs-th>Time</vs-th>
        <vs-th>Value</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            {{ indextr + 1}}
          </vs-td>

          <vs-td :data="data[indextr].itemName1">
            {{ data[indextr].itemName1 }}
          </vs-td>

          <vs-td :data="data[indextr].time">
            {{ timeFormat(data[indextr].time) }}
          </vs-td>

          <vs-td :data="data[indextr].dataValue">
            {{ insertComma(data[indextr].dataValue) }}  {{ data[indextr].unitName }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>

  <!-- 나라 조건 없을 때 -->
  <div v-else>
    <vs-table stripe max-items="10" pagination :data="this.propsdata">
      <template slot="thead">
        <vs-th>No.</vs-th>
        <vs-th>Time</vs-th>
        <vs-th>Value</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            {{ indextr + 1}}
          </vs-td>

          <vs-td :data="data[indextr].time">
            {{ timeFormat(data[indextr].time) }}
          </vs-td>

          <vs-td v-if="data[indextr].dataValue !== ''" :data="data[indextr].dataValue">
            {{ insertComma(data[indextr].dataValue) }} {{ data[indextr].unitName }}
          </vs-td>
          
          <vs-td v-else :data="data[indextr].dataValue">
            {{ insertComma(data[indextr].dataValue) }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</div>
</template>

<script>
export default {
  props: ['propsdata', 'isArea', 'cycle'],
  data: () => ({
    // statisticSearch: this.propsdata,
    // loaded: false,
  }),
  methods: {
    insertComma(num) {
        var regx = new RegExp(/(-?\d+)(\d{3})/);
        var bExists = num.indexOf(".", 0);//0번째부터 .을 찾는다.
        var strArr = num.split('.');
        while (regx.test(strArr[0])) {//문자열에 정규식 특수문자가 포함되어 있는지 체크
            //정수 부분에만 콤마 달기 
            strArr[0] = strArr[0].replace(regx, "$1,$2");//콤마추가하기
        }
        if (bExists > -1) {
            //. 소수점 문자열이 발견되지 않을 경우 -1 반환
            num = strArr[0] + "." + strArr[1];
        } else { //정수만 있을경우 //소수점 문자열 존재하면 양수 반환 
            num = strArr[0];
        }
        return num;//문자열 반환
    },
    timeFormat(time) {
      if(this.cycle === 'YY') {
        return time + '년';
      } else if(this.cycle === 'MM') {
        if(time.toString().substr(4,1) == "0") {
          return time.toString().substr(0,4) + '년 ' + time.toString().substr(5,1) + '월'
        } else {
          return time.toString().substr(0,4) + '년 ' + time.toString().substr(4,2) + '월'
        }
      } else if (this.cycle === 'QQ'){
        return time.toString().substr(0,4) + '년 ' + time.toString().substr(4,1) + '분기'
      }
    }
  }
}
</script>
        