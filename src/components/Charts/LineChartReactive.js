import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'line-chart-reactive',
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  watch: {
    chartData () {
      this.$data._chart.update()
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
