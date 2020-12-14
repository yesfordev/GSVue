

<script>
// import ChartjsComponentLineChart from './components/ChartjsComponentLineChart.vue'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  // props: ['propsdata']
    // propsdata: {
    //   default: []
    // },
    // statName: {
    //   default: ""
    // }
  data: () => ({
    
  }),
  mounted () {
    this.renderChart(this.data, this.options)
  },
  watch: {
    data: {
      deep: true,
      handler() {
        console.log('propsdata changed');
        this.$data._chart.destroy()
        this.renderChart(this.data, this.options)
      }
    },
    options: {
      deep: true,
      handler() {
        console.log('options update');
      }
    }
  }
}
</script>
