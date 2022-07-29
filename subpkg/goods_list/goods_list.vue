<template>
	<view>
		    <view class="goods-list">
		      <view v-for="(goods, i) in goodsList" :key="i" @click=gotoDetail(goods)>
				  <my-goods :goods="goods"></my-goods>
		      </view>
		    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//请求参数对象
				queryObj:{
					page:1,
					pageSize:10,
					cid:'',
					query:''
				},
				//商品列表数据
				goodsList:[],
				//总数量
				total:0,
				//节流阀数据
				isLoading:false
			};
		},
		//初始化页面时将传进来的参数进行保存获取转换
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			//调用获取商品列表数据的方法
			this.getGoodsList()
		},
		methods:{
			//请求获得商品列表数据的接口
			async getGoodsList(cb){
				this.isLoading = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				// console.log(res);
				cb && cb()
				if( res.meta.status !== 200) return uni.$showMsg()
				//对数据进行新旧拼接
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
				this.isLoading = false
			},
			//点击商品跳转到商品详情页
			gotoDetail(goods){
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
				})
			}
		},
		//上拉触底事件
		onReachBottom() {
			//判断数据是否加载完毕
			//就是页数乘以每页数据量大于总数据,说明已经加载完毕了
			if(this.queryObj.page * this.queryObj.pageSize >= this.total) return uni.$showMsg('数据加载完毕!')
			//判断是否在做其他请求,如果是那么取消这次请求
			if(this.isLoading) return
			this.queryObj.page += 1
			this.getGoodsList()
		},
		// 下拉刷新事件
		onPullDownRefresh() {
			this.queryObj.page = 1
			this.total = 0
			this.isLoading = false
			this.goodsList = []
			//重新发起请求
			this.getGoodsList(()=>{
				uni.stopPullDownRefresh()
			})
			
		}
	
	}
</script>

<style lang="scss">

</style>
