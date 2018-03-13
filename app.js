//app.js
import rxwx, {Rx} from './utils/RxWX.js'

let subject = new Rx.Subject()
App({
  userInfoReady: () => subject,
  onLaunch: function () {
    // 展示本地存储能力
    rxwx.getStorageSync('logs')
      .map(logs => {
        logs = logs || []
        logs.unshift(Date.now())
        return logs
      })
      .switchMap(logs => {
        return rxwx.setStorageSync('logs', logs)
      })
      .subscribe()
    // 登录
    rxwx.login().subscribe(res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
    })
    // 获取用户信息
    let userInfoAvailable = rxwx.getSetting()
      .partition(res => res.authSetting['scope.userInfo']) 
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    userInfoAvailable[0]
      .switchMap(() => rxwx.getUserInfo())
      .subscribe(res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        subject.next(res)
        subject.complete()
      })
  },
  globalData: {
    userInfo: null
  }
})