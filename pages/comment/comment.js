Page({
  data: {
    talks: [],
    touchStart: 0,
    inputValue: '',
    inputBiaoqing: '',
    faces: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535727304160&di=0cc9d01a4ae2deca5634c3136d5c01f6&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201406%2F12%2F20140612202753_u4nG5.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535727304159&di=da2c1c4e868ee95f3cd65ffc6e24a456&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201505%2F01%2F20150501083603_yuTQc.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535727304156&di=7d46a1482a8e798a70d8d52320285b02&imgtype=0&src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F7b%2Ff9%2F01%2F7bf901db9091dff00a20d474c83afc45.jpg'],
    names: ['匿名']
  },

  onLoad: function () {
    var em = {},
      that = this,
      emChar = that.data.emojiChar.split("-");
    that.data.emoji.forEach(function (v, i) {
      em = {
        char: emChar[i],
      };
    });
  },
  //解决滑动穿透问题
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

  // 加载数据
  loadTalks: function () {
    // 随机产生一些评论
    wx.showNavigationBarLoading();
    let that = this;
    let talks = [];
    let faces = ['https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1535701703&di=bfde939cc559b0f8edcbfd1adb6e667d&src=http://img5q.duitang.com/uploads/item/201505/15/20150515205520_iWF2U.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535711703167&di=ce7a08b889137a70f7b4568e13df0e4d&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F6f061d950a7b02088811236964d9f2d3562cc85a.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535711703162&di=8ec21b75cb44de532f8be29300f075b0&imgtype=0&src=http%3A%2F%2Fpic36.photophoto.cn%2F20150710%2F0005018347189196_b.jpg',
    ];
    let names = ['匿名'];
    let contents = ['这个小程序不错，学到了很多菜', '烤鳗鱼很好吃！！！', '终于会做东坡肉了', '晚餐就从这里找了','哈哈哈哈','菜系再多一点就好了','打发了我无聊的时间，哈哈哈','强力推荐松鼠鱼','甜品甜品甜品','强力推荐这个小程序'];
    let talktime = '刚刚';
    console.log(talktime)
    talks = talks.concat(that.data.talks);

    // 随机产生10条评论
    for (var i = 0; i < 10; i++) {
      talks.push({
        avatarUrl: faces[Math.floor(Math.random() * faces.length)],
        nickName: names[Math.floor(Math.random() * names.length)],
        content: contents[Math.floor(Math.random() * contents.length)],
        talkTime: talktime
      });
    }
    this.setData({
      talks: talks,
      talksAnimationData: that.animation.export()
    })
    wx.hideNavigationBarLoading();
  },

  onScrollLoad: function () {
    // 加载新的数据
    this.loadTalks();
  },
  //下拉评论框隐藏
  touchStart: function (e) {
    let touchStart = e.touches[0].clientY;
    this.setData({
      touchStart,
    })
  },
  touchMove: function (e) {
    // console.log(this.data.touchStart)
    let touchLength = e.touches[0].clientY - this.data.touchStart;
    console.log(touchLength - 100)
    if (touchLength > 100) {
      this.animation.bottom("-100%").height("0rpx").step()
      this.setData({
        talks: [],
        talksAnimationData: this.animation.export(),
      })
    }
  },
  //输入框失去焦点时触发
  bindInputBlur: function (e) {
    console.log(e)
    console.log(this.data.inputBiaoqing)
    this.data.inputValue = e.detail.value + this.data.inputBiaoqing;
  },
  //点击发布，发布评论
  faBu: function () {
    let that = this;
    this.data.talks.unshift({
      avatarUrl: this.data.faces[Math.floor(Math.random() * this.data.faces.length)],
      nickName: this.data.names[Math.floor(Math.random() * this.data.names.length)],
      content: this.data.inputValue,
      talkTime: '刚刚'
    })
    that.data.inputValue = '';
    that.setData({
      talks: that.data.talks,
      inputValue: that.data.inputValue,
      talksAnimationData: that.animation.export()
    })

  }
})