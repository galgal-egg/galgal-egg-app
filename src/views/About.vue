<template>
  <div class="body">
    <h1>MY HEALTH CARE</h1>
    <div class="mybody">
      <div class="photo">
        <img alt="Vue logo" src="../assets/women.png" />
      </div>
      <p>身長<input v-model="cm" />cm</p>
      <p>体重<input v-model="kg" />kg</p>
      <p>年齢<input v-model="age" />歳</p>
      <button @click="Men">男性</button>
      <button @click="Women">女性</button>
      <p>基礎代謝{{ cal }}cal</p>
      <p>必要水分{{ mL }}mL</p>
    </div>
    <div class="water">
      必要水分{{ mL }}mL
      <div class="ame">
        <button @click="one"></button>
        <button @click="three"></button>
        <button @click="five"></button>
      </div>
      <ul>
        <li>100mL</li>
        <li>250mL</li>
        <li>500mL</li>
      </ul>
    </div>
    <div class="eatok">基礎代謝{{ cal }}cal</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      cm: "",
      kg: "",
      age: "",
      cal: 0,
      mL: 0,
    }
  },
  methods: {
    Men() {
      return (
        (this.cal =
          this.cm * 4.799 + this.kg * 13.397 + this.age * 5.677 + 88.362),
        (this.cal = Math.round(this.cal))((this.mL = this.kg * 40))
      )
    },
    Women() {
      return (
        (this.cal =
          this.cm * 3.098 + this.kg * 9.247 + this.age * 4.33 + 447.592),
        (this.cal = Math.round(this.cal))((this.mL = this.kg * 40))
      )
    },
    one() {
      if (this.mL > 0) {
        return (this.mL -= 100)
      }
    },
    three() {
      if (this.mL > 0) {
        return (this.mL -= 250)
      }
    },
    five() {
      if (this.mL > 0) {
        return (this.mL -= 500)
      }
    },
  },
}
</script>

<style scoped>
.body {
  width: 100vw;
  height: 100vh;
  background-color: #e8dab2;
  position: absolute;
}

.body h1 {
  font-size: 50px;
  margin-top: 10px;
  padding-top: 10px;
}

.mybody {
  height: 600px;
  width: 500px;
  background-color: #dd6e42;
  margin: 0px 0px 0px 100px;
  padding: 30px 0px;
  border-radius: 70px;
  position: absolute;
  font-weight: bold;
  letter-spacing: 2px;
  color: #706060;
  font-size: 20px;
  text-shadow: 0.25px 0.25px 0 #fff, -0.25px -0.25px 0 #fff,
    -0.25px 0.25px 0 #fff, 0.25px -0.25px 0 #fff, 0px 0.25px 0 #fff,
    0 -1px 0 #fff, -1px 0 0 #fff, 1px 0 0 #fff;
}
input {
  margin: 0px 4px;
  font-size: 20px;
  text-align: center;
  width: 100px;
}

.body button {
  margin-right: 20px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}
.photo {
  display: flex;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin-left: 140px;
  margin-top: 20px;
  background-color: #eee9dc;
  margin-bottom: 40px;
  border: 20px solid rgba(224, 102, 54, 0.308);
}

.water {
  width: 650px;
  height: 240px;
  background-color: #4f6d7a;
  float: right;
  margin: 0px 100px 0px 0px;
  border-radius: 70px;
  color: #faf4e5;
  font-weight: bold;
  font-size: 35px;
  padding-top: 20px;
}

.eatok {
  width: 650px;
  height: 330px;
  float: right;
  margin: 45px 100px 0px 0px;
  background-color: #eaeaea;
  border-radius: 70px;
  font-weight: bold;
  font-size: 35px;
  padding-top: 20px;
}

.ame button {
  margin: -15px 30px;
  position: relative;
  top: 50px;
  width: 80px;
  height: 80px;
  background: #eaeaea;
  border-radius: 0% 100% 50% 50%/ 0% 50% 50% 100%;
  transform: rotate(45deg) skew(3deg, 3deg);
}

.water ul {
  width: 500px;
  margin: 50px auto;
}
.water li {
  float: left;
  list-style: none;
  width: 23%;
  font-size: 28px;
  margin-left: 32px;
}

input {
  border: 1px solid #000;
}
</style>
