<template>
	<view>
		<view class="goods-item">
		  <!-- 商品左侧图片区域 -->
		  <view class="goods-item-left">
			  <label class="radio" >
			  	<radio :checked="goods.goods_state"  color="#ff2000" style="transform:scale(0.7)" v-if="showRadio" @click=" radioChecked"/>
			  </label>
		    <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		  </view>
		  <!-- 商品右侧信息区域 -->
		  <view class="goods-item-right">
		    <!-- 商品标题 -->
		    <view class="goods-name">{{goods.goods_name}}</view>
		    <view class="goods-info-box">
		      <!-- 商品价格 -->
		      <view class="goods-price">￥{{goods.goods_price | toFixed}}</view>
			  <uni-number-box :min="1" :value="goods.goods_count" v-if="showNumberBox" @change="numberChangeHandler"></uni-number-box>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{}
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showNumberBox:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				//默认图片防止一开始没存在图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		//对价格进行处理,添加两位小数点
		filters:{
			toFixed(value){
				return Number(value).toFixed(2)
			}
		},
		methods:{
			//产品勾选状态
			radioChecked(){
				this.$emit('radioChange',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			numberChangeHandler(value){
				this.$emit('numberBox',{
					goods_id:this.goods.goods_id,
					goods_count:+value
				})
			}
		}
	}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
	  display: flex;
	  align-items: center;
      margin-right: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }
    .goods-info-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.goods-price {
		  font-size: 16px;
		  color: #c00000;
		}
	}

  }
}
</style>