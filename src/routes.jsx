/**
 * 定义应用路由
 */
import React from 'react';
import {
  Router,
  // browserHistory,
  hashHistory,
} from 'react-router';

// 路由配置规则参考： https://github.com/ReactTraining/react-router/blob/v3/docs/guides/RouteConfiguration.md#configuration-with-plain-routes
// 一下部分是由 ICE 相关工具自动生成的路由，请勿随意改变，否则可能会出现一些异常情况
// <!-- auto generated routes start -->
import Page6 from './pages/Page6';
import Page5 from './pages/Page5';
import HeaderAsideFooterLayout from './layouts/HeaderAsideFooterLayout';
import Home from './pages/Home';
import HeaderFooterLayout from './layouts/HeaderFooterLayout';
import NotFound from './pages/NotFound';
import HeaderAsideFooterResponsiveLayout from './layouts/HeaderAsideFooterResponsiveLayout';
import Page3 from './pages/Page3';
import Login from './pages/Login';
const autoGeneratedRoutes = [{
  path: 'page6',
  childRoutes: [],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    component: Page6
  }
}, {
  path: 'page5',
  childRoutes: [],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    component: Page5
  }
}, {
  path: '/login',
  childRoutes: [],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    component: Login
  }
}, {
  path: '/page3',
  childRoutes: [],
  component: HeaderAsideFooterResponsiveLayout,
  indexRoute: {
    component: Page3
  }
}, {
  path: '/',
  childRoutes: [{
    path: '*',
    childRoutes: [],
    component: NotFound
  }],
  component: HeaderAsideFooterLayout,
  indexRoute: {
    component: Home
  }
}];
// <!-- auto generated routes end -->

// 自定义路由，如果 path 相同则会覆盖自动生成部分的路由配置
const customRoutes = [];

export default (
  <Router
    history={hashHistory}
    routes={[...autoGeneratedRoutes, ...customRoutes]}
  />
);
