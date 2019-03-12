<template>
<div class="bg">
  <!-- Navigation -->
  <nav>
    <h3 class="text-center">Hi, {{$store.state.firstName}}</h3>
    <h3 class="text-center">{{$store.state.currentAccount}}</h3>
    <div class="line"></div>
    <ul class="text-center">
      <li v-on:click="goToTransfer">Send Money</li>
      <li>Transaction History</li>
      <li>Account Settings</li>
    </ul>
    <div class="btn" v-on:click="logOut">Log Out</div>
  </nav>
  <!-- Page components -->
  <div id="main-panel">
    <div id="header-card" class="card">
      <h3>{{$store.state.firstName}} {{$store.state.lastName}}</h3>
      <h3>{{$store.state.currentEmail}}</h3>
      <h3>{{$store.state.currentAccount}}</h3>
      <p class="badge" id="account-balance">${{balance}}</p>
    </div>
    <!-- the main card -->
    <div id="transaction-card" class="card">
      <!-- List of transactions -->
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h3>{{firstName}} {{lastName}}</h3>
          <h3>{{email}}</h3>
          <h3>{{accountNumber}}</h3>
        </li>
        <li class="list-group-item">
          <h3>{{firstName}} {{lastName}}</h3>
          <h3>{{email}}</h3>
          <h3>{{accountNumber}}</h3>
        </li>
        <li class="list-group-item">
          <h3>{{firstName}} {{lastName}}</h3>
          <h3>{{email}}</h3>
          <h3>{{accountNumber}}</h3>
        </li>
        <li class="list-group-item">
          <h3>{{firstName}} {{lastName}}</h3>
          <h3>{{email}}</h3>
          <h3>{{accountNumber}}</h3>
        </li>
        <li class="list-group-item">
          <h3>{{firstName}} {{lastName}}</h3>
          <h3>{{email}}</h3>
          <h3>{{accountNumber}}</h3>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  mounted(){
    this.getBalance()
  },
  data(){
    return{
      firstName: 'William',
      lastName: 'Thompson',
      accountNumber: 'A1X2G36',
      email: 'williemaxt@gmail.com',
      balance: ''
    }
  },
  methods: {
    getBalance(){
      //if the vuex store has a current account then send
      if (this.$store.state.currentAccount != ''){
        axios({
          method: 'post',
          url: 'http://localhost:3000/balance',
          data: {
            currentAccount: this.$store.state.currentAccount
          }
        }).then((res) => {
          //set the current balance
          this.balance = res.data.message
        })
      } else {
        this.logOut()
      }
    },
    logOut(){
      alert('were logging out')
      //clear items from state
      this.$store.state.firstName = ''
      this.$store.state.lastName = ''
      this.$store.state.currentEmail = ''
      this.$store.state.currentAccount = ''
      //route back to the home page
      this.$router.push({name: 'Home'})
    },
    goToTransfer(){
      this.$router.push({name: 'Transfer'})
    }
  }
}
</script>

<style scoped>
.bg{
  height: 100vh;
  width: 100vw;
  background: #A12525;
  position: absolute;
  top: 0;
}
nav{
  padding-top: 10vh;
  background: #000000;
  height: 100vh;
  width: 20vw;
  max-width: 400px;
  color: #fff;
  float: left;
}
nav h3{
  padding-top: 10px;
  padding-bottom: 10px;
}
.line{
  width: 80%;
  height: 1px;
  display: block;
  margin: 0 auto;
  background: #fff;
}
ul{
  list-style: none;
  padding: 0;
  margin-top: 10vh;
}
ul li{
  margin-top: 40px;
  margin-bottom: 40px;
}
.list-group-item{
  display: block;
  margin: 0 auto;
  width: 90%;
}
.btn{
  display: block;
  margin: 0 auto;
  color: #fff;
}
.card{
  border-radius: 0px;
}
#main-panel{
  width: 80vw;
  height: 100vh;
  float: right;
  /* overflow-x: scroll; */
}
#main-panel ul{
  margin-top: 0;
}
#header-card{
  margin: 40px;
  padding:30px;
}
#header-card h3{
  text-align: left;
}
#transaction-card{
  max-height: 65vh;
  margin: 40px;
  overflow-x: hidden;
}
#account-balance{
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  font-size: 20px;
}
/* The mobile and tablet query */
@media screen and (max-width: 700px){
  nav{
    top: 0;
    height: 10vh;
    width: 100vw;
    max-width: none;
    padding-top: 0;
  }
  nav h3{
    font-size: 20px;
  }
}
</style>
