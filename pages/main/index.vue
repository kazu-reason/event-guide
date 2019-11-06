<template>
  <section class="container">
        <div id="map">
        </div>
    </section>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  components: {
  },
  mounted() {
    this.initializeMap()
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
      mapObj.addEventListener("focus", () => {map.scrollWheelZoom.enab
le()});
      // フォーカスはずれたらズームできなくする
      mapObj.addEventListener("blur", () => {map.scrollWheelZoom.disable()});

      //draw tile
      const osmtile = L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
      });
      osmtile.addTo(map)
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
