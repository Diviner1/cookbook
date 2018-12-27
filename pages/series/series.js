const app = getApp();

// pages/series/series.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        result: [
            {
                imgUrl: '/images/post/post-2@text.jpg',
                name: '日本料理',
                cid: '17'
            },
            {
                imgUrl: '/images/post/post-1@text.jpg',
                name: '浙菜',
                cid: '102'
            },
            {
              imgUrl: '/images/post/post-1.jpg',
                name: '意大利菜',
                cid: '124'
            },
            {
                imgUrl: '/images/post/post-3@text.jpg',
                name: '法国菜',
                cid: '125'
            },
          {
            imgUrl: 'https://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/t/8/7464_346208.jpg',
            name: '川菜',
            cid: '10'
          },
          {
            imgUrl: 'https://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/t/8/8020_985818.jpg',
            name: '粤菜',
            cid: '11'
          },
          {
            imgUrl: 'https://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/t/9/8593_519739.jpg',
            name: '湘菜',
            cid: '12'
          },
          {
            imgUrl: 'https://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/t/9/8817_454863.jpg',
            name: '鲁菜',
            cid: '13'
          },
          {
            imgUrl: 'https://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/t/9/8983_673345.jpg',
            name: '京菜',
            cid: '14'
          },
          {
            imgUrl: 'https://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/t/10/9187_613117.jpg',
            name: '东北菜',
            cid: '15'
          },
          {
            imgUrl: 'https://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/t/10/9577_158339.jpg',
            name: '西餐',
            cid: '16'
          },
          {
            imgUrl: 'https://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/t/15/14469_290824.jpg',
            name: '苏菜',
            cid: '104'
          },
          {
            imgUrl: 'https://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/t/25/24748_934702.jpg',
            name: '徽菜',
            cid: '105'
          },
          {
            imgUrl: 'https://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/t/77/76768_323343.jpg',
            name: '豫菜',
            cid: '107'
          },
          {
            imgUrl: 'https://juheimg.oss-cn-hangzhou.aliyuncs.com/cookbook/t/22/21906_621613.jpg',
            name: '晋菜',
            cid: '108'
          }
        ]
    },

    linkToItem(e) {
        wx.showLoading({
            title: '加载中'
        });

        wx.request({
            url: `${app.globalData.urlCid}?key=${app.globalData.key}&cid=${e.currentTarget.dataset.cid}`,
            method: 'GET',
            success: function(res) {
                wx.hideLoading();
                app.globalData.listData = res.data.result.data;
                wx.navigateTo({
                    url: '/pages/list/list'
                });
            },
            fail: function() {
                wx.hideLoading();
                wx.showModal({
                    title: '搜素失败o(╥﹏╥)o',
                    duration: 2000
                });
            }
        });
    }
});
