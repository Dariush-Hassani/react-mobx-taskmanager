import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../MobxStores/RootStore";
import TaskItem from "./TaskItem";

const TasksList = () => {
  const tasks = useStore().TaskStore.tasks;

  return (
    <>
      {tasks.length > 0 ? (
        <Box>
          {tasks.map((task, index) => {
            return <TaskItem task={task} haveActions={true} key={index} />;
          })}
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default observer(TasksList);