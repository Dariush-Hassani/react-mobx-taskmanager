import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { CustomDialogTitle } from "./_StyledComponents";
import { useStore } from "../MobxStores/RootStore";
import { observer } from "mobx-react-lite";

function CreateEditModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [titleValidation, setTitleValidation] = useState(null);
  const [desc, setDesc] = useState("");
  const [descValidation, setDescValidation] = useState(null);
  const [gifts, setGifts] = useState("");
  const [giftsValidation, setGiftsValidation] = useState(null);
  const [done, setDone] = useState(false);
  const [priority, setPriority] = useState(0);

  //mobx
  const store = useStore();
  const modalStore = store.CreateEditModalStore;
  const modalState = modalStore.reportState;
  const taskStore = store.TaskStore;
  const tasks = taskStore.tasks;

  //open and close modal and reset values
  const closeDialog = () => {
    setOpen(false);
    setTitle("");
    setDesc("");
    setGifts("");
    setTitleValidation(null);
    setDescValidation(null);
    setGiftsValidation(null);
    setPriority(0);
    setDone(false);
    if (open) modalStore.close();
  };

  const openDialog = () => {
    setOpen(true);
  };

  //validations and create or edit task
  const validation = () => {
    let validate = true;
    if (title.trim().length === 0) {
      validate = false;
      setTitleValidation("Please enter title");
    }
    if (desc.trim().length === 0) {
      validate = false;
      setDescValidation("Please enter description");
    }
    if (gifts.trim().length === 0) {
      validate = false;
      setGiftsValidation("Please enter gifts");
    }
    return validate;
  };

  const createOrEditTask = () => {
    if (!validation()) return;
    let task = { title, desc, gifts, priority, done };

    if (modalState.isEdit) {
      task.id = modalState.taskId;
      taskStore.editTask(task);
    } else {
      taskStore.addTask(task);
    }
    closeDialog();
  };

  //Form control events
  const titleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim().length > 0) setTitleValidation(null);
  };

  const descChange = (e) => {
    setDesc(e.target.value);
    if (e.target.value.trim().length > 0) setDescValidation(null);
  };

  const giftsChange = (e) => {
    setGifts(e.target.value);
    if (e.target.value.trim().length > 0) setGiftsValidation(null);
  };

  const priorityChange = (e) => setPriority(parseInt(e.target.value));

  //Effects
  useEffect(() => {
    if (modalState.isOpen) {
      openDialog();

      if (modalState.isEdit) {
        let task = tasks.find((x) => x.id === modalState.taskId);
        setTitle(task.title);
        setDesc(task.desc);
        setGifts(task.gifts);
        setPriority(task.priority);
        setDone(task.done);
      }
    } else {
      closeDialog();
    }
  }, [modalState]);

  return (
    <>
      <Dialog open={open} onClose={closeDialog}>
        <CustomDialogTitle>
          {modalState.isEdit
            ? `Edit ${tasks.find((x) => x.id === modalState.taskId).title} Task`
            : "Create a new task"}
        </CustomDialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            <TextField
              autoFocus
              label="Task Title"
              fullWidth
              error={titleValidation === null ? false : true}
              helperText={titleValidation === null ? "" : titleValidation}
              variant="outlined"
              value={title}
              onChange={titleChange}
            />
            <TextField
              label="Task description"
              fullWidth
              error={descValidation === null ? false : true}
              helperText={descValidation === null ? "" : descValidation}
              variant="outlined"
              multiline
              rows={5}
              value={desc}
              onChange={descChange}
            />
            <TextField
              label="Gifts and KPIs"
              fullWidth
              error={giftsValidation === null ? false : true}
              helperText={giftsValidation === null ? "" : giftsValidation}
              variant="outlined"
              value={gifts}
              onChange={giftsChange}
            />
          </Stack>

          <RadioGroup
            aria-label="gender"
            name="controlled-radio-buttons-group"
            row
            sx={{ marginTop: 1 }}
            defaultValue={0}
            value={priority}
            onChange={priorityChange}
          >
            <FormControlLabel value={0} control={<Radio />} label="Low" />
            <FormControlLabel value={1} control={<Radio />} label="Medium" />
            <FormControlLabel value={2} control={<Radio />} label="High" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={closeDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={createOrEditTask}
          >
            {modalState.isEdit ? "Edit Task" : "Add to tasks"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default observer(CreateEditModal);
