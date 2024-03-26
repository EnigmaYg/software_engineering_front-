<template>
  <div class="loader">
    <i class="icon-location-food loader-icone"></i>
    <div class="text">We Are Searching For Special Local Food...</div>
  </div>
</template>

<style scoped>

.loader{
  position:fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.7);
  left: 0;
  top: 0;
}

.text {
  font-family: Helvetica, 'Helvetica Neue', sans-serif;
  letter-spacing: 1px;
  text-align: center;
  font-weight: bold;
  font-size: 11px;
  width: 200px;
}

.loader-icone{
  font-size: 4em;
  margin-bottom: 50px;
  color: #9ea1a4;
  animation: rotate 2000ms infinite;
}



@keyframes rotate{
  to{
    transform: rotate(360deg);
  }
}

</style>