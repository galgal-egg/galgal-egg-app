<template>
  <div class="todolist">
    <div>
      筋トレリスト
      <div class="bui">トレーニングする部位：
          <select v-model="selectedWorkout">
         <option disabled value="">今日はどこの部位？</option>
         <option
          v-for="workout in optionWorkout"
          v-bind:value="workout.name"
          v-bind:key="workout.id"
        >
          {{ workout.name }}
         </option>
         </select>
      </div>
    </div>
    <div>
      <div v-if="todos">
        <div v-for="(todo, index) in todos" v-bind:key="index" class="todo">
          <div class="todo__checkbox">
            <input type="checkbox" v-model="todo.isDone" />
          </div>
          <div v-if="todo.isDone" class="todo__text todo__text--done">
            {{ index }}:{{ todo.text }}
          </div>
          <div v-else class="todo__text">{{ index }}:{{ todo.text }}</div>
          <button v-on:click="deleteTodo(index)" class="todo__delete">削除</button>
        </div>
      </div>
    </div>
    <div class="syumoku">
      <div>
        種目や回数を入力：
        <input type="text" v-model="inputTodo" />
        <button v-on:click="addTodo">追加</button>
      </div>
    </div>
    <div class="hansei">
      今日の感想：
      <input type="text" v-model="inputHansei" />
      <button v-on:click="hozon" class="Hozon">保存</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    youbi: String
  },
  data() {
    return {
      selectedWorkout: "",
      optionWorkout: [
        { id: 1, name: "胸" },
        { id: 2, name: "背中" },
        { id: 3, name: "肩" },
        { id: 4, name: "腕" },
        { id: 5, name: "脚" },
      ],
      inputTodo: "",
      todos: [],
      inputHansei: "",
      menus: []
    }
  },
  created: function() {
    const memo = localStorage.menus
    this.menus = JSON.parse(memo)
    for(let i = 0; i < this.menus.length; i++){
      if(this.menus[i].youbi === this.youbi){
        this.todos.push(this.menus[i].todos)
      }
    }
  },
  methods: {
    addTodo() {
      if (this.inputTodo !== "") {
        const todo = { text: this.inputTodo, isDone: false }
        //this.todos.push(todo)
        firebase.firestore().collection("todos")
        .add(todo)
        .then(ref => {
          this.todos.push({
            id: ref.todo,
            ...todo
          });
        });
      };
    },
    deleteTodo(index) {
      this.todos.splice(index, 1)
    },

    hozon() {
      //console.log(this.youbi)
      const menu = {
        youbi: this.youbi,
        selectedWorkout: this.selectedWorkout,
        todos: this.todos,
        inputHansei: this.inputHansei,
      }
      this.menus.push(menu)
      //localStorage.menus = JSON.stringify(this.menus)
      localStorage.setItem("menus", JSON.stringify(this.menus))
      const art = JSON.parse(localStorage.getItem("menus"))
      this.menus = art

    },
  },
}
</script>

<style scoped>
.todolist {
  padding-left: 5rem;
  padding-right: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-radius: 5px;
}

.todo:hover {
  color: white;
  background-color: #b23b61;
}

.todo__text {
  margin-left: 2rem;
  text-align: left;
}

.todo__text--done {
  text-decoration-line: line-through;
}

.todo__delete {
  margin-left: 2rem;
  padding: 0.5rem 0.5rem;
}

.todo__delete:hover {
  margin-left: 2rem;
  background-color: #b2ae3b;
  border-radius: 5px;
}
</style>
