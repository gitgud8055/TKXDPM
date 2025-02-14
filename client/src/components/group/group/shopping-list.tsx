import React, { useEffect } from "react";
import { Entity } from "@gitgud/types";
import {
  Avatar,
  CardHeader,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { actions as api } from "@/store/api";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlotProps,
  GridRowProps,
} from "@mui/x-data-grid";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { openDialog } from "@/store/ui";
import { getIngredientsSpecial } from "@/store/ingredients";

declare module "@mui/x-data-grid" {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
    setNewRow: (old) => void;
  }
}

function EditToolbar(props: GridSlotProps["toolbar"]) {
  const { setRows, setRowModesModel, setNewRow, data, dispatch, group } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", quantity: "", unit: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit },
    }));
    setNewRow((old) => ({
      ...old,
      [id]: true,
    }));
  };

  return (
    <GridToolbarContainer className="flex flex-col">
      <CardHeader
        avatar={
          <Avatar
            // sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={`/avatars/${data.owner.avatar}`}
          ></Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={data.owner.username}
        subheader={
          data.date &&
          new Date(data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }
      />
      <div className="w-full px-3">
        <Typography>{data.note}</Typography>
      </div>
      {/* <div className="w-full flex flex-row">
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
        <Button
          color="warning"
          startIcon={<DeleteIcon />}
          onClick={() => {
            dispatch(
              openDialog({
                content: "Do you want to delete this list?",
                variant: "warning",
                dialogType: "swal",
                showCancelButton: true,
                callback: (result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      api.wsCallBegan({
                        event: "DELETE_SHOPPING_LIST",
                        data: {
                          id: data._id,
                        },
                      })
                    );
                  }
                },
              })
            );
          }}
        >
          Delete list
        </Button>
      </div> */}
      <div className="w-full flex flex-row">
        <Tooltip title="Add item">
          <Button color="primary" onClick={handleClick}>
            <AddIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Delete list">
          <Button
            color="warning"
            onClick={() => {
              dispatch(
                openDialog({
                  content: "Do you want to delete this list?",
                  variant: "warning",
                  dialogType: "swal",
                  showCancelButton: true,
                  callback: (result) => {
                    if (result.isConfirmed) {
                      dispatch(
                        api.wsCallBegan({
                          event: "DELETE_SHOPPING_LIST",
                          data: {
                            id: data._id,
                          },
                        })
                      );
                    }
                  },
                })
              );
            }}
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Remove list">
          <Button
            color="primary"
            onClick={() => {
              dispatch(
                openDialog({
                  content: "Do you want to remove this list to your group?",
                  variant: "warning",
                  dialogType: "swal",
                  showCancelButton: true,
                  callback: (result) => {
                    if (result.isConfirmed) {
                      dispatch(
                        api.wsCallBegan({
                          event: "DELETE_SHARED_LIST",
                          data: {
                            id: data._id,
                            groupId: group._id,
                          },
                        })
                      );
                    }
                  },
                })
              );
            }}
          >
            <RemoveShoppingCartIcon />
          </Button>
        </Tooltip>
      </div>
    </GridToolbarContainer>
  );
}

export default React.memo(ShoppingList);

function ShoppingList({ data, group }) {
  console.log(data);
  const dispatch: any = useDispatch();
  const ingredients = useSelector(getIngredientsSpecial);
  // const initialRows: GridRowsProp = data.list.map((item) => {
  //   return {
  //     id: randomId(),
  //     _id: item._id,
  //     name: item.food.name,
  //     quantity: item.quantity,
  //     unit: item.unit,
  //     acceptedUnit: item.food.unit,
  //   };
  // });
  const [rows, setRows] = React.useState<GridRowProps[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [newRow, setNewRow] = React.useState({});
  useEffect(() => {
    setRows(
      data.list.map((item) => {
        return {
          id: randomId(),
          _id: item._id,
          name: item.food.name,
          quantity: item.quantity,
          unit: item.unit,
          note: item.note,
          acceptedUnit: item.food.unit,
        };
      })
    );
  }, [data]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(
      openDialog({
        content: "Remove this ingredient?",
        variant: "warning",
        dialogType: "swal",
        showCancelButton: true,
        callback: (result) => {
          if (result.isConfirmed) {
            dispatch(
              api.wsCallBegan({
                event: "DELETE_SHOPPING_FOOD",
                data: {
                  list: data._id,
                  id: rows.find((row) => row.id === id)!._id,
                },
              })
            );
            setRows(rows.filter((row) => row.id !== id));
          }
        },
      })
    );
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (NewRow: GridRowModel) => {
    const updatedRow = { ...NewRow, isNew: false };
    if (newRow[NewRow.id] === true) {
      dispatch(
        api.wsCallBegan({
          event: "ADD_SHOPPING_FOOD",
          data: {
            list: data._id,
            name: NewRow.name,
            quantity: NewRow.quantity,
            unit: NewRow.unit,
            note: NewRow.note,
          },
        })
      );
    } else {
      dispatch(
        api.wsCallBegan({
          event: "UPDATE_SHOPPING_FOOD",
          data: {
            list: data._id,
            id: NewRow._id,
            // name: NewRow.name,
            quantity: NewRow.quantity,
            unit: NewRow.unit,
            note: NewRow.note,
          },
        })
      );
    }
    setNewRow((prev) => ({ ...prev, [NewRow.id]: false }));
    setRows(rows.map((row) => (row.id === NewRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
      type: "singleSelect",
      valueOptions: (params) => {
        return ingredients.names;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: (params) => {
        if (params.row.acceptedUnit) return params.row.acceptedUnit;
        const food = ingredients.data.get(params.row.name);
        if (!food) return [];
        return food.unit;
      },
    },
    {
      field: "note",
      headerName: "Note",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <Tooltip title="Save">
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleSaveClick(id)}
              />
            </Tooltip>,
            <Tooltip title="Cancel">
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />
            </Tooltip>,
          ];
        }

        return [
          <Tooltip title="Edit">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />
          </Tooltip>,
          <Tooltip title="Delete">
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />
          </Tooltip>,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        maxHeight: "400px",
        width: "700px",
        maxWidth: "100%",
        marginTop: "1rem",
        marginBottom: "1rem",
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
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        isCellEditable={(params) => {
          return newRow[params.id] === true || params.field !== "name";
        }}
        slotProps={{
          toolbar: {
            setRows,
            setRowModesModel,
            setNewRow,
            data,
            dispatch,
            group,
          },
        }}
        hideFooterSelectedRowCount
      />
    </Box>
  );
}
