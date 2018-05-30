import React from 'react'
import ReactDOM from 'react-dom';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@icedesign/base/reset.scss';
import routes from './routes';
import axios from 'axios';
axios.interceptors.request.use(config => {
    var token = localStorage.getItem("token");
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = token;
        console.log('interceptors config=',config)
    }
    return config
}, error => {
    return Promise.reject(error)
})
// 以下代码 ICE 自动生成, 请勿修改
const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

ReactDOM.render(routes, ICE_CONTAINER);
