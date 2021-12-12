import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { PriorityEnum } from "../Config";
import { useStore } from "../MobxStores/RootStore";
import {
  CenterTypography,
  CircleBox,
  CustomDialogTitle,
  DoneTaskIcon,
  GreenButton,
  OrangeButton,
  RedButton,
} from "./_StyledComponents";

const TaskInfoModal = () => {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState();

  //mobx
  const store = useStore();
  const modalStore = store.TaskInfoModalStore;
  const modalState = modalStore.state;
  const taskStore = store.TaskStore;
  const tasks = taskStore.tasks;

  const createEditModalStore = store.CreateEditModalStore;

  //Priority Info
  const priority = PriorityEnum.find((x) => x.id === task?.priority);

  //Modal Actions
  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    if (open) modalStore.close();
    setOpen(false);
  };

  const done = () => {
    taskStore.doneTask(task.id);
  };

  const edit = () => {
    closeDialog();
    createEditModalStore.openForEdit(task.id);
  };

  const delet = () => {
    closeDialog();
    taskStore.deleteTask(task.id);
  };

  //Effects
  useEffect(() => {
    if (modalState.isOpen) {
      openDialog();
      setTask(tasks.find((x) => x.id === modalState.taskId));
    } else {
      closeDialog();
    }
  }, [modalState]);
  return (
    <div>
      <Dialog open={open} onClose={closeDialog}>
        <CustomDialogTitle>
          <Box>
            <CenterTypography variant="h6">
              Task Number {task?.id} ({task?.title})
            </CenterTypography>
          </Box>
          <Box>
            <CircleBox sx={{ backgroundColor: priority?.color }}></CircleBox>
            <Typography variant="span" sx={{ marginLeft: 1 }}>
              {priority?.title}
            </Typography>
          </Box>
        </CustomDialogTitle>
        <DialogContent>
          <Typography sx={{ padding: "0 10px" }}>{task?.desc}</Typography>
        </DialogContent>
        <DialogActions>
          {task?.done ? (
            <DoneTaskIcon sx={{ marginRight: "10px" }} />
          ) : (
            <GreenButton onClick={done}>Done</GreenButton>
          )}
          <OrangeButton onClick={edit}>Edit</OrangeButton>
          <RedButton onClick={delet}>Delete</RedButton>
          <Button variant="outlined" color="error" onClick={closeDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default observer(TaskInfoModal);
