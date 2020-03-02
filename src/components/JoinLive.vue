<template>
  <div>
    <h5>Join Live</h5>
    <div>
      <img ref="myImg" src="" alt="">
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      videonumber: '',
      isLive: false,
      socket: null,
    };
  },
  created() {
    this.socket = io('localhost:3000');
    this.socket.on('JOIN_LIVE', (base64Image) => {
      this.$refs.myImg.src = base64Image;
    });
  },
  methods: {
  },
};
</script>

<style>
img {
  border: 2px dotted green;
  width: 60%;
  max-width: 860px;
  background: black;
}
</style>
