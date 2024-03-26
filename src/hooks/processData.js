export function processData(daily_plan_list,information,additional_info, plan_from_backEnd){
    let jsonObject = JSON.parse(plan_from_backEnd);
    let plan = jsonObject.TravelPlan
    let keys = Object.keys(plan)
    for(let i = 0; i < keys.length; i++){
        daily_plan_list.push(plan[keys[i]])
    }
    information.value = jsonObject.Information['text']
    let add_info = jsonObject.Additional_Information
    keys = Object.keys(add_info)
    for(let i = 0; i < keys.length; i++){
        additional_info.push(add_info[keys[i]])
    }
}