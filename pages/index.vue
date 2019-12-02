<template>
  <div class="container">
    <h1>event-guide DEMO</h1>
    <div>
      <Logo></Logo>
    </div>
    <div class="text-center">
      <nuxt-link to="/tabpage">施設・バザーリスト</nuxt-link>
    </div>
  </div>
</template>

<script>
import util from '../assets/util'
import Logo from '../components/Logo'

export default {
  components: {
    Logo
  },
  data: function(){
    return {
      url: "http://localhost:3000/id2info.json",
      itemList_: null,
      fields: ["id","name",'show_details'],
    }
  },
  computed: {
    itemList: {
      get: function(){
        return this.itemList_
      },
      set: function(newVal){
        this.itemList_ = newVal
      }
    }
  },
  mounted() {
  },
  methods: {
    loadList (){
      util.axiosJson(this.url)
      .then((val) => {
        this.itemList = val
      })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

#table-transition-1s .flip-list-move {
  transition: transform 1s;
}
</style>
