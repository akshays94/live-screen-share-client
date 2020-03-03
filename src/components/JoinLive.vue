<template>
  <div>
    <div>
      <span class="p-float-label">
        <InputText
          type="text"
          v-model="videonumber" />
        <label for="username">Session reference no.</label>
      </span>
    </div>
    <div>
      <Button
        @click="joinSession()"
        :disabled="videonumber.trim().length <= 0"
        :label="`Join Session!`"
        class="p-button-raised p-button-rounded"
        :class="{ 'p-button-danger': false }" />
    </div>
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
  methods: {
    joinSession() {
      this.socket = io(process.env.VUE_APP_SERVER_URL);
      const eventId = `JOIN_LIVE-${this.videonumber}`;
      this.socket.on(eventId, (base64Image) => {
        this.$refs.myImg.src = base64Image;
      });
    },
  },
};
</script>

<style>
img {
  /* border: 2px dotted green; */
  width: 60%;
  max-width: 860px;
  background: black;
}
</style>
