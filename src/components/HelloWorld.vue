<template>
  <div id="youtube">
    <div>
      <button v-on:click="getApi">ボタン</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    async getApi() {
      const request = require("request")
      clientID = "aiueo"
      clientSecret = "kakikukeo"

      const options = {
        method: "POST",
        url: "https://oauth.fatsecret.com/connect/token",
        method: "POST",
        auth: {
          user: this.clientID,
          password: this.clientSecret,
        },
        headers: { "content-type": "application/json" },
        form: {
          grant_type: "client_credentials",
          scope: "basic",
        },
        json: true,
      }

      request(options, function (error, response, body) {
        if (error) throw new Error(error)

        console.log(body)
      })
    },
  },
}
</script>

<style>
#youtube {
  text-align: center;
}
#title {
  font-size: 30px;
}
</style>
