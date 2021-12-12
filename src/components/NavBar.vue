<template>
  <div class="nav__bar">
    <div class="nav__items">
     <router-link to="/about">体調管理</router-link>|
      <router-link to="/fire">firebase</router-link>|
      <router-link to="/mykinntore">筋トレ</router-link>|
      <router-link to="/afterSignIn">calendar</router-link>|
      <router-link to="/beforeSignIn">TOP|</router-link>
    </div>
  </div>
</template>

<style scoped>
.nav__bar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: #dd6e42;
}

.nav__items {
  display: flex;
  color: #fff;
  font-size: 150%;
}
.nav__item {
  width: 100px;
  border-left: 1px solid #eee;
  color: #fff;
}
.nav__logo nav__link{
  font-size: 150%;
}
</style>