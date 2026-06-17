export default defineAppConfig({
  pages: [
    'pages/booking/index',
    'pages/introduction/index',
    'pages/experience/index',
    'pages/mine/index',
    'pages/dining/index',
    'pages/activities/index',
    'pages/refund/index',
    'pages/statistics/index',
    'pages/roomDetail/index',
    'pages/bookingConfirm/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#B8860B',
    navigationBarTitleText: '土楼民宿',
    navigationBarTextStyle: 'white',
    backgroundColor: '#FFF8E7'
  },
  tabBar: {
    color: '#8D6E63',
    selectedColor: '#B8860B',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/booking/index',
        text: '房态预订'
      },
      {
        pagePath: 'pages/introduction/index',
        text: '土楼介绍'
      },
      {
        pagePath: 'pages/experience/index',
        text: '文化体验'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
