<template>
  <view>
	  <!-- 搜索栏 -->
	<view class="search-keyword">
		<uni-search-bar @input.trim="input" cancelButton="none" radius="30"></uni-search-bar>	
	</view>
	<!-- 展示搜索数据 -->
	<view class="search-list" v-if="searchList.length !== 0">
		<view class="search-item" v-for="(item,i) in searchList" :key="i" @click="gotoDetil(item)">
			<view class="search-title">
				{{item.goods_name}}
			</view>
			 <uni-icons type="arrowright" size="16"></uni-icons>
		</view>	
	</view>
	<!-- 展示历史数据 -->
	<view class="history-list" v-else>
		<!-- 标题 -->
		<view class="history-title">
			<text>搜索历史</text>
			<uni-icons type="trash" size="16" @click="deleteHistory"></uni-icons>
		</view>	
		<view class="history-item">
			 <uni-tag :text="item" v-for="(item, i) in historys" :key="i" :circle="true" type="error" @click="gotoGoodsList(item)"></uni-tag>
		</view>
	</view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				//关键词
				keyWord:'',
				//搜索建议
				searchList:[],
				//搜索历史数据
				historyList:[]
			};
		},
		methods:{
			//input输入事件
			//实现防抖
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
						this.keyWord = e.value
						//发起网络请求获取搜索结果
						this.getSearchList()
				},600)
			},
			//请求获取搜索结果的接口
			async getSearchList(){
				if(this.keyWord === ''){
					 this.searchList = []
					 return
				}
			const {data:res} =	await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.keyWord})
			console.log(res);
				if(res.meta.status !== 200){
					return this.$showMsg()
				}
				this.searchList = res.message
				this.saveHistoryList()
			},
			//点击每一项跳转到商品详情页
			gotoDetil(item){
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
				})
			},
			//将关键词放入到历史数据上
			saveHistoryList(){
				this.historyList.push(this.keyWord)
				//数组去重
				this.historyList = [...new Set(this.historyList)]
				//将数据保存到本地
				uni.setStorageSync('keyWord',JSON.stringify(this.historyList))
			},
			//清空搜索历史数据
			deleteHistory(){
				this.historyList = []
				uni.setStorageSync('keyWord',[])
			},
			//点击历史记录跳转到商品列表页面
			gotoGoodsList(item){
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?query=${item}`
				})
			}
		},
		computed:{
			//处理历史数据前后顺序问题
			historys(){
				return [...this.historyList].reverse()
			}
		},
		onLoad() {
			//加载页面时提取本地存储的数据
			this.historyList = JSON.parse(uni.getStorageSync('keyWord') || '[]')
		}

	}
</script>

<style lang="scss">
	.search-list{
		padding: 5px;
		.search-item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			.search-title{
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}
	.history-list{
		padding: 5px;
		.history-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}
		.history-item{
			display: flex;
			flex-wrap: wrap;
			.uni-tag{
				font-size: 14px !important;
				margin: 5px 8px 5px 0;
			}
		}
	}

</style>
