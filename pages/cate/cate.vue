<template>
	<view>
		<my-search @click="gotoSeatch"></my-search>
		<view class="scroll-container">
			<!-- 左侧滚动区域 -->
			<scroll-view class="scroll-left" scroll-y :style="{height:wh + 'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['scroll-left-item', i === active ? 'active' : '']" @click="checkedIndex(i)">{{item.cat_name}} </view>
				</block>
			</scroll-view>
			<scroll-view class="scroll-right" scroll-y  :style="{height:wh + 'px'}">
				<view class="cate-Level2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<!-- 二级分类标题 -->
					<view class="cate-Level2-title">
						{{item2.cat_name}}
					</view>
					<!-- 三级分类数据 -->
					<view class="cate-Level3">
						<view class="cate-Level3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>	
		</view>
	</view>
</template>

<script>
	import tabMixins from '@/mixins/mixins.js'
	export default {
		data() {
			return {
				//可用窗口高度 等于屏幕高度-navigator-tabbar
				wh:0,
				//分类数据
				cateList:[],
				//判断添加左侧标题类名
				active:0,
				//二级分类
				cateLevel2:[]
			};
		},
		mixins:[tabMixins],
		onLoad() {
			//获取可用窗口高度
		const SystemHeight = uni.getSystemInfoSync()
		//需要减去搜索组件的高度
		this.wh = SystemHeight.windowHeight - 50
		//调用获取分类数据的方法
		this.getCateList()
		},
		methods:{
			//请求获取分类数据的接口
			async getCateList(){
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				console.log(res);
				//请求失败
				if(res.meta.status !==200){
					return uni.$showMsg()
				}
				//请求成功
				this.cateList = res.message
				//二级分类赋值
				this.cateLevel2 =res.message[0].children
			},
			//修改添加左侧标题类名
			checkedIndex(i){
				this.active = i
				//二级分类重新赋值
				this.cateLevel2 =this.cateList[i].children
			},
			//点击三级跳转到商品列表
			gotoGoodsList(item3){
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?cid=${item3.cat_id}`
				})
			},
			//点击搜索组件跳转到搜索页面
			gotoSeatch(){
				console.log("ok");
				uni.navigateTo({
					url:'/subpkg/goods_search/goods_search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-container {
  display: flex;

  .scroll-left {
    width: 120px;

    .scroll-left-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;
      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;
        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
.cate-Level2-title {
	  font-size: 12px;
	  font-weight: bold;
	  text-align: center;
	  padding: 15px 0;
	}
.cate-Level3 {
  display: flex;
  flex-wrap: wrap;

  .cate-Level3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}
}
</style>
