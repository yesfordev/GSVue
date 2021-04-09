

<script>
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
  data: () => ({
    
  }),
  mounted () {
    this.renderChart(this.data, this.options)
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.$data._chart.destroy()
        this.renderChart(this.data, this.options)
      }
    },
    options: {
      deep: true,
      handler() {
      }
    }
  }
}
</script>
