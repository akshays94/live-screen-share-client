<template>
  <div id="app">
    <h4>Live Screen Share</h4>
    <TabView>
      <TabPanel header="Go Live">
        <AppGoLive />
      </TabPanel>
      <TabPanel header="Join Live Session">
        <AppJoinLive />
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import AppGoLive from '@/components/GoLive.vue';
import AppJoinLive from '@/components/JoinLive.vue';

export default {
  name: 'App',
  components: {
    AppGoLive,
    AppJoinLive,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
