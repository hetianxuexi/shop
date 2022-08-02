<template>
	<view>
		<!-- 登录区域 -->
		<my-login v-if="!token"></my-login>
		<!-- 显示用户区域 -->
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import tabMixins from '@/mixins/mixins.js'
	export default {
		data() {
			return {
				
			};
		},
		mixins:[tabMixins],
		computed:{
			...mapState('address',['token'])
		}
	}
</script>

<style lang="scss">

</style>
