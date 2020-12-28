import Vue from "vue"
//全局引入swiper样式
import "swiper/swiper-bundle.min.css"
//全局组件的注册
import TypeNav from "components/TypeNav/TypeNav"
Vue.component("TypeNav",TypeNav)

import Carousel from "components/Carousel/Carousel"
Vue.component("Carousel",Carousel)

import {Pagination} from 'element-ui';
Vue.component(Pagination.name, Pagination);

import OrderButton from "components/OrderButton/OrderButton"
Vue.component("OrderButton",OrderButton)


