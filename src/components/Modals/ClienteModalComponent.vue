<template>
  <modal name="cliente-modal-component"
  transition="nice-modal-fade"
  classes="demo-modal-class"
  :min-width="200"
  :min-height="200"
  :pivot-y="0.5"
  :adaptive="true"
  :scrollable="true"
  :reset="true"
  width="90%"
  height="auto"
  @before-open="beforeOpen"
  @opened="opened"
  @closed="closed"
  @before-close="beforeClose">


  <div class="">
    <div class="p-3" style="border-bottom: 1px solid #ddd">
      <div class="row">
        <div class="col-10">
          <p class="m-0 p-2">Histórico de consumo</p>      
        </div>
        <div class="col-2 text-right">
          <p class="m-0 p-2 pointer" @click="close()">x</p>
        </div>
      </div>
    </div>
    <div class="">
      <div class="container-fluid mt-3">
        <div class="row pt-10">
          <div class="form-group col-md-6">
            <label>Data Inicial</label>
            <input type="date" class="form-control"  placeholder="" v-model="data_inicio">
          </div>
          <div class="form-group col-md-6">
            <label>Data Final</label>
            <input type="date" class="form-control" placeholder="" v-model="data_fim">
          </div>
          <div class="form-group col-md-12">
            <button class="btn btn-round btn-wd btn-info mx-auto-mobile mb-2-mobile " @click="openImpostos(cliente)"> Filtrar</button>
          </div>
        </div>
        <div>
          <div class="mb-3">
            <div v-for="venda of vendas" class="row py-2 px-2 bordered-block-table only-mobile">
              <div class="col-6">
                <strong>{{ venda.codigo}}</strong>
                <br>
                <span style="color: #888; font-size: 10px;">{{ venda.data | moment("DD/MM/YYYY") }} {{ venda.hora }}</span>
              </div>
              <div class="col-6">
                V. Receb: {{ venda.valor_recebido | currencyBrl(false) }}
                <br>
                Desc. {{ venda.desconto | currencyBrl(false)}}
                <br>
                {{ venda.forma_pagamento_object ? venda.forma_pagamento_object.descricao : 'COMPOSTO' }}
              </div>
            </div>

            <div class="row py-2 px-2 bordered-block-table only-mobile">
              <div class="col-6">
                <strong>Desconto:</strong>
                <br>
                <strong>Total:</strong>
              </div>
              <div class="col-6">
                {{ total_vendas.desconto | currencyBrl(true) }}
                <br>
                {{ total_vendas.valor | currencyBrl(true) }}
              </div>
            </div>
          </div>
          <table id="historicoCliente" class="display responsive table table-hover table-striped table-bordered hidden-mobile" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th data-hide="phone"><span>Código</span></th>
                <th data-hide="phone"><span>Valor Pago</span></th>
                <th data-hide="phone"><span>Desconto</span></th>
                <th data-hide="phone"><span>Data</span></th>
                <th></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>{{total_vendas.valor | currencyBrl(true)}}</td>
                <td>{{total_vendas.desconto | currencyBrl(true)}}</td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="(item, index) in vendas" :key="index">
                <td>{{ item.codigo }}</td>
                <td>{{ item.valor  | currencyBrl(true) }}</td>
                <td>{{ item.desconto | currencyBrl(true) }}</td>
                <td>{{ item.data | moment("DD/MM/YY") }}</td>
                <td class="text-right">
                  <button class="btn btn-sm btn-info px-2 py-1" @click="info(item)" style="font-size: 10px"><i class="fa fa-info"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="row">
            <div class="col-12 col-md-6 text-center-mobile">
              Mostrando de {{ from_historico }} até {{ to_historico }} de {{ total_historico}} registros
            </div>
            <div class="col-12 col-md-6 text-right text-center-mobile mt-2-mobile">
              <paginate
              :pageCount="pageCount_historico"
              :clickHandler="changePage"
              :prevText="'Ante.'"
              :nextText="'Próx.'"
              :containerClass="'pagination'">
            </paginate>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</modal>
</template>
<script>
  import VendaService from '@/services/VendaService.js'
  import moment from 'moment'

  export default {
    name: 'CaixaModalComponet',
    data () {
      return {
        cliente: {
        },

        data_inicio: moment().format("YYYY-MM-DD"),
        data_fim: moment().format("YYYY-MM-DD"),
        data_fim_cabecalho:moment().format("DD/MM/YYYY"),
        data_inicio_cabecalho:moment().format("DD/MM/YYYY"),
        clientes: [],
        current_page: 1,
        current_page_historico: 1,
        pageCount: 0,
        pageCount_historico: 0,
        vendas:[],
        from: 0,
        from_historico: 0,
        cliente:{},
        to: 0,
        to_historico:0,
        total_vendas:{},
        total_historico:0,
        total: 0,
      }
    },
    methods: {
      beforeOpen (event) {
        this.cliente = event.params.cliente
      },
      beforeClose () {
      },
      opened (e) {        
      },
      closed (e) {
      },
      close() {
        this.$modal.hide('cliente-modal-component')
      },

      info(venda) {
        let html = '';

        html += "<h4 class='mb-1' style='font-size: 16px;'><strong>Informação da venda</strong></h4>";
        // html += "<h4 class='mb-4 mt-0' style='font-size: 16px;'>Informação da venda</h4>"
        html += "<div class='text-left ml-4 mt-4'><p style='font-weight: normal'><strong>Desconto</strong>: R$ " + this.$options.filters.currencyBrl(venda.desconto) + "</p>";
        html += "<p style='font-weight: normal'><strong>Produtos</strong></p>";

        for(let produto of venda.itens) {
          html += "<p style='font-weight: normal'>" + produto.produto_object.descricao + " Quantidade: " + produto.quantidade + "</p>";
        }

        html += "<p style='font-weight: normal'><strong>Pagamentos</strong></p>"

        for(let pagamento of venda.pagamentos) {
          html += "<p style='font-weight: normal'>" + pagamento.forma_pagamento_object.descricao + " R$: " + this.$options.filters.currencyBrl(pagamento.valor, false) + "</p>"
        }

        html += "</div>"

        this.$swal({
          html: html
        })
      },
      openImpostos(cliente) {
        let start = moment().format("YYYY-MM-DD")
        let end = moment().format("YYYY-MM-DD")

        if(this.data_inicio) {
          start = moment(this.data_inicio).format('YYYY-MM-DD')
        }

        if(this.data_fim) {
          end = moment(this.data_fim).format('YYYY-MM-DD')
        }

        VendaService.loadPorCliente("?data_ini="+start+"&data_fim="+end+"&codigo="+this.cliente.codigo+`&page=${this.current_page}`).then(res => {
          this.total_vendas = res.data[1];
          this.pageCount_historico = res.data[0].last_page;
          this.from_historico = res.data[0].from;
          this.to_historico = res.data[0].to;

          this.total_historico = res.data[0].total;
          delete res.data.total;
          this.vendas = res.data[0].data;
        });
      },
      changePage(page) {
        this.current_page = page
        this.openImpostos(this.cliente)
      },
    }
  }
</script>
<style>
.size-modal-content {
  padding: 10px;
  font-style: 13px;
}
.v--modal-overlay[data-modal="size-modal"] {
  background: rgba(0, 0, 0, 0.5);
}
.demo-modal-class {
  border-radius: 5px;
  background: #FFFFFF;
  box-shadow: 5px 5px 30px 0px rgba(46,61,73, 0.6);
  z-index: 99999999;
  margin: 0 auto;
  left: 0 !important;
  margin-top: 20px;
  width: 85% !important;
}
</style>