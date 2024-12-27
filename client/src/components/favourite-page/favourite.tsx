import React, { useEffect } from "react";
import CustomPageContainer from "../utils/custom-page-container";
import { Breadcrumb, useActivePage } from "@toolpad/core";

import { useSelector } from "react-redux";
import { getFavouriteDishes } from "../../store/favs";
import { Navigate } from "react-router-dom";
import ImageSlider from "../utils/image-slider";
import Box from "@mui/material/Box";
import { IconButton, Stack, Tooltip } from "@mui/material";
import ReadIngredients from "./favourite/read-ingredients";
import EditIcon from "@mui/icons-material/Edit";
import Information from "./favourite/information";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import EditIngredients from "./favourite/edit-ingredients";
import { getDishById } from "@/store/dish";
import { getSelf } from "@/store/auth";

const Favourite = ({ id }) => {
  const activePage = useActivePage();
  const currentDish = useSelector((state) => getDishById(state, id));
  const userId = useSelector(getSelf)._id;
  const canEdit = userId === currentDish.owner._id;
  const [editMode, setEditMode] = React.useState(false);
  const editting = canEdit && editMode;
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
              <IconButton>
                <DoneAllIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton onClick={() => setEditMode(false)}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </div>
    );
  }, [editting]);
  if (!activePage || !currentDish) return <Navigate to={"/favourites"} />;
  const breadcrumbs: Breadcrumb[] = [
    ...activePage.breadcrumbs,
    { title: `${id}`, path: `${activePage?.path}/${id}` },
  ];
  console.log(currentDish);
  return (
    <CustomPageContainer
      breadcrumbs={breadcrumbs}
      title={currentDish.name}
      // slots={{ header }}
      // addHeader
    >
      <ImageSlider images={currentDish.images} editMode={editting} />
      <Stack className=" flex flex-col mt-4 items-center">
        <div className="w-[500px] mb-2">{header()}</div>
        {!editMode ? (
          <ReadIngredients materials={currentDish.materials} />
        ) : (
          <EditIngredients
            materials={currentDish.materials}
            rootId={currentDish._id}
          />
        )}
        <Information infor={currentDish.information} editMode={editting} />
      </Stack>
    </CustomPageContainer>
  );
};

export default Favourite;
