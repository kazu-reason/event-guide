<template>
  <div class="container">
    <b-table :items="this.itemList" :fields="this.fields" striped responsive="sm">
      <template v-slot:cell(show_details)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <!-- <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Type:</b></b-col>
            <b-col>{{ row.item.type }}</b-col>
          </b-row> -->

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Info:</b></b-col>
            <b-col>出店：{{ row.item.name }}</b-col>
          </b-row>

          <!-- <b-button size="sm"><nuxt-link :to="{ path: 'map', query: {id: row.item.id} }">マップ</nuxt-link></b-button> -->
          <b-button size="sm" :to="{ path: 'map', query: {id: row.item.id} }">マップで見る</b-button>
        </b-card>
      </template>
    </b-table>
    <nuxt-link to="/">Top Pageへ</nuxt-link>
  </div>
</template>

<script>
import util from '../assets/util'

export default {
  components: {
  },
  props: ['listData'],
  data: function(){
    return {
      url: "http://localhost:3000/id2info.json",
      itemList_: this.listData,
      fields: ["id","small","menu", 'show_details'],
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
