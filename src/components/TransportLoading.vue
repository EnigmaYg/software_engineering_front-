<template>
  <div class="scene" style="opacity: 1;">
    <img class="car" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/43033/car.svg" alt=""/>
    <img class="poof" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/43033/poof.svg" alt=""/>
    <img class="sign" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/43033/sign.svg" alt=""/>
  </div>
</template>

<style scoped>
.scene {
  width: 400px;
  height: 200px;
  overflow: hidden;
}


.car{
  position:relative;
  left:50%;
  margin-left:-50px;
  animation: peel 4s ease-in-out forwards infinite, bump 0.2s linear infinite;
}

.poof{
  position:relative;
  top:90px;
  left:160px;
  margin-left:-100px;
  opacity:0;
  animation: poof 4s ease-in-out forwards infinite;
}

.sign{
  position:relative;
  top:70px;
  animation: sign 4s ease-in-out forwards infinite;
}

@keyframes sign {
  0% {
    right:-490px;
  }
  30% {
    right:-250px;
  }
  70% {
    right:-250px;
  }
  100% {
    right:40px;
  }
}

@keyframes peel {
  0% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(0deg);
  }
  73% {
    transform: rotate(-9deg);
  }
  95% {
    transform: rotate(-9deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes poof {
  0% {
    opacity:0;
    transform: scale(1.0);
  }
  70% {
    opacity:0;
    left:170px;
    transform: scale(1.0);
  }
  76% {
    opacity:1;
    transform: scale(1.3);
    left:160px;
  }
  95% {
    opacity:0;
  }
  100% {
    opacity:0;
    transform: scale(1.3);
  }
}

@keyframes bump {
  0% {
    top:70px;
  }
  50% {
    top:70px;
  }
  60% {
    top:69px;
  }
  100% {
    top:70px;
  }
}
</style>