import { Box, Button, Dialog, IconButton, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { openDialog } from "@/store/ui";
import { actions as api } from "@/store/api";

const Div3 = styled("div")(() => ({
  "&": {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

interface EditProps {
  images: string[];
  rootId: string;
  newImages: any[];
  setNewImages: any;
}

function EditImages({ images, rootId, newImages, setNewImages }: EditProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const ref = useRef(null);
  const dispatch: any = useDispatch();
  const handleClickOpen = (e) => {
    setOpen(true);
    setModalUrl(e.target.src);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeImage = (e) => {
    const files = e.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewImages((prev) => [
          ...prev,
          { src: e.target!.result, name: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (image, id) => () => {
    dispatch(
      openDialog({
        content: "Remove this image?",
        variant: "warning",
        dialogType: "swal",
        showCancelButton: true,
        callback: (result) => {
          if (result.isConfirmed) {
            dispatch(
              api.wsCallBegan({
                event: "DELETE_DISH_IMG",
                data: {
                  id: rootId,
                  index: id,
                  image: image,
                },
              })
            );
          }
        },
      })
    );
  };
  return (
    <>
      <Box
        sx={{
          width: "500px",
          maxWidth: "100%",
          borderRadius: theme.shape,
          borderWidth: "1px",
          borderStyle: "solid",
          marginBottom: "2rem",
          padding: "5px 10px 10px",
          borderColor: theme.palette.TableCell.border,
        }}
      >
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => ref.current.click()}
        >
          Add images
        </Button>
        <input
          type="file"
          className="hidden"
          ref={ref}
          onChange={handleChangeImage}
          accept="image/*"
          formEncType="multipart/form-data"
          multiple
        />
        <div className="w-full flex flex-row overflow-x-auto gap-6 p-2">
          {images &&
            images.map((image, id) => (
              <div
                className="p-2 rounded-xl relative"
                style={{
                  backgroundColor: theme.palette.Skeleton.bg,
                }}
                key={image + id}
              >
                <div
                  className="flex flex-col"
                  style={{
                    minWidth: "200px",
                    maxWidth: "200px",
                    minHeight: "200px",
                    maxHeight: "200px",
                  }}
                >
                  <div className=" flex-1 flex justify-center items-center">
                    <img
                      src={`/attachments/${image}`}
                      alt=""
                      draggable={false}
                      className="object-contain cursor-pointer"
                      onClick={handleClickOpen}
                    />
                  </div>
                  <Div3 className=" ">{image}</Div3>
                </div>
                <div className="absolute top-0 right-0">
                  <IconButton onClick={handleDeleteImage(image, id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
              </div>
            ))}
          {newImages &&
            newImages.map((image, id) => (
              <div
                className="p-2 rounded-xl relative"
                style={{
                  backgroundColor: theme.palette.Skeleton.bg,
                }}
                key={image + id}
              >
                <div
                  className="flex flex-col"
                  style={{
                    minWidth: "200px",
                    maxWidth: "200px",
                    minHeight: "200px",
                    maxHeight: "200px",
                  }}
                >
                  <div className=" flex-1 flex justify-center items-center">
                    <img
                      src={`${image.src}`}
                      alt=""
                      draggable={false}
                      className="object-contain cursor-pointer"
                      onClick={handleClickOpen}
                    />
                  </div>
                  <Div3 className=" text-green-600">{image.name}</Div3>
                </div>
                <div className="absolute top-0 right-0">
                  <IconButton
                    onClick={() => {
                      setNewImages((prev) => {
                        const nxt = [...prev];
                        nxt.splice(id, 1);
                        return nxt;
                      });
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <img src={modalUrl} alt="" />
      </Dialog>
    </>
  );
}

export default React.memo(EditImages);
