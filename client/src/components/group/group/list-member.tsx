import { Entity } from "@gitgud/types";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { Avatar, Button, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "@/store/ui";
import { getSelf } from "@/store/auth";
import { actions as api } from "@/store/api";
import { getGroupMembers } from "@/store/group-members";
import AddIcon from "@mui/icons-material/Add";
import AddMember from "./add-member";

interface MemberProps {
  group: Entity.Group;
}

function Toolbar({ handleOpen }) {
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
        Add member
      </Button>
    </GridToolbarContainer>
  );
}

export default React.memo(ListMember);
function ListMember({ group }: MemberProps) {
  const members = useSelector((state) => getGroupMembers(state, group._id));
  const dispatch: any = useDispatch();
  const initialRows = members.map((member) => {
    return {
      id: member._id,
      name: member.username,
      avatar: member.avatar,
    };
  });
  const [rows, setRows] = React.useState<any[]>(initialRows);
  const user = useSelector(getSelf);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log("cli");
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setRows(initialRows);
  }, [members]);

  const handleDelegate = (id: GridRowId) => () => {
    dispatch(
      openDialog({
        content: "Delegate this user to be the owner of this group?",
        variant: "warning",
        dialogType: "swal",
        showCancelButton: true,
        callback: (result) => {
          if (result.isConfirmed) {
            dispatch(
              api.wsCallBegan({
                event: "DELEGATE_MEMBER",
                data: {
                  id: group._id,
                  userId: id,
                },
              })
            );
          }
        },
      })
    );
  };

  const handleDelete = (id: GridRowId) => () => {
    dispatch(
      openDialog({
        content: "Remove this user from this group?",
        variant: "warning",
        dialogType: "swal",
        showCancelButton: true,
        callback: (result) => {
          if (result.isConfirmed) {
            dispatch(
              api.wsCallBegan({
                event: "DELETE_GROUP_MEMBER",
                data: {
                  groupId: group._id,
                  userId: id,
                },
              })
            );
          }
        },
      })
    );
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 300,
      renderCell: (params) => {
        // console.log(params);
        return (
          <Tooltip title={params.row.name}>
            <div className="flex flex-row items-center h-full w-full gap-[0_8px]">
              <Avatar
                src={`/avatars/${params.row.avatar}`}
                sx={{
                  height: "2rem",
                  width: "2rem",
                }}
              />
              <Typography>{params.row.name}</Typography>
            </div>
          </Tooltip>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: ({ id }) => {
        if (user._id !== group.owner._id) return [];
        return [
          <Tooltip title="Delegate owner">
            <GridActionsCellItem
              icon={<ThumbUpIcon />}
              label="Delegate"
              sx={{
                color: "primary.main",
              }}
              onClick={handleDelegate(id)}
            />
          </Tooltip>,
          <Tooltip title="Delete">
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              sx={{
                color: "primary.main",
              }}
              onClick={handleDelete(id)}
            />
          </Tooltip>,
        ];
      },
    },
  ];

  return (
    <>
      <AddMember open={open} onClose={handleClose} group={group} />
      <div className="flex justify-center">
        <Box
          sx={{
            maxHeight: "400px",
            width: "500px",
            maxWidth: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{ toolbar: Toolbar }}
            slotProps={{ toolbar: { handleOpen } }}
          />
        </Box>
      </div>
    </>
  );
}
