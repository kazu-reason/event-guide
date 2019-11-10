<template>
  <section class="container">
        <div id="map">
        </div>
    </section>
</template>

<script>
import L, { marker } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import util from '../../assets/util'

export default {
  components: {
  },
  data: function(){
    return {
      map: null,
      url: "http://localhost:3000/map.geojson"
    }
  },
  mounted() {
    this.initializeMap()
    util.axiosJson(this.url)
    .then((val) => {
      const data = this.extractData(val)
      this.addMarker(data)
    })
  },
  methods: {
    initializeMap (){
      //leaflet initialize
      const map = L.map('map', {
          center: [34.6863, 133.9200],
          zoom: 17,
          gestureHandling: true,
          preferCanvas: true,
          scrollWheelZoom: true
      });
      const mapObj = document.getElementById('map')
      // フォーカスしたらズームできるようになる
      mapObj.addEventListener("focus", () => {map.scrollWheelZoom.enable()});
      // フォーカスはずれたらズームできなくする
      mapObj.addEventListener("blur", () => {map.scrollWheelZoom.disable()});

      //draw tile
      const osmtile = L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
      });
      osmtile.addTo(map)
      this.map = map;
    },
    async fetchJson(url) {
      let data = null
      fetch(url, {
        mode: 'cors'
      }).then((content) => {
        console.log(content.data)
        data = content.data;
      })
      .catch(() => {
        console.log("failed to fetch json")
      })
      return data;
    },
    async axiosJson(url) {
      let data = null
      await axios.get(url)
      .then((content) => {
        console.log(content.data)
        data = content.data;
      })
      .catch(() => {
        console.log("failed to fetch json")
      })
      .catch(() => {
        console.log("failed to fetch json")
      })
      return data;
    },
    extractData(json) {
      const array = json.features
      let ret_array = []
      for(let el of array){
        let temp_dict = {}
        temp_dict["id"] = el.properties.id;
        temp_dict["coordinates"] = el.geometry.coordinates;
        ret_array.push(temp_dict)
      }
      return ret_array
    },
    addMarker(data) {
      console.log(data)
      const markers = []
      for(let el of data){
        const marker = L.marker([el.coordinates[1],el.coordinates[0]])
        markers.push(marker)
      }
      const markerGroup = L.featureGroup(markers)
      markerGroup.addTo(this.map)
    },
  },
}
</script>

<style>
#map {
  height: 80vh;
  width: 100vw;
  margin: auto;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
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
</style>
