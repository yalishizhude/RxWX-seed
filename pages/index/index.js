//index.js
//获取应用实例
import rxwx from '../../utils/RxWX.js'
const app = getApp()

let page = {
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      rxwx.canIUse('button.open-type.getUserInfo')
        .do(canIUse => this.setData({ canIUse }))
        .switchMap(userInfoCached => userInfoCached ? app.userInfoReady() : rxwx.getUserInfo())
        .subscribe(res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
}

//事件处理函数
rxwx.fromEvent(page, 'bindViewTap')
  .switchMap(() => rxwx.navigateTo({
    url: '../logs/logs',
  }))
  .subscribe()

Page(page)
