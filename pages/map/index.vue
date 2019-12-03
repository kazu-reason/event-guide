<template>
  <section class="container">
    <div id="map">
    </div>
    <div>
      <!-- <b-button @click="this.onRootGuideClick">経路探索</b-button> -->
      <b-button v-b-modal.modal-1>経路探索</b-button>
    </div>
    <b-modal id="modal-1" title="経路探索" ok-only>
      <p class="my-4">経路探索は現在使用できません</p>
    </b-modal>

    <nuxt-link to="/">Top Pageへ</nuxt-link>
  </section>
</template>

<script>
import L, { marker } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import util from 'assets/util'

export default {
  components: {
  },
  data: function(){
    return {
      id: 0,
      map: null,
      coords: [0,0],
      url: "/map.geojson",
      mapIconUrl: "/marker-icon.png",
      mapIconShadowUrl: "/marker-shadow.png",
      rootGuideUrl: null
    }
  },
  watch: {
    coords : function (newval, oldval){
      this.rootGuideUrl = `http://maps.google.com/maps?saddr=&daddr=${newval[0]},${newval[1]}&dirflg=w`
    }
  },
  mounted() {
    L.Icon.Default.prototype.options.imagePath = process.env.baseUrl
    this.setID()
    this.initializeMap()
    this.markerProcess()
  },
  methods: {
    setID (){
      this.id = this.$route.query.id.toString()
    },
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
    markerProcess() {
      util.axiosJson(this.url)
      .then((val) => {
        const data = this.extractData(val)
        this.addMarker(data)
      })
    },
    extractData(json) {
      const array = json.features
      let ret_array = []
      for(let el of array){
        let temp_dict = {}
        temp_dict["id"] = el.properties.id.toString();
        temp_dict["coordinates"] = el.geometry.coordinates;
        ret_array.push(temp_dict)
      }
      return ret_array
    },
    addMarker(data) {
      const markers = []
      for(let el of data){
        if(el.id === this.id){
          this.coords = [el.coordinates[1],el.coordinates[0]]
          const marker = L.marker(this.coords)
          marker.bindPopup(el.id)
          markers.push(marker)
        }
      }
      const markerGroup = L.featureGroup(markers)
      markerGroup.addTo(this.map)
    },
    addRouting() {
      L.Routing.control({
        waypoints: [
          L.latLng(34.686272260741994, 133.91997635364532),
          L.latLng(34.68750073068877, 133.92055839300156)
        ],
        routeWhileDragging: false
      }).addTo(this.map)
    },
    onRootGuideClick () {
        location.href = this.rootGuideUrl
    }
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
