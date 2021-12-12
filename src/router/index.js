import Vue from "vue"
import VueRouter from "vue-router"
import afterSignIn from "../views/stamp.vue"
import About from "../views/About.vue"
import fire from "../views/firebaseSample.vue"
import firebase from "firebase"
import mykinntore from "../views/MyKinntore.vue"
import beforeSignIn from "../views/beforeSignIn.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/beforeSignIn",
    name: "beforeSignIn",
    component: beforeSignIn,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/afterSignIn",
    name: "afterSignIn",
    component: afterSignIn,
  },
  {
    path: "/fire",
    name: "fire",
    component: fire,
  },
  {
    path: "/mykinntore",
    name: "mykinntore",
    component: mykinntore,
  },
    

]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

const isSignedIn = async () => {
  return await new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          unsubscribe()
          resolve(true)
        } else {
          unsubscribe()
          resolve(false)
        }
      },
      (error) => {
        unsubscribe()
        reject(error)
      }
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const auth = await isSignedIn()
  if (to.name !== "beforeSignIn" && !auth) {
    next("/beforeSignIn")
  } else {
    next()
  }
})

export default router
