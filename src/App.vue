<template>
  <div id="app">
    <div id="nav">
      <router-link to="/beforeSignIn">TOP|</router-link>
      <router-link to="/stamp">スタンプラリー</router-link>|
      <router-link to="/about">体調管理</router-link>|
      <router-link to="/Mykinntore">筋トレ</router-link>
      <button v-if="isLoggin" v-on:click="logOut">ログアウト</button>
      <button v-else v-on:click="logIn">ログイン</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      isLoggin: false,
    }
  },
  methods: {
    logIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log({ result })
          if (result.user) {
            this.isLoggin = true
          }
        })
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.isLoggin = false
        })
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
