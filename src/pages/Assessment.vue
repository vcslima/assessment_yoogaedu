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
    <card>
      <div class="row" v-show="!cadastro">
        <div class="col-md-12">
        <div><a>Assessment Yooga Edu</a></div><br><br>
          <a><b>Nome: </b>{{ Nome }}</a><br>
          <a><b>Estabelecimento: </b>{{ Estabelecimento }}</a><br>
          <a><b>Email: </b>{{ email_cadastrado }}</a><br>
          <a><b>Fone: </b>{{ tel_cadastrado }}</a><br>
          <!-- <a><b>Possuí sistema de gestão?: </b>{{ gestao }}</a><br> -->
        <canvas id="planet-chart"></canvas>
        </div>
      </div>
    </card>
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
        informacoes: '',
        Nome: '',
        Estabelecimento: '',
        email_cadastrado: '',
        tel_cadastrado: '',
        gestao: '',
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
          this.informacoes = teste_respostas[0]
          
          for (let index = 1; index < teste_respostas.length; index++) {
            let soma = teste_respostas[index];
            respostasConcatenadas.push(soma)

            for (let index2 = 0; index2 < soma.questions.length; index2++) {
              let Nota1 = soma.questions[index2];
              // console.log(Nota1, "Nota 1")
            }
          }
            this.respostas = respostasConcatenadas
          
          // let = Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q11,Q12, Q13,Q14,Q15,Q16,Q17;
          //--------------------Finanças-------------------------------------
          let score1 = this.respostas[0].questions[0].answers[0].score
          let score2 = this.respostas[0].questions[1].answers[0].score
          let score3 = this.respostas[0].questions[2].answers[0].score
          let score4 = this.respostas[0].questions[3].answers[0].score
          let score5 = this.respostas[0].questions[4].answers[0].score
          let Q3 = score1+score2+score3+score4+score5
          console.log((Q3/5), "scoreF");

          this.Finanças = (Q3/5)
          //--------------------Delivery-------------------------------------
          let scoreD1 = this.respostas[1].questions[0].answers[0].score
          let scoreD2 = 0;
          let scoreD3 = 0;
          let scoreD4 = 0;
          if(this.respostas[1].questions[0].answers[1]){
            scoreD2 = this.respostas[1].questions[0].answers[1].score
          }
          if(this.respostas[1].questions[0].answers[2]){
            scoreD3 = this.respostas[1].questions[0].answers[2].score
          }
          if(this.respostas[1].questions[0].answers[3]){
            console.log("caiu");
            scoreD4 = this.respostas[1].questions[0].answers[3].score
          }

          let Q4 = scoreD1+scoreD2+scoreD3+scoreD4
          console.log((Q4/2),"scoreD");
          this.Delivery = (Q4/2)

          //--------------------Marketing e Vendas-------------------------------------

          let scoreM1 = this.respostas[1].questions[1].answers[0].score
          let scoreM2 = 0;
          let scoreM3 = 0;
          let scoreM4 = 0;
          if(this.respostas[1].questions[2].answers[0]){
            scoreM2 = this.respostas[1].questions[2].answers[0].score
          }
          if(this.respostas[1].questions[3].answers[0]){
            scoreM3 = this.respostas[1].questions[3].answers[0].score
          }
          if(this.respostas[1].questions[4].answers[0]){
            scoreM4 = this.respostas[1].questions[4].answers[0].score
          }

          let Q5 = scoreM1+scoreM2+scoreM3+scoreM4
          console.log((Q5/4),"scoreM");

          this.MarketingVendas = Q5/4

          //--------------------Operação -------------------------------------
          let scoreO1 = this.respostas[2].questions[0].answers[0].score
          let scoreO2 = 0;
          let scoreO3 = 0;
          let scoreO4 = 0;
          let scoreO5 = 0;
          if(this.respostas[2].questions[1].answers[0]){
            scoreO2 = this.respostas[2].questions[1].answers[0].score
          }
          if(this.respostas[2].questions[2].answers[0]){
            scoreO3 = this.respostas[1].questions[3].answers[0].score
          }
          if(this.respostas[2].questions[3].answers[0]){
            scoreO4 = this.respostas[2].questions[3].answers[0].score
          }
          if(this.respostas[2].questions[4].answers[0]){
            scoreO5 = this.respostas[2].questions[4].answers[0].score
          }

          let Q6 = scoreO1+scoreO2
          console.log((Q6/2),"scoreO");

          this.Operações = Q6/2

           let Q7 = scoreO3+scoreO4+scoreO5
          console.log((Q7/3),"scoreP");

          this.EstoqueProdutos = Q7/3

        // ----------------------- CHART -------------------------

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
            data: [3.5, 3.9, 4.0, 2.1, 3.6],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
          },{
            label: '',
            data: [3.5, 3.9, 5.0, 0, 3.6],
            fill: false,
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgb(255, 0, 0, 0)',
            pointBackgroundColor: 'rgb(255, 99, 132, 0)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132, 0)'
          }, 
          {
            label: 'Seu desempenho',
            data: [this.EstoqueProdutos, this.Finanças, this.Delivery, this.Operações, this.MarketingVendas],
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

      //-----------------------TEXTOS-----------------------------
       this.Nome = this.informacoes.questions[0].answers[0].text
       this.Estabelecimento = this.informacoes.questions[0].answers[1].text
       this.email_cadastrado = this.informacoes.questions[0].answers[2].text
       this.tel_cadastrado = this.informacoes.questions[0].answers[3].text
       if(scoreO2 = 1){
         this.gestao = "Não possuí ou não gosta"
       }
       if(scoreO2 = 3){
         this.gestao = "Possuí mas não utiliza bastante"
       }
       if(scoreO2 = 5){
         this.gestao = "Está satisfeito"
       }
       
        })
      },
    },
    mounted() {
      this.loadAssement()

        
        // const ctx = document.getElementById('radar-chart');
        // new Chart(ctx, this.radarChartData);
    }
  }
</script>