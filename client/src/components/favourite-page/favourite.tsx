import React, { useRef, useState } from "react";
import CustomPageContainer from "../utils/custom-page-container";
import { Breadcrumb, useActivePage } from "@toolpad/core";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ImageSlider from "../utils/image-slider";
import { Box, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import ReadIngredients from "./favourite/read-ingredients";
import EditIcon from "@mui/icons-material/Edit";
import Information from "./favourite/information";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import EditIngredients from "./favourite/edit-ingredients";
import { getDishById } from "@/store/dish";
import { getSelf } from "@/store/auth";
import EditImages from "./favourite/edit-images";
import { actions as api, uploadFile } from "@/store/api";
import toFile from "@/utils/dataURL-to-file";

export interface FileProps {
  src: string;
  name: string;
}

const Favourite = ({ id }) => {
  const activePage = useActivePage();
  const currentDish = useSelector((state) => getDishById(state, id));
  const userId = useSelector(getSelf)._id;
  const canEdit = userId === currentDish.owner._id;
  const [editMode, setEditMode] = React.useState(false);
  const editting = canEdit && editMode;
  const [infor, setInfor] = useState("");
  const [newImages, setNewImages] = useState<FileProps[]>([]);
  const dispatch: any = useDispatch();
  const ref = useRef(null);
  console.log(newImages);
  const header = React.useCallback(() => {
    return (
      <div className=" flex-1 flex items-center">
        {!editting ? (
          canEdit ? (
            <Tooltip title="Edit mode">
              <IconButton onClick={() => setEditMode(true)}>
                <EditIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          ) : null
        ) : (
          <>
            <Tooltip title="Save changes">
              <IconButton onClick={handleSave}>
                <DoneAllIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton
                onClick={() => {
                  setEditMode(false);
                  resetUpdate();
                }}
              >
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </div>
    );
  }, [editting, newImages, infor]);
  if (!activePage || !currentDish) return <Navigate to={"/favourites"} />;
  const breadcrumbs: Breadcrumb[] = [
    ...activePage.breadcrumbs,
    { title: `${id}`, path: `${activePage?.path}/${id}` },
  ];

  const resetUpdate = () => {
    setNewImages([]);
    setInfor("");
  };

  const handleSave = async () => {
    const imageNames = await Promise.all(
      newImages.map(
        (image) =>
          new Promise((resolve) => {
            dispatch(
              uploadFile(toFile(image.src, image.name), ({ name }) => {
                resolve(name);
              })
            );
          })
      )
    );
    dispatch(
      api.wsCallBegan({
        event: "UPDATE_DISH",
        data: {
          id: currentDish._id,
          name: ref.current.value,
          images: imageNames,
          information: infor !== "" ? infor : undefined,
        },
      })
    );
    setEditMode(false);
    resetUpdate();
  };
  // console.log(currentDish);
  return (
    <CustomPageContainer
      breadcrumbs={breadcrumbs}
      title={currentDish.name}
      // slots={{ header }}
      // addHeader
    >
      {!editting && <ImageSlider images={currentDish.images} />}
      <Stack className=" flex flex-col mt-4 items-center">
        <div className="w-[500px] max-w-full mb-2">{header()}</div>
        {!editMode ? (
          <ReadIngredients materials={currentDish.materials} />
        ) : (
          <>
            <Box
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  width: "500px",
                  maxWidth: "100%",
                },
                maxWidth: "100%",
              }}
              className="mb-2"
            >
              <TextField
                id="outlined-multiline-static"
                label="Name"
                defaultValue={currentDish.name}
                inputRef={ref}
                onClick={(e) => e.preventDefault()}
              />
            </Box>
            <EditImages
              images={currentDish.images}
              setNewImages={setNewImages}
              newImages={newImages}
              rootId={currentDish._id}
            />
            <EditIngredients
              materials={currentDish.materials}
              rootId={currentDish._id}
            />
          </>
        )}
        <Information
          infor={currentDish.information}
          editMode={editting}
          onChange={(e) => setInfor(e.target.value)}
        />
      </Stack>
    </CustomPageContainer>
  );
};

export default Favourite;
