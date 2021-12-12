import { action, computed, observable, autorun, makeObservable } from "mobx";

export default class CreateEditModalStore {
  state = {
    isOpen: false,
    isEdit: false,
    editTaskId: 0,
  };

  constructor() {
    makeObservable(this, {
      state: observable,
      openForCreate: action,
      openForEdit: action,
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

  openForCreate() {
    this.state = {
      isOpen: true,
      isEdit: false,
      editTaskId: 0,
    };
  }

  openForEdit(taskId) {
    this.state = {
      isOpen: true,
      isEdit: true,
      editTaskId: taskId,
    };
  }
  close() {
    this.state = {
      isOpen: false,
      isEdit: false,
      editTaskId: 0,
    };
  }

  get reportState() {
    return {
      isOpen: this.state.isOpen,
      isEdit: this.state.isEdit,
      taskId: this.state.editTaskId,
    };
  }
}
