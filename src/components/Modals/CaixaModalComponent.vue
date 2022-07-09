<template>
  <modal name="caixa-modal-component"
        transition="nice-modal-fade"
        classes="demo-modal-class"
        :min-width="200"
        :min-height="200"
        :pivot-y="0.5"
        :adaptive="true"
        :scrollable="true"
        :reset="true"
        width="80%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose">
    <div class="p-3" style="border-bottom: 1px solid #ddd">
      <div class="row">
        <div class="col-6">
          <p class="m-0 p-2">Detalhamento de caixa</p>      
        </div>
        <div class="col-6 text-right">
          <p class="m-0 p-2 pointer" @click="close()">x</p>
        </div>
      </div>
    </div>
    <div class="row m-4 mx-2-mobile f-20">
      <div class="col-6 font-weight-bold">
        CAIXA
      </div>
      <div class="col-6 text-right font-weight-bold">
        #{{ caixa.codigo }}
      </div>

      <div class="col-12 my-2" style="border-bottom: 1px solid #ddd; height: 1px"></div>

      <div class="col-12 font-weight-bold f-14-mobile">Pagamentos</div>

      <div class="col-12 mt-3 f-14">
        <table class="table">
          <thead class="f-14 font-weight-bold">
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Qtd. <p class="hidden-mobile">Pagamentos</p></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="pedido of caixa.pedidos_sum">
              <td>{{ pedido.nome }}</td>
              <td>{{ pedido.valor | currencyBrl(true) }}</td>
              <td>{{ pedido.qtd }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-12 my-2 text-right f-14 text-grey">
        <p v-if="caixa.usuario_abertura && caixa.usuario_abertura.codigo > 1" class="m-0 mb-2">Aberto por {{ caixa.usuario_abertura ? caixa.usuario_abertura.nome : '' }}</p>
        <p class="m-0 mb-2">Data de Abertura: <i class="fa fa-calendar"></i> {{ caixa.data_abertura | moment("DD/MM/YYYY - HH:mm") }}</p>
        <p v-if="caixa.usuario_fechamento && caixa.usuario_fechamento.codigo > 1" class="m-0">Fechado por {{ caixa.usuario_fechamento ? caixa.usuario_fechamento.nome : '' }}</p>
        <p class="m-0">Data de Fechamento: <i class="fa fa-calendar"></i> {{ caixa.data_fechamento | moment("DD/MM/YYYY - HH:mm") }}</p>
      </div>

      <div class="col-12 mt-3">
        <span class="f-14-mobile"><strong>Registros de Caixa</strong></span>

        <table class="table mt-3 f-14">
          <thead class="f-14 font-weight-bold">
            <tr>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="pagamento of caixa.pagamentos">
              <td>{{ pagamento.observacoes }}</td>
              <td>{{ getPagamentoTipoNome(pagamento.tipo) }}</td>
              <td>{{ pagamento.valor | currencyBrl(true) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-12 text-right f-14 text-grey">
        <p class="mb-2">Valor de Abertura: {{ caixa.valor_abertura | currencyBrl(true) }}</p>
        <p class="mb-2">Diferença: {{ caixa.diferenca_fechamento | currencyBrl(true) }}</p>
        <p class="mb-2 pb-3" style="border-bottom: 1px solid #ddd"><span class="hidden-mobile">Valor</span> Fechamento em Dinheiro: {{ caixa.valor_fechamento | currencyBrl(true) }}</p>
        <p class="mb-2 f-20 text-black f-14-mobile"><strong>Total de Vendas:</strong> {{ caixa.total_vendas | currencyBrl(true) }}</p>

      </div>
    </div>
</modal>
</template>
<script>
  export default {
    name: 'CaixaModalComponet',
    data () {
      return {
        caixa: {
          pagamentos: [],
        }
      }
    },
    methods: {
      beforeOpen (event) {
        this.caixa = event.params.caixa
      },
      beforeClose () {
      },
      opened (e) {        
      },
      closed (e) {
      },
      close() {
        this.$modal.hide('caixa-modal-component')
      },
      getPagamentoTipoNome(tipo) {
        if(tipo == "C") {
          return "Entrada"
        }
        if(tipo == "D") {
          return "Saída"
        }

        return '';
      }
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
    background: #F7F7F7;
    box-shadow: 5px 5px 30px 0px rgba(46,61,73, 0.6);
    z-index: 99999999;
    margin-top: 60px;
  }
</style>