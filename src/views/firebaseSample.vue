<template>
  <div>
    <input type="text" />
    <button v-on:click="fire">ボタン</button>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      name: "",
    }
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
  methods: {
    async fire() {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.user.uid)
        .collection("physical")
        .add({
          name: this.user.displayName,
          uid: this.user.uid,
          high: "222acm",
        })
      this.name = this.user.displayName
      console.log(this.user.displayName)
      console.log(this.user.uid)
    },
  },
}
</script>
