//logs.js
import util from '../../utils/util.js'
import rxwx from '../../utils/RxWX.js'

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    rxwx.getStorageSync('logs')
      .subscribe(logs => {
        logs = logs || []
        logs.map(log => util.formatTime(new Date(log)))
        this.setData({ logs })
      })
  }
})
