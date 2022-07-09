<template>
  <div class="login-loading-screen">
    <div class="login-loading-bar" v-if="isLoading"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    props: [ 'isLoading' ]
  }
</script>
<style>

@keyframes login-loading-bar {
  0% {
    left: -35%;
    right: 100%
  }

  100%,60% {
    left: 100%;
    right: -90%
  }
}

@keyframes login-loading-bar-short {
  0% {
    left: -200%;
    right: 100%
  }

  100%,60% {
    left: 107%;
    right: -8%
  }
}

.login-loading-screen {
  z-index: 12;
  text-align: center;
  height: 3px;
  width: 100%;
}

.login-loading-screen .login-loading-bar {
  position: relative;
  height: 3px;
  display: block;
  width: 100%;
  background-clip: padding-box;
  overflow: hidden

}

.login-loading-screen .login-loading-bar::after,.login-loading-screen .login-loading-bar::before {
  content: '';
  background-color: rgba(41, 128, 185,0.4);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  will-change: left,right;
  animation: login-loading-bar 2.1s cubic-bezier(.65,.815,.735,.395) infinite
}

.login-loading-screen .login-loading-bar::after {
  animation: login-loading-bar-short 2.1s cubic-bezier(.165,.84,.44,1) infinite;
  animation-delay: 1.15s
}

</style>
