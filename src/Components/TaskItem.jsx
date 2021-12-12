import { Typography, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import React from "react";
import { PriorityEnum } from "../Config";
import { useStore } from "../MobxStores/RootStore";
import {
  CircleBox,
  DescriptionTypography,
  TaskListBox,
  OrangeButton,
  FlexEndBox,
  GreenButton,
  DoneTaskIcon,
} from "./_StyledComponents";

const TaskItem = ({ task, haveActions }) => {
  //Priority Info
  const priority = PriorityEnum.find((x) => x.id === task.priority);

  //mobx
  const store = useStore();
  const modalStore = store.CreateEditModalStore;
  const taskStore = store.TaskStore;
  const infoModalStore = store.TaskInfoModalStore;

  const edit = () => {
    modalStore.openForEdit(task.id);
  };

  const done = () => {
    taskStore.doneTask(task.id);
  };

  const openInfoModal = (e) => {
    if (!haveActions || e.target.tagName === "BUTTON") return;
    infoModalStore.open(task.id);
  };

  return (
    <TaskListBox
      sx={{ marginTop: 1, border: "1px solid black" }}
      onClick={openInfoModal}
    >
      <Box>
        <Typography variant="h6">{task.title}</Typography>
        <DescriptionTypography sx={{ fontSize: 13, color: "gray" }}>
          {task.desc.trim().length > 50
            ? task.desc.substr(0, 50) + " ..."
            : task.desc}
        </DescriptionTypography>
      </Box>
      <Box>
        <FlexEndBox>
          <Typography variant="span">{priority?.title}</Typography>
          <CircleBox sx={{ backgroundColor: priority?.color }}></CircleBox>
        </FlexEndBox>
        {haveActions ? (
          <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
            {task.done ? (
              <DoneTaskIcon />
            ) : (
              <GreenButton onClick={done} sx={{ height: "30px" }}>
                Done
              </GreenButton>
            )}

            <OrangeButton onClick={edit} sx={{ height: "30px" }}>
              Edit
            </OrangeButton>
          </Stack>
        ) : (
          <></>
        )}
      </Box>
    </TaskListBox>
  );
};

export default observer(TaskItem);
