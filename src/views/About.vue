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
      <button v-on:click="fire">保存</button>
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
    <div class="eatok">
      基礎代謝{{ cal }}cal
      <div class="foods">
        <p>
          食べ物<input v-model="eatname" />カロリー<input v-model="eatcal" />cal
        </p>
        <div class="eatbutton">
          <button v-on:click="calcal">追加</button>
          <button v-on:click="kensaku">検索</button>
        </div>
      </div>
      <div class="eatlist">
        <p v-for="(food, index) in foods" :key="index">{{ food }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data: function () {
    return {
      cm: "",
      kg: "",
      age: "",
      cal: 0,
      mL: 0,
      foods: [],
    }
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
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
    async fire() {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.user.displayName)
        .set({
          name: this.user.displayName,
          age: this.age,
          cm: this.cm,
          kg: this.kg,
          uid: this.user.uid,
        })
      this.name = this.user.displayName
      console.log(this.user.displayName)
      console.log(this.age)
      console.log(this.cm)
      console.log(this.kg)
      console.log(this.user.uid)
    },
    async calcal() {
      await firebase
        .firestore()
        .collection("foodandcal")
        .doc(this.eatname)
        .set({
          food: this.eatname,
          cal: this.eatcal,
        })
      this.name = this.user.displayName
      console.log(this.user.displayName)
      console.log(this.eatname)
      console.log(this.eatcal)
    },
    kensaku() {
      firebase
        .firestore()
        .collection("foodandcal")
        .where("food", "==", this.eatname)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.foods.push(doc.data().food, doc.data().cal + "cal")
          })
        })
        .then(() => {
          console.log(this.foods)
        })
    },
    created() {
      firebase
        .firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.cm.push(doc.data().cm)
            this.age.push(doc.date().age)
            this.kg.push(doc.date().kg)
          })
        })
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
  height: 650px;
  width: 500px;
  background-color: #dd6e42;
  margin: 0px 0px 0px 100px;
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
  width: 680px;
  height: 200px;
  background-color: #4f6d7a;
  float: right;
  margin: 0px 100px 0px 0px;
  border-radius: 70px;
  color: #faf4e5;
  font-weight: bold;
  font-size: 30px;
  padding-top: 20px;
}

.eatbutton {
  float: right;
  margin: 10px 50px 0px 0px;
}
.eatok {
  width: 680px;
  height: 390px;
  float: right;
  margin: 20px 100px 0px 0px;
  background-color: #eaeaea;
  border-radius: 70px;
  font-weight: bold;
  font-size: 30px;
  padding-top: 20px;
}
.eatlist {
  font-size: 20px;
  line-height: 10px;
  width: 500px;
  height: 300px;
  margin: 0px auto;
}
.eatlist p {
  float: left;
  margin: 20px 0px 0px 10px;
}
.foods p {
  font-size: 20px;
  float: left;
  margin-left: 80px;
}

.foods {
  width: 680px;
  height: 70px;
}

.ame button {
  margin: -30px 30px;
  position: relative;
  top: 50px;
  width: 60px;
  height: 60px;
  background: #eaeaea;
  border-radius: 0% 100% 50% 50%/ 0% 50% 50% 100%;
  transform: rotate(45deg) skew(3deg, 3deg);
}

.water ul {
  width: 420px;
  height: 200px;
  margin: 55px auto;
}
.water li {
  float: left;
  list-style: none;
  width: 23%;
  font-size: 25px;
  margin-left: 26px;
}

.foods input {
  border: 1px solid #000;
  font-size: 20px;
  font-weight: bold;
  color: #303030;
}
</style>
