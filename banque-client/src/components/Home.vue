<template>
  <div class="">
    <div id='centeredFields'>
      <h1>{{msg}}</h1>
      <h3>{{subMsg}}</h3>
      <button class='btn' id='signupBtn'>Sign Up</button>
    </div>
    <button class='btn' id="login" v-on:click='goToLogin'>Login</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg: 'Bienvenue a La Banque',
      subMsg: 'The Place To Learn Money Management'
    }
  },
  methods: {
    goToLogin(){
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style lang="css">
#login{
  transition: .3s;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: none;
  font-size: 20px;
  border-radius: 0px;
}
#login:hover{
  transition: .3s;
  background: #fff;
  border: 1px solid #000000;
  color: #000000;
}
#centeredFields{
  margin-top: 300px;
}
#centeredFields h1{
  margin-bottom: 50px;
}
#centeredFields h3{
  font-size: 4em;
}
#signupBtn{
  transition: .3s;
  background: #000000;
  color: #fff;
  box-shadow: none;
  border-radius: 0px;
  margin-top: 50px;
}
#signupBtn:hover{
  transition: .3s;
  background: #fff;
  border: 1px solid #000000;
  color: #000000;
}
</style>
