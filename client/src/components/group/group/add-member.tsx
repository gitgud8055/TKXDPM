import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions as api } from "@/store/api";

export default function AddMember({ open, onClose, group }) {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add member</DialogTitle>
      <DialogContent>
        <DialogContentText>You can add member with user's id</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="ID"
          type="email"
          fullWidth
          variant="outlined"
          onChange={(e) => setData(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            dispatch(
              api.wsCallBegan({
                event: "ADD_MEMBER",
                data: { groupId: group._id, userId: data },
              })
            );
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
