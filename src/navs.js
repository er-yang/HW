// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];
const autoGenAsideNavs = [
  { text: 'page3', to: '/page3', icon: 'nav-list' },
  // { text: 'login', to: '/login', icon: 'nav-list' },
  { text: '视频监控', to: '/page5', icon: 'nav-list' },
  // { text: 'Nav6', to: '/page6', icon: 'nav-list' },
];

// <!-- auto generated navs end -->

const customHeaderNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home',
  },
  {
    text: '反馈',
    to: '',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    text: '帮助',
    to: '',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const customAsideNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home',
  },{
    text: '监控中心',
    to: '/monitorCenter',
    icon: 'yonghu',
  },{
    text: '监控节点',
    to: '/monitorNode',
    icon: 'yonghu',
  },
  {
    text: '系统设置',
    to: '/setting',
    icon: 'shezhi',
    children: [
      {
        text: '权限管理',
        to: '/permission',
      },
      {
        text: '角色管理',
        to: '/role',
      },
    ],
  },
  {
    text: "基础管理",
    icon: "home",
    children: [
      {text: "部门管理",
       to: "department",
       icon: "home"  
    },{
      text: "用户管理",
      to: "user",
      icon: "yonghu"
    },{
    text: '摄像头管理',
    to: '/camera',
    icon: 'yonghu',
    },{
    text: '监控类型',
    to: '/monitorType',
    icon: 'yonghu',
  }
    ]
  },{
    text: "地图集成",
    icon: "home",
    children: [
      {
        text: '地图导航',
        to: '/amap',
        icon: 'yonghu',
    },  {
        text: '事故地点',
        to: '/accidentMap',
        icon: 'yonghu',
    }
    ]
  },{
    text: "事故分析",
    icon: "home",
    children: [
      {
        text: "事故列表",
        to: '/accident',
        icon: 'yonghu',
    },  {
        text: '事故分析',
        to: '/analysis',
        icon: 'yonghu',
    }
    ]
  }

];

function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...autoGenAsideNavs, ...customAsideNavs]);
