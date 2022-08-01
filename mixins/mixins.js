	import {mapGetters} from 'vuex'
	export default {
		computed:{
			...mapGetters('cart',['total'])
		},
		watch:{
			total: {
				immediate:true,
				handler(){
					this.setTabBar()
				}
			}
		},
		onShow() {
			this.setTabBar()
		},
		methods:{
			//给导航设置图标数字
			setTabBar(){
				if(this.total === 0){
					uni.removeTabBarBadge({
						index:2
					})
				} else{
					uni.setTabBarBadge({
						index:2,
						text:this.total + ''
					})
				}
			}
		}
	}