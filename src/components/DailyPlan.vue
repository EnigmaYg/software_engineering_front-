<template>
  <div class="one-day-plan">
    <h1 class="color-black font-belanosima text-center">Day: {{$props.index + 1}}</h1>
    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>
    <div class="timeline">
      <el-scrollbar height="500px">
        <el-timeline>
          <el-timeline-item color="rgb(151, 190, 243)" center placement="top">
            <el-card>
              <img src="../static/images/太阳日出.png" width="30"/>
              <h4>Morning</h4>
              <p>{{$props.formalized_plan['Morning'].text}}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item color="rgb(151, 190, 243)" center timestamp="2018/4/3" placement="top">
            <el-card>
              <img src="../static/images/米饭.png" width="30"/>
              <h4>Lunch Recommendation</h4>
              <p>{{$props.formalized_plan['Lunch_Recommendation'].text}}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item color="rgb(151, 190, 243)" center timestamp="2018/4/3" placement="top">
            <el-card>
              <img src="../static/images/太阳.png" width="30"/>
              <h4>Afternoon</h4>
              <p>{{$props.formalized_plan['Afternoon'].text}}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item color="rgb(151, 190, 243)" center timestamp="2018/4/3" placement="top">
            <el-card>
              <img src="../static/images/面条.png" width="30"/>
              <h4>Dinner Recommendation</h4>
              <p>{{$props.formalized_plan['Dinner_Recommendation'].text}}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item color="rgb(151, 190, 243)" center timestamp="2018/4/2" placement="top">
            <el-card>
              <img src="../static/images/月亮.png" width="30"/>
              <h4>Evening</h4>
              <p>{{$props.formalized_plan['Evening'].text}}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item color="rgb(151, 190, 243)" center timestamp="2018/4/3" placement="top">
            <el-card>
              <img src="../static/images/睡觉、床、休息.png" width="30"/>
              <h4>Bedtime</h4>
              <p>{{$props.formalized_plan['Bedtime'].text}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>

import {StarFilled} from "@element-plus/icons-vue";

export default {
  components: {StarFilled},
  props: {
    formalized_plan: Object,
    index: Number
  },
  setup() {
    return {}
  },
}
</script>
<style scoped>
@import "@/static/css/basic.css";


.list-group-item, .list-group-item i {
  width: 95%;
  background-color: white;
  text-align: center;
  border-radius: 20px;
  font-size: 16px;
  line-height: 23px;
  margin: 10px auto;
  color: black;
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
}

.one-day-plan {
  width: 100%;
  padding: 5px 0;
  margin: 0 auto;
  background-color: white;
  border-radius: 20px;
}
.timeline{
  width: 90%;
  margin: 15px auto;
}
</style>