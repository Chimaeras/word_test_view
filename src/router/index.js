import Vue from 'vue'
import VueRouter from "vue-router";


import home from "@/components/home";
import test_page from "@/components/test_page";


export default new VueRouter( {
    routes: [
        {
            path: '/' ,
            name: "home" ,
            component: home ,
        } ,
        {
            path: '/test_page' ,
            name: "test_page" ,
            component: test_page ,
            meta: {
                keepAlive: true
            }
        }
    ]
} )

Vue.use( VueRouter )
