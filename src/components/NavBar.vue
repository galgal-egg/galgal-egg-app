<template>
  <div class="nav__bar">
    <router-link to="/" class="nav__logo nav__link">Home</router-link>
    <div class="nav__items">
      <router-link to="/about">About</router-link>|
      <router-link to="/beforeSignIn">before</router-link>|
      <router-link to="/afterSignIn">after</router-link>|
      <router-link to="/fire">firebase</router-link>|
      <router-link to="/fire">firebase</router-link>|
      <router-link to="/mykinntore">筋トレ</router-link>
    </div>
  </div>
</template>

<style scoped>
.nav__bar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: black;
}

.nav__items {
  display: flex;
  color: #fff;
}
.nav__item {
  width: 100px;
  border-left: 1px solid #eee;
  color: #fff;
}
</style>