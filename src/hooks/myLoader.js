import {createApp} from "vue";
import loadingComponent from "@/components/LoadingComponent.vue";
let myLoader

export function showMyLoader() {
    console.log("挂载loader")
    // 挂载组件
    myLoader = createApp(loadingComponent)
    let parentNode = document.createElement('div')
    parentNode.id = "loader"
    document.body.appendChild(parentNode)
    myLoader.mount(parentNode)
}
export function unMountedLoader(){
    console.log("卸载loader")
    // 卸载组件
    myLoader.unmount()
    let parentNode = document.getElementById("loader")
    document.body.removeChild(parentNode)

}
