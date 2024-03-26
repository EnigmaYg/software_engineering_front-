<template>
  <div id="root">
    <div id="cardContainer" :class="[active===true?'active':'inactive']" @click="handleActive(!active)">
      <div id="firstDisplay">
        <div id="flightDetail">
          <div id="detailLabel" style="font-weight:bold; color: rgb(13, 28, 83)">From</div>
          {{flight.departure}}
          <div id="detailLabel">{{ flight.departure_airport }}</div>
        </div>
        <div id="flightDetail" style="margin-top:15px">
          <div id="animContainer">
            <div id="anim">
              <div id="circle"/>
              <div id="circle"/>
              <div id="circle"/>
            </div>
          </div>
          <div id="animContainer" style="left:62px">
            <div id="anim">
              <div id="circle"/>
              <div id="circle"/>
              <div id="circle"/>
            </div>
          </div>
          <div class="text-center">
            <img style="width:30px" src="../static/images/flight.png"/>
          </div>

        </div>
        <div id="flightDetail">
          <div id="detailLabel" style="font-weight:bold; color: rgb(13, 28, 83)">To</div>
          {{flight.destination}}
          <div id="detailLabel">{{flight.dest_airport}}</div>
        </div>
      </div>
      <div id="first" :class="[active ?'first-active':'first-inactive']">
        <div id="firstTop">
          <img style="height: 51px;margin:22px 12px" src="../static/images/Lufthansa-Logo.webp"/>
          <div id="timecontainer">
            <div id="detailDate">
              {{ flight.departure }}
              <div id="detailTime">{{flight.take_off_time}}</div>
              {{ flight.take_off_date }}
            </div>
            <img style="width:30px;height: 26px; margin-top: 22px; margin-left: 16px; margin-right: 16px"
                 src="../static/images/flight.png"/>
            <div id="detailDate">
              {{ flight.destination }}
              <div id="detailTime">{{ flight.land_time}}</div>
              {{ flight.land_date}}
            </div>
          </div>
        </div>
        <div id="firstBehind">
          <div id="firstBehindDisplay">
            <div id="firstBehindRow">
              <div id="detail">
                {{flight.take_off_time}} - {{ flight.land_time}}
                <div id="detailLabel">Flight Time</div>
              </div>
              <div id="detail">
                {{ flight.transfer}}
                <div id="detailLabel">Transfer</div>
              </div>
            </div>
            <div id="firstBehindRow">
              <div id="detail">
                {{ flight.duration[0] }} h {{flight.duration[1]}} m
                <div id="detailLabel">Duration</div>
              </div>
              <div id="detail">
                \
                <div id="detailLabel">Gate</div>
              </div>
            </div>
            <div id="firstBehindRow">
              <div id="detail">
                \
                <div id="detailLabel">Boarding</div>
              </div>
              <div id="detail">
                \
                <div id="detailLabel">Seat</div>
              </div>
            </div>
          </div>
          <div id="second" :class="[active ?'second-active':'second-inactive']">
            <div id="secondTop"/>
            <div id="secondBehind">
              <div id="secondBehindDisplay">
                <div id="price">
                  {{$props.Flight.price}}
                  <div id="priceLabel">Price</div>
                </div>
                <div id="price">
                  {{ $props.Flight.clazz }}
                  <div id="priceLabel">Class</div>
                </div>
                <img
                    id="barCode"
                    src="../static/images/barcode.png"
                />
              </div>
              <div id="third" :class="[active===true?'third-active':'third-inactive']">
                <div id="thirdTop"/>
                <div id="secondBehindBottom">
                  <div id="button" @click="pay">More
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {reactive, ref} from "vue";
import axios from "axios";

export default {
  props:{
    Flight:{
      departure: String,
      departure_airport: String,
      destination: String,
      dest_airport: String,
      take_off_time: String,
      take_off_date: String,
      land_time: String,
      land_date: String,
      transfer: String,
      price: String,
      clazz: String,
    }
  },
  setup() {
    const departure = localStorage.getItem('departure')
    const destination = localStorage.getItem('destination')
    const start_time = localStorage.getItem('startTime')
    let active = ref(false)
    let flight = reactive({
      departure: '',
      departure_airport: '',
      destination: null,
      dest_airport: '',
      take_off_time: '',
      take_off_date: '',
      land_time: '',
      land_date: '',
      duration:'',
      transfer: '\\',
      price: '\\',
      clazz: 'Economic',
    })
    axios({
      method: 'GET',
      url: 'http://172.25.100.193:5000/flights/departure='+departure+'&destination='+destination+'&'+start_time,
    }).then(resp=>{
      let index = Math.random() * resp.data.length | 0
      let f = resp.data[index]
      console.log(f)
      flight.departure = f.departure
      flight.departure_airport = f.departure_airport
      flight.destination = f.destination
      flight.dest_airport = f.destination_airport
      flight.take_off_date = f.take_off_date
      flight.take_off_time = f.take_off_time
      flight.land_date = f.take_off_date
      flight.land_time = f.land_time
      flight.duration = getDuration(f.land_time, f.take_off_time)
    })
    function handleActive(a){
      active.value = a
    }

    function getDuration(land, takeOff){
      let l = land.split(":")
      let t = takeOff.split(":")
      let hour = l[0] - t[0]
      let minute = l[1] - t[1]
      if (minute < 0){
        hour -= 1
        minute += 60
      }
      return [hour,minute]
    }

    return {
      active,
      flight,
      handleActive
    }
  }
}
</script>

<style scoped>
.active{
  height:300px;
  transition: all 0.9s ease-in-out;
  -webkit-transition: all 0.9s ease-in-out;
  -moz-transition: all 0.9s ease-in-out;
  -ms-transition: all 0.9s ease-in-out;
  -o-transition: all 0.9s ease-in-out;
}

.inactive{
  height: 100px;
  transition: all 0.9s ease-in-out;
  -webkit-transition: all 0.9s ease-in-out;
  -moz-transition: all 0.9s ease-in-out;
  -ms-transition: all 0.9s ease-in-out;
  -o-transition: all 0.9s ease-in-out;
}

.first-active{
  transform: rotate3d(1, 0, 0, -180deg);
  transition-delay: 0s!important;
}

.first-inactive{
  transform: rotate3d(1, 0, 0, 0deg);
  transition-delay: 0.3s!important;
}

.second-active{
  transform: rotate3d(1, 0, 0, -180deg);
  transition-delay: 0.2s!important;
}

.second-inactive{
  transform: rotate3d(1, 0, 0, 0deg);
  transition-delay: 0.2s!important;
}

.third-active{
  transform: rotate3d(1, 0, 0, -180deg);
  transition-delay: 0.4s!important;
}

.third-inactive{
  transform: rotate3d(1, 0, 0, 0deg);
  transition-delay: 0s!important;
}

* {
  box-sizing: border-box;
  perspective: 700px;
  font-family: Roboto-Regular, HelveticaNeue, Arial, sans-serif;
}

#root {
  align-items: center;
  justify-content: center;
}

#cardContainer {
  position: relative;
  width: 340px;
  /* background: rgb(194, 194, 194); */
  border-radius: 5px;
  transform-origin: bottom;
  margin: 20px;
  cursor: pointer;
}

#first {
  width: 340px;
  height: 100px;
  position: absolute;
  border-radius: 5px;
  color: #000;
  transform-origin: bottom;
  transform-style: preserve-3d;
  transition: 0.5s;
  border-radius: 8px;
  display: flex;
  /* backface-visibility: hidden; */
}

#detailDate {
  color: #a09a9a;
  font-size: 9px;
  padding-top: 11px;
}

#detailTime {
  font-weight: bold;
  font-size: 21px;
  color: #000;
}

#detailSub {
  width: 200px;
  height: 100px;
  position: relative;
  border-radius: 0px 8px 8px 0px;
  background: #0a0a0a;
}
#firstDisplay {
  width: 100%;
  height: 100px;
  position: absolute;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 18px 23px;
  flex-wrap: wrap;
  backface-visibility: hidden;
  box-shadow: 0px 0px 25px -1px rgba(0, 0, 0, 0.17);
}

#info {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #b2b2b2;
  font-size: 10px;
}

#flightDetail {
  font-size: 23px;
  font-weight: bold;
  color: #3f3f3f;
  flex: 0.5;
}

#animContainer {
  padding-left: 0px;
  position: absolute;
  width: 19px;
  height: 10px;
  top: 10px;
  left: 15px;
  overflow: hidden;
}

#anim {
  width: 54px;
  position: absolute;
  display: flex;
  animation: slidein 1s infinite linear;
}

@keyframes slidein {
  to {
    transform: translateX(-18px);
  }

  from {
    transform: translateX(0px);
  }
}

#circle {
  width: 5px;
  height: 5px;
  background: #707070;
  border-radius: 50%;
  margin-right: 13px;
}
#firstTop {
  width: 340px;
  height: 100px;
  position: absolute;
  background: #ffffff;
  backface-visibility: hidden;
  border-radius: 8px;
  border-radius: 8px;
  box-shadow: 0px 0px 3px 0px rgba(132, 132, 132, 0.15);
  display: flex;
  justify-content: space-around;
}

#timecontainer {
  display: flex;
  padding-right: 10px;
  padding-top: 14px;
}

#firstBehind {
  width: 340px;
  height: 100px;
  position: absolute;
  background: #fff;
  transform-origin: center;
  transform: rotate3d(1, 0, 0, -180deg);
  backface-visibility: hidden;
  border-radius: 8px;
  border: 1px dashed #d1d1d1;
  border-left: none;
  border-right: none;
}

#firstBehindDisplay {
  width: 100%;
  height: 101px;
  position: absolute;
  background: #fff;
  border-radius: 8px;
  padding: 12px 23px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 11px 25px -1px rgba(0, 0, 0, 0.17);
}

#firstBehindRow {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 7px;
  text-align: left;
}

#detail {
  font-size: 15px;
  color: rgb(69, 69, 69);
  font-weight: bold;
}

#detailLabel {
  color: #686868;
  font-size: 10px;
  font-weight: 100;
}

#second {
  width: 340px;
  height: 50px;
  position: absolute;
  bottom: -2px;
  transform-origin: bottom;
  transform-style: preserve-3d;
  transition: 0.2s;
  border-radius: 8px;
}

#secondTop {
  width: 340px;
  height: 50px;
  position: absolute;
  background: rgb(231, 231, 231);
  backface-visibility: hidden;
  border-radius: 8px;
}

#thirdTop {
  width: 340px;
  height: 50px;
  position: absolute;
  background: rgb(190, 190, 190);
  backface-visibility: hidden;
  border-radius: 8px;
}

#secondBehind {
  width: 340px;
  height: 50px;
  position: absolute;
  background: #fff;
  transform-origin: center;
  transform: rotate3d(1, 0, 0, -180deg);
  backface-visibility: hidden;
  border-radius: 8px;
  border: 1px dashed #d1d1d1;
  border-left: none;
  border-right: none;
}

#secondBehindDisplay {
  width: 100%;
  height: 50px;
  position: absolute;
  background: #fff;
  border-radius: 8px;
  border-bottom: 1px dashed #d1d1d1;
  display: flex;
  justify-content: space-between;
  padding: 10px 23px;
  box-shadow: 0px 11px 25px -1px rgba(0, 0, 0, 0.17);
}

#secondBehindBottom {
  width: 340px;
  height: 50px;
  position: absolute;
  background: #fff;
  transform-origin: center;
  transform: rotate3d(1, 0, 0, -180deg);
  backface-visibility: hidden;
  border-radius: 0px 0px 8px 8px;
  border-radius: 8px;
  box-shadow: 0px 11px 25px -1px rgba(0, 0, 0, 0.17);
}

#third {
  width: 340px;
  height: 50px;
  position: absolute;
  transform-origin: bottom;
  transform-style: preserve-3d;
  transition: 0.2s;
  border-radius: 8px;
}
/*style="color: rgb(13, 28, 83); border:1px solid rgb(13, 28, 83); width:80%; margin:0 auto;"*/
#button {
  width:80%;
  color: rgb(13, 28, 83);
  font-size: 19px;
  font-weight: bold;
  padding: 4px 124px;
  border:1px solid rgb(13, 28, 83);
  background: #fff;
  border-radius: 4px;
  margin:9px auto;
}
#button:hover{
  background-color: rgb(13, 28, 83);
  color:rgb(255,255,255);
}

#price {
  color: #2d2d2d;
  font-weight: bold;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  margin-top: -2px;
}

#priceLabel {
  color: #747474;
  font-weight: 100;
  font-size: 10px;
  text-align: left;
}

#barCode {
  width: 98px;
  height: 30px;
}

</style>