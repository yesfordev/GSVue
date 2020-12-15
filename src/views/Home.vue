<template>
	<div>
		<h4>Wefunding DataHub.</h4>
		<br>
		<h5>year 2020, made by youngeun Seo</h5>
	</div>
</template>
<script>
	export default{
		data:() => ({
			
		}),
		methods: {
			checkLogin() {
				return this.$http
					.get(`${process.env.VUE_APP_BASE_URL}/user/user`,
					{
              			'headers': {'X-AUTH-TOKEN': this.$cookie.get('token')}
            		})
        			.then((res) => {
						console.log(res.data.data)
						console.log(this.$store);
						this.$store.commit('UPDATE_USER', res.data.data.name);
						// sessionStorage.setItem("user", res.data.data.name);
        			})
        			.catch((error) => { // 팝업 띄우기
						console.log(error);
						// this.$router.push('/pages/login').catch(() => {});
        			});
				}
		},
		created() {
			this.checkLogin();
		}
	}

</script>