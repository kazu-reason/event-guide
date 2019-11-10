<template>
    <div>
        <b-tabs content-class="mt-3">
            <b-tab title="First" active><p>I'm the first tab</p></b-tab>
            <b-tab title="list1"><list></list></b-tab>
            <b-tab title="list2"><list></list></b-tab>
            <b-tab title="list3"><list></list></b-tab>
        </b-tabs>
    </div>
</template>

<script>
import list from './index.vue'

export default {
    components: {
        list
    },
}
</script>

<style>

</style>