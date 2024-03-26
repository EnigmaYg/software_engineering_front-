<template>
  <div class="container">
    <div class="wrapper">
      <div class="grid">
        <div class="item">
          <h1 class="font-belanosima title-extra-large color-apple-wight text-center">Roam Assistant</h1>
          <h5 class="font-belanosima text-large color-apple-wight font-weight-300 text-center">Your personal AI travel
            planner</h5>
          <div class="height-50px bg-wight box-center display-table border-radius-25px">
            <input class="display-table-cell vertical-center text-medium font-belanosima margin-left-20px"
                   placeholder="Where to go..." type="text" v-model="tourPlan.destination"/>
          </div>
          <div class="margin-tb-10px"></div>
          <div class="height-50px bg-wight box-center display-table border-radius-25px">
            <input class="display-table-cell vertical-center text-medium font-belanosima margin-left-20px"
                   placeholder="Where to start..." type="text" v-model="tourPlan.departure"/>
          </div>
          <div class="margin-tb-10px"></div>
          <div class="height-50px bg-wight box-center display-table border-radius-25px">
            <input class="display-table-cell vertical-center text-small font-belanosima margin-left-20px" type="date"
                   v-model="tourPlan.start_time"/>
            <div id="submit" class="height-40px width-60px bg-blue border-radius-20px display-table-cell"
                 @click="submit"><i
                class="icon-airplane color-black vertical-center text-extra-large margin-left-10px"></i></div>
          </div>

        </div>
        <div class="item">
          <div class="globe-total-container">
            <div id="globe-container"></div>
            <div id="globe-shadow"></div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="hidden" id="vertexShader">
    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    void main(){
    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
    }
  </div>

  <div class="hidden" id="fragmentShader">
    uniform sampler2D globeTexture;
    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    void main(){
    float intensity = 1.05 - dot(vertexNormal, vec3(0,0,1));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
    gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
    }
  </div>

  <div class="hidden" id="atmosphereVertexShader">
    varying vec3 vertexNormal;

    void main(){
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.9);
    }
  </div>

  <div class="hidden" id="atmosphereFragmentShader">
    varying vec3 vertexNormal;

    void main(){
    float intensity = pow(0.6 - dot(vertexNormal, vec3(0,0,1.0)), 2.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
    }
  </div>
</template>


<script>
import {onMounted, reactive} from "vue";
import {showEarth} from "@/hooks/earth";
import router from "@/router";
import Swal from "sweetalert2";
import request from '@/hooks/request'
// import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  // components: {LoadingComponent},
  setup() {
    let tourPlan = reactive({
      departure: "",
      destination:"",
      start_time: ""
    })

    function submit() {
      if(tourPlan.departure && tourPlan.destination && tourPlan.start_time){
        request({
          url:'/chat/simpleChat',
          method:'post',
          params: {
            departure: tourPlan.departure,
            destination: tourPlan.destination,
            start_time: tourPlan.start_time
          },
          transformRequest: [function (data) {
            let str = '';
            for (let key in data) {
              str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
            }
            return str;
          }]
        }).then(resp => {
          console.log(resp.data.data)
          localStorage.setItem('departure',tourPlan.departure)
          localStorage.setItem('destination',tourPlan.destination)
          localStorage.setItem('startTime',tourPlan.start_time)
          router.push({
            name:'result',
            query:{
              departure: tourPlan.departure,
              plan: "{\n" +
                  "    \"Information\": {\n" +
                  "        \"text\": \"Singapore is a vibrant island city-state situated in Southeast Asia. With a population of over 5.7 million people, it is known for its efficient governance, stunning skyline, multicultural diversity, and thriving economy.\"\n" +
                  "    },\n" +
                  "    \"TravelPlan\": [\n" +
                  "        {\n" +
                  "            \"Morning\": {\n" +
                  "                       \"text\": \"Start your day with a visit to the iconic Merlion Park, where you can see the famous Merlion statue, a mythical creature with the head of a lion and the body of a fish. Enjoy panoramic views of the city skyline and Marina Bay from this picturesque location.\",\n" +
                  "                       \"link\": \"\",\n" +
                  "                       \"picture\": \"\"\n" +
                  "                                        },\n" +
                  "            \"Lunch_Recommendation\": {\n" +
                  "                       \"text\": \"You can have lunch in 'Jypsy at One Fullerton' near Merlion Park.\",\n" +
                  "                       \"link\": \"https://www.pscafe.com/jypsy-one-fullerton\",\n" +
                  "                       \"picture\": \"https://images.squarespace-cdn.com/content/v1/5326c064e4b011eeaa057a38/1649034099621-OGD8OD3IDRVLCSSNV0F6/DSC05047-4_web.jpg?format=2500w\"\n" +
                  "                                        },\n" +
                  "            \"Afternoon\": {\n" +
                  "                       \"text\": \"Head to the Supertree Grove at Gardens by the Bay, a futuristic park with towering tree-like structures. Explore the various gardens and attractions, such as the Flower Dome and Cloud Forest, and admire the stunning views of the city from the OCBC Skyway.\",\n" +
                  "                       \"link\": \"\",\n" +
                  "                       \"picture\": \"\"\n" +
                  "                                        },\n" +
                  "            \"Dinner_Recommendation\": {\n" +
                  "                       \"text\": \"You can have dinner at 'Marina Bay BBQ Steamboat Buffet' inside Garden by the Bay.\",\n" +
                  "                       \"link\": \"https://www.facebook.com/marinabaysteamboat/\",\n" +
                  "                       \"picture\": \"https://scontent-xsp1-1.xx.fbcdn.net/v/t39.30808-6/300434902_395304186059614_5596346321229426667_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=e3f864&_nc_ohc=O8qbgfw-5dkAX-Crsc9&_nc_ht=scontent-xsp1-1.xx&oh=00_AfC427x1r4eOWoAC55OtVdWGj_xJjSDToN7LvgXUgpnDRg&oe=64B59718\"\n" +
                  "                                        },\n" +
                  "            \"Evening\": {\n" +
                  "                       \"text\": \"Take a leisurely stroll along the Singapore River and enjoy the vibrant atmosphere of Clarke Quay. Indulge in a delicious dinner at one of the riverside restaurants and take a river cruise to see the cityscape illuminated at night.\",\n" +
                  "                       \"link\": \"\",\n" +
                  "                       \"picture\": \"\"\n" +
                  "                                        },\n" +
                  "            \"Bedtime\": {\n" +
                  "                       \"text\": \"You can find amazing hotels here.\",\n" +
                  "                       \"link\": \"https://www.kayak.sg/hotels/Singapore/2023-07-12/2023-07-16?sort=rank_a\",\n" +
                  "                       \"picture\": \"\"\n" +
                  "                                        }\n" +
                  "        }\n" +
                  "    ],\n" +
                  "    \"Additional_Information\": {\n" +
                  "        \"Emergency Number\": \"The emergency number in Singapore is 995. This number should be dialed in case of a medical emergency or when an ambulance is needed. When you call 995, you will be connected to the Singapore Civil Defence Force (SCDF) Emergency Medical Services, and they will dispatch an ambulance to your location.\",\n" +
                  "        \"Police Number\": \"For other emergencies such as police assistance or fire-related emergencies, you can dial 999\",\n" +
                  "        \"Weather Condition\": \"summer in Singapore is characterized by occasional rain showers and thunderstorms. These rain showers can be heavy and brief, providing temporary relief from the heat. It's advisable to carry an umbrella or raincoat when exploring the city during the summer season.\"\n" +
                  "    }\n" +
                  "}"
            }
          })
        })
      } else{
        Swal.fire({
          icon: 'question',
          title: 'Uhhhh?',
          text: 'Incomplete Info',
          confirmButtonText: 'OK'
        })
      }


    }

    onMounted(() => {
      showEarth();
    })
    return {
      tourPlan,
      submit,
    }
  }
}
</script>
<style scoped>
@import "@/static/css/basic.css";

#globe-container {
  margin: 0 auto;
  width: fit-content;
}

#globe-shadow {
  width: 200px;
  height: 10px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.019);
  margin: 0 auto;
}

.hidden {
  display: none;
}

.grid {
  display: flex;
  align-items: center;
}

.item {
  flex: 0 0 50%;
}


.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

#submit:hover {
  cursor: pointer;
  background-color: rgb(77, 136, 231);
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
}

#submit:hover i {
  margin-left: 40px;
  transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
}

input {
  background: none !important;
  outline: none !important;
  border: none !important;
}
</style>