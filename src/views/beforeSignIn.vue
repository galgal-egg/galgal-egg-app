<template>
  <div class="body">
    <h1>MY HEALTH CARE</h1>
    <div class="mybody">
      <div class="photo"></div>
      <p>身長<input v-model="cm" />cm</p>
      <p>体重<input v-model="kg" />kg</p>
      <p>年齢<input v-model="age" />歳</p>
      <button @click="Men">男性</button>
      <button @click="Women">女性</button>
      <p>基礎代謝{{ cal }}cal</p>
      <p>必要水分{{ mL }}mL</p>
    </div>
    <div class="eatok">基礎代謝{{ cal }}cal</div>
    <p>食べ物<input v-model="eatname" /></p>
    <p>カロリー<input v-model="eatcal" />cal</p>
    <button v-on:click="kensaku">検索</button>
    <button v-on:click="calcal">追加</button>
    <ul>
      <li v-for="(food, index) in foods" :key="index">
        {{ food }}
      </li>
    </ul>
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
      eatname: "",
      eatcal: "",
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
            this.foods.push(doc.data().food, doc.data().cal)
          })
        })
        .then(() => {
          console.log(this.foods)
        })
    },
  },
}
</script>
