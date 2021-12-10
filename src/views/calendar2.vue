<template>
  <div class="text-center section">
    <h2 class="h2">Custom Calendars</h2>
    <p class="text-lg font-medium text-gray-600 mb-6">
      Roll your own calendars using scoped slots
    </p>
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
            <button v-on:click="addTodo(day)">
              追加
            </button>
            <button v-on:click="deleteTodo(day)">
                delete
            </button>
            <p
              v-for="attr in attributes"
              :key="attr.key"
              class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
              :class="attr.customData.class"
            >
              <input v-model="attr.customData.title" />
              {{ attr.customData.title }}
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
      attributes: [

      ],
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
    deleteTodo(day){
        this.todo.dates.splice(day, 1)
    }
  },
  watch: {
    attributes: {
      handler: function () {
        localStorage.setItem("attributes", JSON.stringify(this.attributes))
      },
      deep: true,
    },
  },
  created: function () {
    if (localStorage.getItem("attributes")) {
      const art = JSON.parse(localStorage.getItem("attributes"))
      this.attributes = art
    }
  },
}
</script>
<style scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}

</style>