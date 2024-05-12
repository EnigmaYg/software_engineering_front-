// export function processData(daily_plan_list,information,additional_info, plan_from_backEnd){
//     console.log(plan_from_backEnd);
//     let jsonObject = JSON.parse(plan_from_backEnd);
//     console.log(jsonObject)
//     let plan = jsonObject.TravelPlan
//     let keys = Object.keys(plan)
//     console.log(keys)
//     for(let i = 0; i < keys.length; i++){
//         daily_plan_list.push(plan[keys[i]])
//     }
//     information.value = jsonObject.Information['text']
//     let add_info = jsonObject.Additional_Information
//     keys = Object.keys(add_info)
//     for(let i = 0; i < keys.length; i++){
//         additional_info.push(add_info[keys[i]])
//     }
// }
export function processData(daily_plan_list,information,additional_info, plan_from_backEnd) {
    console.log(plan_from_backEnd);
  const jsonObject = JSON.parse(plan_from_backEnd);
  let plan = jsonObject.Travel_Plans;
  let keys = Object.keys(plan);

  for(let i = 0; i < keys.length; i++){
      let attractions = plan[keys[i]].Attraction_List;

      let travelPlan = {
        index: i,
        "Morning": [],
        "Lunch Recommendation": [],
        "Afternoon": [],
        "Dinner Recommendation": [],
        "Evening": [],
        "Bedtime": []
      };

      let flag = 0;
      if (attractions.length > 3){
          flag = 1;
      }else if(attractions.length === 2){
          travelPlan["Evening"] = [{
              "details_url": "",
              "imgsrc": "",
              "information": "The previous attractions are great, you may need more time to explore."
          }];
      }else if(attractions.length === 1){
          travelPlan["Evening"] = [{
              "details_url": "",
              "imgsrc": "",
              "information": "The previous attractions are great, you may need more time to explore."
          }];
          travelPlan["Afternoon"] = [{
              "details_url": "",
              "imgsrc": "",
              "information": "The previous attractions are great, you may need more time to explore."
          }];
      }
      for (let j = 0; j < attractions.length; j++){
          if(flag === 0){
              if(j === 0){
                  travelPlan["Morning"] = [attractions[j]];
              }else if(j === 1){
                  travelPlan["Afternoon"] = [attractions[j]];
              }else{
                  travelPlan["Evening"] = [attractions[j]];
              }
          }else{
              if(j === 0 || j === 1){
                  travelPlan["Morning"].push(attractions[j]);
              }else if(j === 2){
                  travelPlan["Afternoon"] = [attractions[j]];
              }else{
                  travelPlan["Evening"] = [attractions[j]];
              }
          }
      }
      travelPlan["Lunch Recommendation"] = [{
              "details_url": "https://www.pscafe.com/jypsy-one-fullerton",
              "imgsrc": "https://images.squarespace-cdn.com/content/v1/5326c064e4b011eeaa057a38/1649034099621-OGD8OD3IDRVLCSSNV0F6/DSC05047-4_web.jpg?format=2500w",
              "information": "You can have lunch in 'Jypsy at One Fullerton' near Merlion Park."
          }];
      travelPlan["Dinner Recommendation"] = [{
              "details_url": "https://www.facebook.com/marinabaysteamboat/",
              "imgsrc": "https://scontent-xsp1-1.xx.fbcdn.net/v/t39.30808-6/300434902_395304186059614_5596346321229426667_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=e3f864&_nc_ohc=O8qbgfw-5dkAX-Crsc9&_nc_ht=scontent-xsp1-1.xx&oh=00_AfC427x1r4eOWoAC55OtVdWGj_xJjSDToN7LvgXUgpnDRg&oe=64B59718",
              "information": "You can have dinner at 'Marina Bay BBQ Steamboat Buffet' inside Garden by the Bay."
          }];
      travelPlan["Bedtime"] = [{
              "details_url": "",
              "imgsrc": "",
              "information": "\u5317\u4eac\u5174\u57fa\u94c2\u5c14\u66fc\u996d\u5e97"
          }];
      daily_plan_list.push(travelPlan);
  }
  information.value = jsonObject.City_Introduction;
  let add_info = jsonObject.Additional_Information;
  keys = Object.keys(add_info);
  // for(let i = 0; i < keys.length; i++){
  //     let str1 = 'The emergency number in Singapore is' + add_info[keys[i]] +'.'
  //     additional_info.push(str1)
  // }
  let str1 = 'The emergency number in Singapore is ' + add_info[keys[0]] +'.';
  additional_info.push(str1);
  let str2 = 'For other emergencies such as police assistance or fire-related emergencies, you can dial ' + add_info[keys[1]] +'.';
  additional_info.push(str2)

}
