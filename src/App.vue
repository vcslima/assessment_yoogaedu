<template>
  <router-view></router-view>
</template>

<script>
  export default {}
</script>


<style>
  html, body {
    height: 100%;
  }
	
  .btn-custom {
    height:30px;margin-left: 20px;padding:0;margin-top:0 !important;
  }

  .pagination {
    display: inline-block;
    padding-left: 0;
    /*margin: 20px 0;*/
    border-radius: 4px;
  }

  .pagination > li {
    display: inline;
  }
  
  .pagination > li:first-child > a, .pagination > li:first-child > span {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .pagination > .disabled > span, .pagination > .disabled > span:hover, .pagination > .disabled > span:focus, .pagination > .disabled > a, .pagination > .disabled > a:hover, .pagination > .disabled > a:focus {
    color: #777;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
  }
  
  .pagination > li > a, .pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus {
      z-index: 2;
      color: #fff;
      cursor: default;
      background-color: #337ab7;
      border-color: #337ab7;
  }

  .bordered-block-table {
    font-size: 12px; border: 1px solid #ddd; border-left: 0; border-right: 0; border-top: 0;
  }

  .bordered-block-table:first-child {
    border-top: 1px solid #ddd;
  }

  .f-10 {
    font-size: 10px !important;
  }

  .f-12 {
    font-size: 12px !important;
  }

  .f-14 {
    font-size: 14px !important;
  }

  .f-14 > tr > th {
    font-size: 14px !important;
  }

  .font-weight-bold > tr > th {
    font-weight: bold !important;
  }

  .fw-normal {
    font-weight: normal !important;
  }

  .text-grey {
    color: #888 !important;
  }

  .text-black {
    color: #000 !important;
  }

  .pointer {
    cursor: pointer !important;
  }

  .fw-normal > tr > th {
    font-weight: normal !important;
  } 
  
  .break-all {
    display: inline-block;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: normal;
    line-break: strict;
    hyphens: none;
    -webkit-hyphens: none;
    -moz-hyphens: none;
  }

  .f-20 {
    font-size: 20px !important;
  }

  @media (max-width: 600px) {
    .hidden-mobile {
      display: none !important;
    }

    .text-center-mobile {
      text-align: center !important;
    }

    .text-left-mobile {
      text-align: left !important;
    }

    .mt-2-mobile {
      margin-top: 15px !important;
    }

    .only-mobile {
      /*display: inherit;*/
    }

    .f-20-mobile {
      font-size: 20px !important; 
    }

    .f-14-mobile {
      font-size: 14px !important;
    }

    .mx-auto-mobile {
      margin: 0 auto !important;
    }

    .mx-2-mobile {
      margin-left: 5px !important;
      margin-right: 5px !important;
    }

    .mb-2-mobile {
      margin-bottom: 15px !important;
      margin-bottom: 15px !important;
    }

    .my-2-mobile {
      margin-top: 5px !important;
      margin-bottom: 5px !important;
    }
  }

  @media (min-width: 601px) {
    .only-mobile {
      display: none;
    }
  }


/*
 * Global Font Styling
 */

.f-12 {
    font-size: 12px !important; 
}

.f-13 {
    font-size: 13px !important;
}

.f-14 {
    font-size: 14px !important;
}

.f-15 {
    font-size: 15px !important;
}

.f-18 {
    font-size: 18px !important;
}

.f-22 {
    font-size: 22px !important;
}

.f-24 {
    font-size: 24px !important;
}

.f-28 {
    font-size: 28px !important;
}

.f-30 {
    font-size: 30px !important;
}

.f-36 {
    font-size: 36px !important;
}

.f-48 {
    font-size: 48px !important;
}

.fw-300 {
    font-weight: 300 !important
}

.text-blue {
    color: #2980b9 !important;
}

.text-green {
    color: green !important;
}

.text-grey {
    color: #888 !important;
}
.text-dark-grey {
    color: #464a4c !important;
}

.text-grey-l {
    color: #fff !important;
}

.text-white {
    color: white;
}

.text-red {
    color: red;
}

.text-expense {
    color: #c0392b !important;
}
.text-revenue {
    color: #27ae60 !important;
}

.text-italic {
    font-style: italic;
}

.bg-grey {
    background-color: grey;
}

.bg-white {
    background-color: white;
}

.bg-dark-grey {
    background-color: #999;
}

.bd-xs-grey {
    border: 1px solid #ddd;
}

.bd-grey {
    border: 1px solid #ddd;
}

.bd-top-xs-grey {
    border-top: 1px solid #ddd;
}

.placeholder-grey::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:   #bbb !important;
}
.placeholder-grey:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:    #bfbfbf!important;
   opacity:  1;
}
.placeholder-grey::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:    #bbb !important;
   opacity:  1;
}
.placeholder-grey:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color:    #bbb !important;
}

a.btn-success {
    color: white !important;
}

a.btn-primary {
    color: white !important;
}

.bg-grey {
    background-color: #f6f6f6;
}

.calendar-event-icon {
  position: absolute;
  right: 3px;
  top: 1px;
  z-index: 9999;
}

.input-feedback {
    position: relative;
}

.icon-feedback {
    position: absolute;
    top: 10px;
    right: 10px;

}

.form-control {
  padding: 6px 12px 6px 12px !important;
}

.opaque {
  opacity: 0.5
}

.bold {
  font-weight: bold;
}

.styled-checkbox[type=checkbox] {
  transform: scale(1);
}

.styled-checkbox[type=checkbox] {
  width: 30px;
  height: 30px;
  margin-right: 8px;
  cursor: pointer;
  font-size: 17px;
  visibility: hidden;
}

.styled-checkbox[type=checkbox]:after {
  content: " ";
  background-color: #fff;
  display: inline-block;
  margin-left: 10px;
  padding-bottom: 5px;
  color: #00BFF0;
  width: 22px;
  height: 25px;
  visibility: visible;
  border: 1px solid #ccc;
  padding-left: 3px;
  border-radius: 5px;
}

.styled-checkbox[type=checkbox]:checked:after {
  content: "\2714";
  padding: -5px;
  font-weight: bold;
}

</style>