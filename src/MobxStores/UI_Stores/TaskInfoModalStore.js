import { action, computed, observable, autorun, makeObservable } from "mobx";

export default class TaskInfoModalStore {
  state = {
    isOpen: false,
    taskId: 0,
  };

  constructor() {
    makeObservable(this, {
      state: observable,
      open: action,
      close: action,
      reportState: computed,
    });
    autorun(() => {
      console.log('---------------');
      console.log("createEditModal State:");
      console.log(this.reportState);
      console.log('---------------');
    });
  }

  open(id) {
    this.state = {
      isOpen: true,
      taskId: id,
    };
  }

  close() {
    this.state = {
      isOpen: false,
      taskId: 0,
    };
  }

  get reportState() {
    return {
      isOpen: this.state.isOpen,
      taskId: this.state.taskId,
    };
  }
}
