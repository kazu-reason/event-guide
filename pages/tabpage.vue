<template>
    <div v-if="this.dataLoaded === true">
        <b-tabs content-class="mt-3">
            <div v-for="(item, name) in itemList" :key="name">
              <b-tab :title=name>
                <list v-bind:listData="item"></list>
              </b-tab>
            </div>
        </b-tabs>
    </div>
    <div v-else>
        <div class="text-center">
            <b-spinner label="Loading..."></b-spinner>
        </div>
    </div>
</template>

<script>
import list from './list.vue'
import util from '../assets/util'

export default {
    components: {
        list
    },
    data: function(){
    return {
      // url: "http://localhost:3000/id2infov2.json",
      url: "http://localhost:3000/store_list.json",
      itemList_: null,
      itemKeys: null,
      dataLoaded: false,
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
    },
  },
  mounted() {
    this.loadList()
    .then(() => {
        this.dataLoaded = true
    })
  },
  watch: {
    itemList: function (newval, oldval) {
      this.itemKeys = Object.keys(newval)
    }
  },
  methods: {
    async loadList (){
        this.dataLoaded = false
        let retval = util.axiosJson(this.url)
        .then((val) => {
            this.itemList = val
        })
        return retval
    }
  }
}
</script>

<style>

</style>