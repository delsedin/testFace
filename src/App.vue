<template>
  <div v-cloak id="app" class="viewport blue">
    <uploadImg></uploadImg>
    <result class="result" :class="{ active: isResult }"></result>
  </div>
</template>

<script>
    import axios from 'axios'
    import store from './store'

    import uploadImg from './components/uploadImg'
    import result from './components/result'

    export default {
        name: 'app',
        computed: {
            isResult: function() {
                return this.$state.isResult
            }
        },
        components: {
            uploadImg,
            result
        },
        store,
        created: function(){
        }
    }
</script>

<style>
    [v-clok] {display: none;}
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    html, body {
        margin: 0;
        overflow: hidden;
        height: 100%;
    }
    .viewport {
        max-width: 500px;
        min-width: 320px;
        height:100%;
        margin: 0 auto;
        padding-top: 90px;
        background: #B0DEED url(assets/d.png) repeat-x bottom;
        background-size: 92px;
        background-attachment: fixed;
    }
    .result{display: none;}
    .active{
        display: block;
    }
</style>
