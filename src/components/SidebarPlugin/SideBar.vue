<template>
  <div class="sidebar"
       :data-color="backgroundColor">

    <div class="logo">
      <a href="https://yooga.com.br/empresa/dashboard" class="simple-text logo-mini">
        <div class="logo-image">
          <img :src="logo">
        </div>
      </a>

      <a href="https://yooga.com.br/empresa/dashboard" class="simple-text logo-normal" style="color:#19a4e6">
        {{title}}
      </a>

      <div class="navbar-minimize">
        <button id="minimizeSidebar" class="btn btn-simple btn-icon btn-neutral btn-round" @click="minimizeSidebar">
          <i class="now-ui-icons text_align-center visible-on-sidebar-regular"></i>
          <i class="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini"></i>
        </button>
      </div>
    </div>
    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <div class="store-name mx-4 bold">{{ store ? store.apelido : ''}}</div>
      <div class="store-name mx-4">{{ store ? store.cnpj : ''}}</div>
      <slot></slot>
      <ul class="nav" style="color:#36a2c9; !important">
        <slot name="links">
          <sidebar-item v-for="(link, index) in sidebarLinks" :key="link.name + index" :link="link">
            <sidebar-item v-for="(subLink, index) in link.children" :key="subLink.name + index" :link="subLink">
            </sidebar-item>
          </sidebar-item>
        </slot>

      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sidebar',
    props: {
      title: {
        type: String,
        default: 'YOOGA',
      },
      backgroundColor: {
        type: String,
        default: 'white',
        validator: (value) => {
          let acceptedValues = ['white', 'blue', 'azure', 'green', 'orange', 'red', 'purple', 'black']
          return acceptedValues.indexOf(value) !== -1
        }
      },
      logo: {
        type: String,
        default: require('@/assets/img/logo-icon.png')
      },
      sidebarLinks: {
        type: Array,
        default: () => []
      },
      autoClose: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        store: [],
      }
      
    },
    provide () {
      return {
        autoClose: this.autoClose,
      }
    },
    methods: {
      minimizeSidebar () {
        if (this.$sidebar) {
          this.$sidebar.toggleMinimize()
        }
      }
    },
    beforeDestroy () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false
      }
    },
    mounted() {
      try {
        let store = JSON.parse(localStorage.getItem('current_store'))

        this.store = store
      } catch(e) {

      }
    }
  }

</script>
<style>
  .store-name {
    display: none
  }
  @media (min-width: 992px) {
    .navbar-search-form-mobile,
    .nav-mobile-menu{
      display: none;
    }

  }
  .nav-open > .sidebar > .sidebar-wrapper > .store-name {
    display: block;
  }

  .sidebar:hover > .sidebar-wrapper > .store-name {
    display: block;
    white-space: nowrap;                  
    overflow: hidden; /* "overflow" value must be different from "visible" */
    text-overflow:    ellipsis;
  }

  @media (max-width: 991px) {
  }

</style>
