<template>
  <div>
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
          @click="!isLive ? goLive() : stopLive()"
          :disabled="videonumber.trim().length <= 0"
          :label="!isLive ? `Go Live` : `Stop Live`"
          class="p-button-raised p-button-rounded"
          :class="{ 'p-button-danger': isLive }" />
      </div>
    </div>
    <video id="video" src="" ref="myVideo" autoplay></video>
    <canvas id="canvas" ref="myCanvas" style="border: 1px solid;"></canvas>
  </div>
</template>

<script>
import io from 'socket.io-client';

async function startCapture(displayMediaOptions) {
  let captureStream = null;
  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
  } catch (err) {
    // console.error(`Error: ${err}`);
  }
  return captureStream;
}

export default {
  data() {
    return {
      videonumber: '',
      isLive: false,
      socket: null,
      imageCaptureInterval: null,
    };
  },
  created() {
    // console.log('url', process.env.VUE_APP_SERVER_URL);
    this.socket = io(process.env.VUE_APP_SERVER_URL);
  },
  methods: {
    goLive() {
      // console.log('go live');
      this.isLive = true;
      startCapture()
        .then((captureStream) => {
          this.$refs.myVideo.srcObject = captureStream;

          const track1 = captureStream.getVideoTracks()[0];
          const imageCapture = new ImageCapture(track1);

          const REFRESH_SECS = 50;
          this.imageCaptureInterval = setInterval(() => {
            imageCapture
              .grabFrame()
              .then((imageBitmap) => {
                const canvas = this.$refs.myCanvas;
                canvas.width = imageBitmap.width;
                canvas.height = imageBitmap.height;
                canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
                const base64Image = canvas.toDataURL();
                this.socket
                  .binary(false)
                  .emit('VIDEO_IS_LIVE', {
                    base64Image,
                    videoNumber: this.videonumber,
                  });
              });
          }, REFRESH_SECS);
        });
    },
    stopLive() {
      const tracks = this.$refs.myVideo.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      this.$refs.myVideo.srcObject = null;
      this.isLive = false;
      this.videonumber = '';
      clearInterval(this.imageCaptureInterval);
      const canvas = this.$refs.myCanvas;
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    },
  },
};
</script>

<style>
#video {
  border: 1px solid #999;
  width: 60%;
  max-width: 860px;
  background: black;
}

#canvas {
  display: none;
  border: 1px solid #999;
  width: 60%;
  max-width: 860px;
  background: black;
}
</style>
