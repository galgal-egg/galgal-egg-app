<template>
  <div class="text-center section">
    <h1 class="h1">STAMP RALLY</h1>
    <p class="text-lg font-medium text-gray-600 mb-6"></p>
    <v-calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
      is-expanded
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <button v-on:click="addTodo(day)">今日の自分は？</button>
            <p
              v-for="attr in attributes"
              :key="attr.key"
              class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
              :class="attr.customData.class"
            >
              <textarea />
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      masks: {
        weekdays: "WWW",
      },
      attributes: [],
    }
  },
  methods: {
    addTodo(day) {
      const todo = {
        key: day.id,
        customData: {
          title: "",
          class: "",
        },
        dates: day.date,
      }
      this.attributes.push(todo)
      console.log(todo)
      console.log(day)
    },
  },
}
</script>

<style scoped>
.text-center {
  width: 100vw;
  height: 100vh;
  background-color: #dd6e42d7;
  position: absolute;
}

.h1 {
  color: #ffffff;
  font-size: 40px;
  letter-spacing: 5px;
}
</style>
