const app = getApp();

// pages/my/my.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false
    },

    getUserInfo: function(e) {
        if (!e.detail.userInfo) {
            return;
        }
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    },

    aboutProgram() {
        wx.showModal({
            title: '食谱指南',
            content: '致力于为用户提供优质的食谱指南服务，特色是食谱推荐功能，是选择困难症者的福音哦！'
        });
    },

  listenerButtonPlay: function () {
    wx.playBackgroundAudio({
      dataUrl: 'http://dl.stream.qqmusic.qq.com/C400001KxFBr3ZrMIk.m4a?guid=1913030236&vkey=3C48400EBDF1266CF53C5BE7981543563C9B82DD2E037A59D5DB67495A2B353BB19C2B19F650945D8FA5857B0D6C32C965FEDECF8F0FAAD9&uin=0&fromtag=66',
      title: '生僻字',
      author: "陈柯宇"
    })
  },
  //监听button暂停按钮
  listenerButtonPause: function () {
    wx.pauseBackgroundAudio({

    });
    console.log('暂停播放')
  },
  listenerButtonStop: function () {
    wx.stopBackgroundAudio({

    })
    console.log('停止播放')
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
        }
      wx.onBackgroundAudioPlay(function () {
        // callback
        console.log('onBackgroundAudioPlay')
      })
      /**
       * 监听音乐暂停
       */
      wx.onBackgroundAudioPause(function () {
        // callback
        console.log('onBackgroundAudioPause')
      })
      /**
       * 监听音乐停止
       */
      wx.onBackgroundAudioStop(function () {
        // callback
        console.log('onBackgroundAudioStop')
      })
    },
    

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
});
