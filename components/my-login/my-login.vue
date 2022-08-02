<template>
	<view>
		 <view class="login-container">
		    <!-- 提示登录的图标 -->
		    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		    <!-- 登录按钮 -->
		    <button type="primary" class="btn-login"  open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		    <!-- 登录提示 -->
		    <view class="tips-text">登录后尽享更多权益</view>
		  </view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('address',['redirection'])
		},
		methods:{
			...mapMutations('address',['updateUserInfo','updateToken','updateRedirection']),
			//点击登录s
			getUserInfo(e){
				console.log(e);
				const userInfo = e.detail.userInfo
				this.updateUserInfo(userInfo)
				//调用获取token
				this.getToken(e.detail)		
			},
			//获取token
		  async getToken(info){
			  const [err,res] = await uni.login().catch(err=>err)
			  if(err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
			  //准备参数
			  const query = {
				    code: res.code,
				    encryptedData: info.encryptedData,
				    iv: info.iv,
				    rawData: info.rawData,
				    signature: info.signature
			  }
			   //发请求获取token
			   const tokenMsg = await uni.$http.post('/api/public/v1/users/wxlogin',query)
			   //因为接口问题,token给定一个死数据
			   const token = "04054041441"
			   this.updateToken(token)
			   //跳转到购物车原来的页面
			   this.navigationBack()
			},
			//跳转到购物车页面函数
			navigationBack(){
				if(this.redirection && this.redirection.openType === 'switchTab'){
					uni.switchTab({
						url:this.redirection.from
					})
					this.updateRedirection(null)
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
	  // 登录盒子的样式
	  height: 750rpx;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  background-color: #f8f8f8;
	  position: relative;
	  overflow: hidden;
	
	  // 绘制登录盒子底部的半椭圆造型
	  &::after {
	    content: ' ';
	    display: block;
	    position: absolute;
	    width: 100%;
	    height: 40px;
	    left: 0;
	    bottom: 0;
	    background-color: white;
	    border-radius: 100%;
	    transform: translateY(50%);
	  }
	
	  // 登录按钮的样式
	  .btn-login {
	    width: 90%;
	    border-radius: 100px;
	    margin: 15px 0;
	    background-color: #c00000;
	  }
	
	  // 按钮下方提示消息的样式
	  .tips-text {
	    font-size: 12px;
	    color: gray;
	  }
	}

</style>