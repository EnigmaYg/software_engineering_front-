<template>
  <div class="background">

    <WeatherLoading v-if="show === 'weather'"></WeatherLoading>
    <TransportLoading v-if="show === 'transport'"></TransportLoading>
    <PancakeLoader v-if="show==='food'"></PancakeLoader>
  </div>
  <div class="text color-apple-wight">
    {{ loader_text }}
  </div>
  <div class="loading-bar">
    <div class="progress-bar"></div>
  </div>

</template>
<script>
import WeatherLoading from "@/components/WeatherLoading.vue";
import TransportLoading from "@/components/TransportLoading.vue";
import PancakeLoader from "@/components/PancakeLoader.vue";
import {onMounted, onDeactivated, ref} from "vue";

export default {
  components: {
    PancakeLoader,
    // FoodLoading
    TransportLoading,
    WeatherLoading
  },
  props:{
    onFinishLoading:{
      type: Function,
      default: () => {}
    }
  },
  setup() {
    let show = ref("transport")
    let loader_text = ref("WE ARE ARRANGING TRANSPORT FOR YOU...")
    const showList = ['transport', 'food', 'weather']
    const loaderTextList = [
      'WE ARE ARRANGING TRANSPORT FOR YOU...',
      'RECOMMEND RESTAURANT...',
      'CHECKING THE WEATHER FOR YOU... '
    ]
    let timer = null
    let index = 1
    onMounted(() => { //组件挂载时的生命周期执行的方法
      timer = setInterval(() => {
        if(index === 3){
          clearInterval(timer);
        }
        show.value = showList[index % 3]
        loader_text.value = loaderTextList[index % 3]
        console.log(index)
        index += 1
      }, 2000);

    })
    onDeactivated(() => { //离开当前组件的生命周期执行的方法
      clearInterval(timer)
      timer = null
    })

    return {
      show,
      loader_text
    }
  }
}
</script>
<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
}

.text {
  position: absolute;
  width: 200px;
  left: 50%;
  margin-left: -100px;
  bottom: 220px;
  letter-spacing: 1px;
  text-align: center;
  font-weight: bold;
  font-size: 11px;
  font-family: Helvetica, 'Helvetica Neue', sans-serif;
}
.loading-bar {
  position: absolute;
  top: 80%;
  left: 50%;
  height: 10px;
  width: 500px;
  margin-left: -250px;
  box-shadow: inset 0px 0px 0px 1px #409be9;
  border-radius: 50px;
  overflow: hidden;
}
@keyframes progress-animation {
  0% {width: 0%;}
  20% {width: 5%;}
  40% {width: 20%;}
  50% {width: 60%;}
  70% {width: 70%;}
  90% {width: 90%;}
  100% {width: 100%;}
}

.progress-bar {
  display: flex;
  height: 100%;
  width: 100%;
  background: #fefefe;
  animation: progress-animation 6s ease-in-out;
}

</style>