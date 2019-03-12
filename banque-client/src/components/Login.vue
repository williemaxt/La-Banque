<template>
  <div class="page">
    <div class="card">
      <p class="display-4 text-center">{{msg}}</p>
      <p v-show="prompt" class="text-center text-danger">{{prompt}}</p>
      <input type="text" class="form-control" placeholder="email" v-model="email">
      <input type="password" class="form-control" placeholder="email" v-model="password">
      <button class="btn" v-on:click="login">Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
        msg: 'Make Today Better Than Yesterday',
        prompt: '',
        email: '',
        password: ''
    }
  },
  methods: {
    login(){
      axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          email: this.email,
          password: this.password
        }
      }).then((res) => {
        //handling the success
        if (res.data.message == 'match'){
          //storing the account information in the VUEX Store
          this.$store.state.currentEmail = res.data.email
          this.$store.state.currentAccount = res.data.accountNumber
          this.$store.state.firstName = res.data.firstName
          this.$store.state.lastName = res.data.lastName
          this.$router.push({name: 'Dashboard'})
        } else if (res.data.message == 'nonmatch'){
          this.prompt = 'Either your email or password is incorrect'
        } else {
          this.prompt = 'We dont have an account with that email'
        }
      });
    }
  }
}
</script>

<style scoped>
.page{
  height: 100vh;
  width: 100vw;
  background: #A12525;
  position: absolute;
  top: 0;
}
.card{
  max-width: 800px;
  display: block;
  margin: 10vh auto;
  background: #fff;
  height: 600px;
  border-radius: 0px;
}
.form-control{
  background: none;
  box-shadow: none;
}
input{
  border: none;
  border-bottom: 1px solid #000000;
  border-radius: 0px;
  width: 50%;
  display: block;
  margin: 0 auto;
  text-align: center;
  font-size: 2em;
  margin-top: 7%;
}
.btn{
  transition: .3s;
  box-shadow: none;
  border-radius: 0px;
  border: 1px solid #000;
  font-size: 2em;
  display: block;
  margin: 7% auto;
  width: 200px;
}
.btn:hover{
  transition: .3s;
  background: #000000;
  color: #fff;
}
</style>
