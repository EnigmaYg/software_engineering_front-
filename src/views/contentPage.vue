<template>
  <div class="container">
    <!--返回主页-->
    <div class="height-100">
      <div id="backHome" @click="toHomePage">
        <div class="vertical-middle">
          <img src="../static/images/back.png" width="45"/>
        </div>
      </div>
    </div>

    <!-- 区域概况 -->
    <div id="information">
      <div class="card border-radius-20px">
        <div class="content">
          <h2 class="title">Singapore</h2>
          <p class="copy">{{ information }}</p>
          <button class="btn"><i class="icon-pin"/> Pin Here</button>
        </div>
      </div>
    </div>

    <!--自定义增加需求-->
    <div id="special-requests">
      <h1 class="font-belanosima title-medium color-apple-wight text-center margin-bottom-20px">Roam Assistant</h1>
      <div class="height-50px bg-wight box-center display-table border-radius-25px">
        <input class="width-200px display-table-cell vertical-center text-medium font-belanosima margin-left-20px"
               placeholder="Hi~ Any Special Requests?" type="text" @focus="showTips" v-model="request"/>
        <div class="height-40px width-60px border-radius-20px display-table-cell"
             @click="submit">
          <i id="submit" class="icon-send color-black vertical-center text-extra-large margin-left-10px"/>
        </div>
      </div>
      <div v-if="setTips" class="width-300px box-center">
        <div id="tips" v-for="(tip,index) in tips" :key="index" @click="request=tip"
             class="text-center bg-blue margin-tb-10px border-radius-20px"
             style="box-shadow: rgba(3, 102, 214, 0.3) 0 0 0 3px;">
          <p class="text-medium width-80 box-center font-belanosima">{{ tip }}</p>
        </div>
        <div id="hideButton" class="width-100 text-center" @click="hideTips"><i
            class="icon-cheveron-up text-center text-large"/></div>
      </div>
      <FlightTicket :Flight="Flight"></FlightTicket>
      <WeatherInfo></WeatherInfo>
    </div>


    <Swiper class="swiper" :slides-per-view="1.2">
      <swiper-slide v-for="(element,index) in daily_plan_list" :key="index">
        <DailyPlan :formalized_plan="element" :index="index"></DailyPlan>
      </swiper-slide>
      <swiper-slide>
        <AdditionalInfo :additional_info="additional_info"></AdditionalInfo>
      </swiper-slide>
      <swiper-slide>
        <div></div>
      </swiper-slide>
    </Swiper>
<!--    <PageEntry></PageEntry>-->

  </div>

</template>

<script>
import {reactive,ref} from "vue";
import {processData} from "@/hooks/processData";
// import PageEntry from "@/components/PageEntry.vue";
import AdditionalInfo from '@/components/AdditionalInfo.vue'
import {Swiper, SwiperSlide} from "swiper/vue";
import 'swiper/swiper.css'
import DailyPlan from "@/components/DailyPlan.vue";
import router from "@/router";
import FlightTicket from "@/components/FlightTicket.vue";
import WeatherInfo from "@/components/WeatherInfo.vue";


export default {
  components: {
    WeatherInfo,
    FlightTicket,
    DailyPlan,
    Swiper,
    SwiperSlide,
    AdditionalInfo,
    // PageEntry,
  },
  props:['departure','plan'],
  setup(props) {
    let request = ref('')
    let setTips = ref(false)
    const tips = reactive(['Make it 3 days', 'Switch day1 and day2', '$1000 budget', 'I want to eat local special food'])
    let Flight = reactive({
      departure: 'Shanghai',
      departure_airport: 'Kempegowda International',
      destination: 'New',
      dest_airport: 'Indira Gandhi International',
      take_off_time: '6:20',
      take_off_date: 'June 12',
      land_time: '8:45',
      land_date: 'June 12',
      transfer: 'Beijing',
      price: '$1000',
      clazz: 'Economy',
    })
    let daily_plan_list = reactive([]);
    let information = ref('');
    let additional_info = reactive([])
    processData(daily_plan_list, information, additional_info, props.plan)



    function toHomePage() {
      router.push("/")
    }

    function showTips() {
      console.log("show")
      setTips.value = true
    }

    function hideTips() {
      console.log("hide")
      setTips.value = false
    }

    return {
      toHomePage,
      showTips,
      hideTips,
      setTips,
      request,
      tips,
      daily_plan_list,
      information,
      additional_info,
      Flight
    }
  },
};
</script>

<style scoped>
@import "@/static/css/basic.css";


.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
}


.list-group-item, .list-group-item i {
  cursor: move;
}

.container {
  background: #56CCF2; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2F80ED, #56CCF2); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2F80ED, #56CCF2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  width: 100%;
  height: 100vh;
}

input {
  background: none !important;
  outline: none !important;
  border: none !important;
}

#display-area {
  width: 100%;
  height: 100%;
  background-color: #00a95c;
}

#backHome {
  height: 100%;
  width: 40px;
  cursor: pointer;
  display: table;
}

#backHome:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
}

/* 设置幻灯片宽度为自动 */
.swiper-slide {
  margin-right: 40px !important;
  /*height: 650px;*/
}

.swiper-slide:hover {
  cursor: grab;
}

#special-requests {
  margin: 30px 10px 0 10px;
  align-self: flex-start;
}

#tips:hover {
  cursor: pointer;
  background-color: #00a95c;
}

#hideButton:hover {
  cursor: pointer;
}

#submit:hover {
  cursor: pointer;
  color: #0e8ee9;
}

.card {
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding: 1rem;
  width: 200px;
  margin-left: 20px;
  text-align: center;
  color: whitesmoke;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1), 0 16px 16px rgba(0, 0, 0, 0.1);
}

@media (min-width: 600px) {
  .card {
    height: 350px;
  }
}

.card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background-size: cover;
  background-position: 0 0;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  pointer-events: none;
}

.card:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  pointer-events: none;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.009) 11.7%, rgba(0, 0, 0, 0.034) 22.1%, rgba(0, 0, 0, 0.072) 31.2%, rgba(0, 0, 0, 0.123) 39.4%, rgba(0, 0, 0, 0.182) 46.6%, rgba(0, 0, 0, 0.249) 53.1%, rgba(0, 0, 0, 0.32) 58.9%, rgba(0, 0, 0, 0.394) 64.3%, rgba(0, 0, 0, 0.468) 69.3%, rgba(0, 0, 0, 0.54) 74.1%, rgba(0, 0, 0, 0.607) 78.8%, rgba(0, 0, 0, 0.668) 83.6%, rgba(0, 0, 0, 0.721) 88.7%, rgba(0, 0, 0, 0.762) 94.1%, rgba(0, 0, 0, 0.79) 100%);
  transform: translateY(-50%);
}

.card:nth-child(1):before {
  background-image: url('@/static/images/d5.jpg');
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  z-index: 1;
}

.content > * + * {
  margin-top: 1rem;
}

.title {
  font-size: 50px;
  line-height: 1.2;
  font-family: HYShangWei, sans-serif;
}

.copy {
  font-size: 15px;
  font-style: italic;
  line-height: 1.35;
  font-family: google-belanosima, sans-serif;
}

.btn {
  cursor: pointer;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.65rem;
  font-weight: bold;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
  color: white;
  background-color: black;
  border: none;
}

.btn:focus {
  outline: 1px dashed yellow;
  outline-offset: 3px;
}

@media (hover: hover) and (min-width: 600px) {
  .card:after {
    transform: translateY(0);
  }

  .content {
    transform: translateY(calc(100% - 4.5rem));
  }

  .content > *:not(.title) {
    opacity: 0;
    transform: translateY(1rem);
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
  }

  .card:hover, .card:focus-within {
    align-items: center;
  }

  .card:hover:before, .card:focus-within:before {
    transform: translateY(-4%);
  }

  .card:hover:after, .card:focus-within:after {
    transform: translateY(-50%);
  }

  .card:hover .content, .card:focus-within .content {
    transform: translateY(0);
  }

  .card:hover .content > *:not(.title), .card:focus-within .content > *:not(.title) {
    opacity: 1;
    transform: translateY(0);
  }

  .card:focus-within:before, .card:focus-within:after, .card:focus-within .content, .card:focus-within .content > *:not(.title) {
    transition-duration: 0s;
  }
}

</style>