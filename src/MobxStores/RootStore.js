import React, { useContext } from "react";
import TaskStore from "./Domain_Stores/TaskStore";
import CreateEditModalStore from './UI_Stores/CreateEditModalStore';
import TaskInfoModalStore from "./UI_Stores/TaskInfoModalStore";

class RootStore {
  constructor() {
    this.TaskStore = new TaskStore();
    this.CreateEditModalStore = new CreateEditModalStore();
    this.TaskInfoModalStore = new TaskInfoModalStore();
  }
}

const StoreContext = React.createContext(null);

export const Provider = ({ children }) => (
  <StoreContext.Provider value={new RootStore()}>{children}</StoreContext.Provider>
);

export const useStore = () => useContext(StoreContext);
