import React from "react";
import {
  CenterFlexBox,
  CircleFixedButton,
  OrangeButton,
} from "./_StyledComponents";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import { useStore } from "../MobxStores/RootStore";

const CreateTask = () => {
  //mobx
  const store = useStore();
  const numTasks = store.TaskStore.numTasks;
  const createEditModalStore = store.CreateEditModalStore;

  const clickAddBtn = () => {
    createEditModalStore.openForCreate();
  }
  
  return (
    <div>
      <>
        {numTasks === 0 ? (
          <CenterFlexBox sx={{ marginTop: 25 }}>
            <OrangeButton variant="contained" onClick={clickAddBtn}>
              Create your first task
            </OrangeButton>
          </CenterFlexBox>
        ) : (
          <CircleFixedButton onClick={clickAddBtn}>
            <AddIcon />
          </CircleFixedButton>
        )}
      </>
    </div>
  );
};

export default observer(CreateTask);
