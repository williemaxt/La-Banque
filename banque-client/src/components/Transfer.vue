<template>
  <div class="bg">
    <p class="text-center display-4 text-white">Let's send some money</p>
    <!-- Main Card info goes here -->
    <p class="alert-success" v-show="successPrompt">{{successPrompt}}</p>
    <p class="alert-light" v-show="prompt">{{prompt}}</p>
    <div id="main-card" class="card">
      <p class="text-center">{{$store.state.currentAccount}}</p>
      <input type="text" class="form-control" placeholder="Recipients Account Code" v-model="recievingAccount">
      <input type="number" class="form-control" placeholder="La 0.00" v-model="amount">
      <button class="btn" v-on:click="sendFunds">Send Funds</button>
      <br>
      <p class="text-center" v-on:click="goToDash">Return to dash</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Transfer',
  data(){
    return{
      recievingAccount: '',
      amount: 0.00,
      prompt: '',
      successPrompt: ''
    }
  },
  methods: {
    sendFunds(){
      //if statement to validate fields if not empty
      if (this.$store.state.currentAccount == '' || this.recievingAccount == ''){
        //if one is empty
        this.prompt = 'Please Check All Fields'
        //clear success prompt
        this.successPrompt = ''
      } else if (this.amount == '' || this.amount == 0){
        //clear success prompt
        this.successPrompt = ''
        this.prompt = 'You Cannot send an empty balance'
      } else {
        //if everything is clear
        axios({
          method: 'post',
          url: 'http://localhost:3000/send',
          data: {
            currentAccount: this.$store.state.currentAccount,
            accountNumber: this.recievingAccount,
            amount: this.amount
          }
        }).then((response) => {
          //will handle the response data
          //handling the success
          if (response.data.message == 'finished'){
            //clear error prompt
            this.prompt = ''
            //fill success prompt
            this.successPrompt = 'You Have Successfully sent ' + this.amount + ' to ' + this.recievingAccount
          } else if(response.data.message == 'nouser'){
            //clear success prompt
            this.successPrompt = ''
            //fill error prompt
            this.prompt = 'No Such User'
          }
        });
        //clear the error prompt
        this.prompt = ''
      }
    },
    goToDash(){
      //pushing to the dash
      this.$router.push({name: 'Dashboard'})
    }
  }
}
</script>

<style lang="css">
.bg{
  height: 100vh;
  width: 100vw;
  background: #A12525;
  position: absolute;
  top: 0;
}
#main-card{
  width: 50vw;
  display: block;
  margin: 0 auto;
  height: 50vh;
  border: none;
  border-radius: 0px;
  margin-top: 10vh;
  padding-top: 10vh;
}
.form-control{
  background: none;
  box-shadow: none;
  margin-bottom: 20px;
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid #333;
  width: 80%;
  display: block;
  margin: 0 auto;
  margin-bottom: 40px;
  text-align: center;
}
.btn{
  transition: .3s;
  box-shadow: none;
  border-radius: 0px;
  border: 1px solid #000;
  font-size: 2em;
  width: 200px;
  display: block;
  margin: 0 auto;
}
.btn:hover{
  transition: .3s;
  background: #000000;
  color: #fff;
}
.alert-light{
  max-width: 300px;
  display: block;
  margin: 0 auto;
  font-size: 2em;
  text-align: center;
  border-radius: 10px;
  margin-top: 20px;
  color: #ff0000;
  font-weight: bold;
}
/* Media Query for page contents */
@media screen and (max-width: 800px){
  #main-card{
    width: 90%;
  }
}
</style>
