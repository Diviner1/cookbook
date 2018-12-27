const app = getApp();

// pages/details/details.js
Page({
    data: {
        details: {}
    },
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
        wx.showLoading({
            title:'请稍等..'
        })
        wx.request({
            url: `${app.globalData.url}?key=${app.globalData.key}&id=${options.id}`,
            method: 'GET',
            success: res => {
                wx.hideLoading()
                this.data.details = res.data.result.data[0];

                this.setData({
                    details: {
                        ...this.data.details,
                        burden: this.data.details.burden.split(';'),
                        albums: [this.data.details.albums[0].replace(/\:/, 's:')],
                        steps: this.data.details.steps.map(item => {
                            return {
                                ...item,
                                step: item.step.slice(2),
                                img: item.img.replace(/\:/, 's:')
                            };
                        })
                    }
                });
            }
        });
    },
  listenerButtonPlay: function () {
    wx.playBackgroundAudio({
      dataUrl: 'http://223.111.154.144/amobile.music.tc.qq.com/C400001KxFBr3ZrMIk.m4a?guid=1913030236&amp;vkey=D65E485E99A511EA5523E7CED100ACDD7CCC8596111449702BE75308F50E1AFBDF0062835463D0ED501A895C0DE1E5560D338638028E5E63&amp;uin=0&amp;fromtag=66',
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
  emojiScroll: function (e) {
    console.log(e)
  },
  onReady: function () {
    // 评论弹出层动画创建
    this.animation = wx.createAnimation({
      duration: 400, // 整个动画过程花费的时间，单位为毫秒
      timingFunction: "ease", // 动画的类型
      delay: 0 // 动画延迟参数
    })
  },
  showTalks: function () {
    // 加载数据
    this.loadTalks();
    // 设置动画内容为：使用绝对定位显示区域，高度变为100%
    this.animation.bottom("0rpx").height("100%").step()
    this.setData({
      talksAnimationData: this.animation.export()
    })
  },

  hideTalks: function () {
    // 设置动画内容为：使用绝对定位隐藏整个区域，高度变为0
    this.animation.bottom("-100%").height("0rpx").step()
    this.setData({
      talks: [],
      talksAnimationData: this.animation.export()
    })
  },
  commentButtonPlay: function (event) {
    var id = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../comment/comment?id=' + id
    })
  },
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
