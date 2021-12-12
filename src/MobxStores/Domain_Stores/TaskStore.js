import { action, computed, observable, autorun, makeObservable } from "mobx";

export default class TaskStore {
  tasks = [];

  constructor() {
    makeObservable(this, {
      tasks: observable,
      addTask: action,
      editTask: action,
      doneTask: action,
      deleteTask: action,
      doneTasks: computed,
      numTasks: computed,
      allTasks: computed,
    });
    this.taskReport = autorun(() => {
      console.log("---------------");
      console.log("All Tasks:");
      console.log(this.allTasks);
      console.log("---------------");
    });
    this.doneTaskReport = autorun(() => {
      console.log("---------------");
      console.log("Done Tasks:");
      console.log(this.doneTasks);
      console.log("---------------");
    });
    this.numTasksReport = autorun(() => {
      console.log("---------------");
      console.log("number of Tasks: " + this.tasks.length);
      console.log("---------------");
    });
  }

  addTask(task) {
    let lastId = this.tasks.length + 1;
    task.id = lastId;
    this.tasks.push(task);
  }

  editTask(task) {
    let index = this.tasks.findIndex((x) => x.id === task.id);
    this.tasks[index] = task;
  }

  doneTask(taskId) {
    this.tasks.find((x) => x.id === taskId).done = true;
  }

  deleteTask(taskId){
    this.tasks = this.tasks.filter(x => x.id != taskId);
  }

  get doneTasks() {
    return this.tasks
      .filter((x) => x.done)
      .map((x) => {
        return {
          id: x.id,
          title: x.title,
          gifts: x.gifts,
          priority: x.priority,
          done: x.done,
          desc:x.desc
        };
      });
  }

  get numTasks() {
    return this.tasks.length;
  }

  get allTasks() {
    return this.tasks.map((x) => {
      return {
        id: x.id,
        title: x.title,
        gifts: x.gifts,
        priority: x.priority,
        done: x.done,
        desc:x.desc
      };
    });
  }
}
