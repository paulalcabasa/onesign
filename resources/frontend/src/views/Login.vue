<template>
    <div class="login-wrapper">
    <div class="outer">
        <div class="middle">
            <div class="inner">
                <h1 class="text-center">OneSign</h1>
                <b-card variant="primary">
                    <b-form>
                      
                        <b-input-group
                         
                            class="mb-3"
                        > 
                            <b-input-group-prepend>
                                <span class="input-group-text"><b-icon icon="person-fill"></b-icon></span>
                            </b-input-group-prepend>
                            <b-form-input placeholder="Username" v-model="username"></b-form-input>
                        </b-input-group>
                  
                        <b-input-group
                          
                            class="mb-3"
                        >
                            <b-input-group-prepend>
                                <span class="input-group-text"><b-icon icon="key-fill"></b-icon></span>
                            </b-input-group-prepend>
                            <b-form-input placeholder="Password" type="password" v-model="password"></b-form-input>
                        </b-input-group>


                        <b-btn variant="primary" @click="submit">Sign in</b-btn>
                        <b-link href="forgot_password" class="float-right">Forgot your password?</b-link>
                      </b-form>
                </b-card>
            </div>
        </div>
    </div>
    </div>
</template>
<style scoped>
    .outer {
        display: table;
        position: absolute;
        top: 0;
        left: 0;
        height: 90%;
        width: 100%;
    }

    .middle {
        display: table-cell;
        vertical-align: middle;
    }

    .inner {
        margin-left: auto;
        margin-right: auto;
        width: 400px;
        text-align:left;
        /*whatever width you want*/
    }

    .login-wrapper {
        background:#c3c3c3;
    }
</style>
<script>
export default {
	data() {
		return {
			name: '',
			username: '',
			password: ''
		}
	},
	methods : {
		submit(){
			this.$axios.post('api/auth/login', {
				username : this.username,
				password : this.password
			}).then(res => {
				localStorage.setItem('os-token', res.data.access_token);
				this.$router.push('dashboard');
			}).catch(err => {
				console.log(err);
			});
		}
	},
	computed: {
		state() {
			return this.name.length >= 4 ? true : false
		},
		invalidFeedback() {
			if (this.name.length > 4) {
				return ''
			} else if (this.name.length > 0) {
				return 'Enter at least 4 characters'
			} else {
				return 'Please enter something'
			}
		},
		validFeedback() {
			return this.state === true ? 'Thank you' : ''
		}
	},
    
  }
</script>