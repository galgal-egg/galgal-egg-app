<template>
  <div>
    <p>身長<input v-model="cm" />cm</p>
    <p>体重<input v-model="kg" />kg</p>
    <p>年齢<input v-model="age" />歳</p>
    <button @click="Men">男性</button>
    <button @click="Women">女性</button>
    <p>基礎代謝{{ cal }}cal</p>
    <p>必要水分{{ mL }}mL</p>
    <button v-on:click="fire">ボタン</button>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      name: "",
      cm: "",
      kg: "",
      age: "",
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
    async fire() {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .collection("physical")
        .add({
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
  },
}
</script>
