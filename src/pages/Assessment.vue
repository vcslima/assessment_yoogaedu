<template>
  
  <div>
    <div class="row">
      <div class="col-md-12">
      
      <card card-body-classes="table-full-width" v-show="cadastro">
                <table class="display responsive nowrap table table-hover table-striped  hidden-mobile">
            <thead>
              <tr>  
                <th style="width: 300px">id</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="survey in surveys">
                  <td class="">{{ survey.id }}</td>
                <td class="text-right">
                  <button type="button" @click="loadAnswer(survey)" style="font-size: 10px">Print</button>
                </td>
              </tr>
            </tbody>
          </table>

        <div class="px-3">
          <div class="mb-3">
          <div class="row">
              <input class="form-control" type="text">
          </div>
        </div>
      </div>
    </card>
    <div class="row" v-show="!cadastro">
      <div>
       <canvas id="planet-chart"></canvas>
        <a>{{ respostas }}</a>
      </div>
    </div>

    <!-- <card card-body-classes="table-full-width" v-show="!cadastro">
                <table class="display responsive nowrap table table-hover table-striped  hidden-mobile">
            <thead>
              <tr>  
                <th style="width: 300px">id</th>
                <th class="text-right"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for-key="answer in answers">
                <td class="">{{ answer }}</td>
                <td class="text-right">
                  <button class="btn btn-sm btn-info px-2 py-1" @click="loadAnswer(survey)" style="font-size: 10px"><i class="fa fa-print"></i></button>
                </td>
              </tr>
            </tbody>
          </table>

        <div class="px-3">
          <div class="mb-3">
          <div class="row">
              <input class="form-control" type="text">
          </div>
        </div>
      </div>
    </card> -->

    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */

  import axios from 'axios'
  import Chart from 'chart.js'
  import PlanetChart from './radarChart'
  import {
    Card,
  } from '../components'
  import moment from 'moment'
  import AssessmentService from '../services/AssessmentService'
  import Button from '../components/Button.vue' 

  export default {
    components: {
      Card,
      PlanetChart,
      moment
    },
    data() {
      return {
        surveys: [],
        answers: [],
        answer: '',
        survey: '',
        respostas: '',
        codigo:400064870,
        cadastro: true,
        PlanetChart: PlanetChart,
        chartData: [],
        EstoqueProdutos: '',
        Finanças: '',
        Delivery: '',
        Operações: '',
        MarketingVendas: '',
      }
    },
    methods:{
      loadAssement() {
        AssessmentService.load(`400064870/responses`).then(res => {
          this.surveys = res.data.data
          console.log(res.data.data)
        })
      },
       loadAnswer(param) {
        this.cadastro = false
        AssessmentService.answers(param.id + `/details/`).then(res => {
          this.answers = res.data.data
          let teste_respostas = res.data.pages ? res.data.pages : "não tem pagina"
          // console.log(this.respostas);
          let respostasConcatenadas = []

          for (let index = 1; index < teste_respostas.length; index++) {
            let soma = teste_respostas[index];
            respostasConcatenadas.push(soma)

            for (let index2 = 0; index2 < soma.questions.length; index2++) {
              let Nota1 = soma.questions[index2];
              // console.log(Nota1, "Nota 1")
            }
          }
            this.respostas = respostasConcatenadas
          console.log(this.respostas, 'concat');

        })
      },
    },
    mounted() {
      this.loadAssement()

          const config = {
        type: 'radar',
        data: {
          labels: [
            'Estoque e Produtos',
            'Finanças',
            'Delivery',
            'Operações',
            'Marketing e Vendas',
          ],
          datasets: [{
            label: 'Média Geral',
            data: [65, 59, 90, 81, 56],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          }, {
            label: 'Seu desempenho',
            data: [28, 48, 40, 19, 96],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
          }]
        },
        options: {
          elements: {
            line: {
              borderWidth: 3
            }
          }
        },
      };

      
      const myChart = new Chart(
        document.getElementById('planet-chart'),
        config
      );
        // const ctx = document.getElementById('radar-chart');
        // new Chart(ctx, this.radarChartData);
    }
  }
</script>