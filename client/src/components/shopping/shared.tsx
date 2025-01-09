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

export default function AddMember({ open, onClose, list }) {
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share list to group</DialogTitle>
      <DialogContent>
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
                event: "CREATE_SHARED_LIST",
                data: { shoppingListId: list._id, groupId: data },
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
