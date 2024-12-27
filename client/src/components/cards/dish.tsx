import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Entity } from "@gitgud/types";
import { useDispatch, useSelector } from "react-redux";
import { deleteFav, getFavouriteDishes, createFav } from "@/store/favs";
import Tooltip from "@mui/material/Tooltip";
import "./dish.css";
import Popover from "@mui/material/Popover";
import { Box, useTheme } from "@mui/material";
import { Link } from "@toolpad/core/internal";

export interface ReceiptType {
  data: Entity.DishDetail;
}

export default function RecipeReviewCard({ data }: ReceiptType) {
  const dispatch: any = useDispatch();
  const favList = useSelector(getFavouriteDishes);
  const author = data.owner.avatar;
  const dishName = data.name;
  const createAt = data.createdAt;
  const thumbnail = data.images[0];
  const preview = data.information;
  // const preview = new Array(100).fill(data.dish.information).join(" ");
  const added = favList.findIndex((item) => item.dish === data._id) != -1;
  const theme = useTheme();

  const addFavourite = () => {
    if (added) {
      dispatch(deleteFav(data._id));
    } else {
      dispatch(createFav(data._id));
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    // console.log("in");
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    // console.log("out");
    setAnchorEl(null);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <div
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className=" cursor-pointer"
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={`/avatars/${author}`}
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={dishName}
          subheader={
            createAt &&
            new Date(createAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }
        />
        {thumbnail && (
          <CardMedia
            component="img"
            height="194"
            image={`attachments/${thumbnail}`}
            alt={dishName}
          />
        )}
        <CardContent>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
            className="limit-div"
          >
            {preview}
          </Typography>
        </CardContent>
        <Popover
          sx={{
            pointerEvents: "none",
            display: open ? "block" : "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handlePopoverClose}
          slotProps={{
            paper: {
              sx: {
                backgroundColor: "transparent",
              },
            },
          }}
        >
          <Link href={`/favourites/${data._id}`} className=" block">
            <Box
              sx={{
                width: anchorEl?.offsetWidth,
                height: anchorEl?.offsetHeight,
                backgroundColor: theme.palette.background.paper,
                opacity: 0.8,
                pointerEvents: "all",
                cursor: "pointer",
              }}
              className=" py-4 pl-4"
            >
              <Box className="overflow-auto h-full w-full">
                <Typography>Nguyên liệu:</Typography>
                {data.materials.map((item) => (
                  <Typography
                    key={item._id}
                  >{`${item.quantity} ${item.unit} ${item.food.name}`}</Typography>
                ))}
                <Typography>
                  asldkj falsdk asld;fk jsadl kjsad;lf jsadl; jdal; jdsl; jald;j
                  fsdla;jfld ;sajl; jsdl f;jadlf jsadlf jadl fjasdlfj aldfj
                  asld; jflkjcvlkxczjv lkjalskjvxcl kjzlxcvj lcxjv ljalkjdf
                  lkjdfl kjadl; jal;djal;kfj la;sskfj s;lafj ;sldfj ladfj;sldajf
                  l;sdjf l;dasjf l;sadjf ;lsdajf ;ldaj f;lsdj fl;dja fl;jad;l
                  fjdafljsad;fl jsasldkj falsdk asld;fk jsadl kjsad;lf jsadl;
                  jdal; jdsl; jald;j fsdla;jfld ;sajl; jsdl f;jadlf jsadlf jadl
                  fjasdlfj aldfj asld; jflkjcvlkxczjv lkjalskjvxcl kjzlxcvj
                  lcxjv ljalkjdf lkjdfl kjadl; jal;djal;kfj la;sskfj s;lafj
                  ;sldfj ladfj;sldajf l;sdjf l;dasjf l;sadjf ;lsdajf ;ldaj
                  f;lsdj fl;dja fl;jad;l fjdafljsad;fl jsasldkj falsdk asld;fk
                  jsadl kjsad;lf jsadl; jdal; jdsl; jald;j fsdla;jfld ;sajl;
                  jsdl f;jadlf jsadlf jadl fjasdlfj aldfj asld; jflkjcvlkxczjv
                  lkjalskjvxcl kjzlxcvj lcxjv ljalkjdf lkjdfl kjadl;
                  jal;djal;kfj la;sskfj s;lafj ;sldfj ladfj;sldajf l;sdjf
                  l;dasjf l;sadjf ;lsdajf ;ldaj f;lsdj fl;dja fl;jad;l
                  fjdafljsad;fl jsasldkj falsdk asld;fk jsadl kjsad;lf jsadl;
                  jdal; jdsl; jald;j fsdla;jfld ;sajl; jsdl f;jadlf jsadlf jadl
                  fjasdlfj aldfj asld; jflkjcvlkxczjv lkjalskjvxcl kjzlxcvj
                  lcxjv ljalkjdf lkjdfl kjadl; jal;djal;kfj la;sskfj s;lafj
                  ;sldfj ladfj;sldajf l;sdjf l;dasjf l;sadjf ;lsdajf ;ldaj
                  f;lsdj fl;dja fl;jad;l fjdafljsad;fl jsasldkj falsdk asld;fk
                  jsadl kjsad;lf jsadl; jdal; jdsl; jald;j fsdla;jfld ;sajl;
                  jsdl f;jadlf jsadlf jadl fjasdlfj aldfj asld; jflkjcvlkxczjv
                  lkjalskjvxcl kjzlxcvj lcxjv ljalkjdf lkjdfl kjadl;
                  jal;djal;kfj la;sskfj s;lafj ;sldfj ladfj;sldajf l;sdjf
                  l;dasjf l;sadjf ;lsdajf ;ldaj f;lsdj fl;dja fl;jad;l
                  fjdafljsad;fl jsasldkj falsdk asld;fk jsadl kjsad;lf jsadl;
                  jdal; jdsl; jald;j fsdla;jfld ;sajl; jsdl f;jadlf jsadlf jadl
                  fjasdlfj aldfj asld; jflkjcvlkxczjv lkjalskjvxcl kjzlxcvj
                  lcxjv ljalkjdf lkjdfl kjadl; jal;djal;kfj la;sskfj s;lafj
                  ;sldfj ladfj;sldajf l;sdjf l;dasjf l;sadjf ;lsdajf ;ldaj
                  f;lsdj fl;dja fl;jad;l fjdafljsad;fl jsasldkj falsdk asld;fk
                  jsadl kjsad;lf jsadl; jdal; jdsl; jald;j fsdla;jfld ;sajl;
                  jsdl f;jadlf jsadlf jadl fjasdlfj aldfj asld; jflkjcvlkxczjv
                  lkjalskjvxcl kjzlxcvj lcxjv ljalkjdf lkjdfl kjadl;
                  jal;djal;kfj la;sskfj s;lafj ;sldfj ladfj;sldajf l;sdjf
                  l;dasjf l;sadjf ;lsdajf ;ldaj f;lsdj fl;dja fl;jad;l
                  fjdafljsad;fl jsasldkj falsdk asld;fk jsadl kjsad;lf jsadl;
                  jdal; jdsl; jald;j fsdla;jfld ;sajl; jsdl f;jadlf jsadlf jadl
                  fjasdlfj aldfj asld; jflkjcvlkxczjv lkjalskjvxcl kjzlxcvj
                  lcxjv ljalkjdf lkjdfl kjadl; jal;djal;kfj la;sskfj s;lafj
                  ;sldfj ladfj;sldajf l;sdjf l;dasjf l;sadjf ;lsdajf ;ldaj
                  f;lsdj fl;dja fl;jad;l fjdafljsad;fl jsasldkj falsdk asld;fk
                  jsadl kjsad;lf jsadl; jdal; jdsl; jald;j fsdla;jfld ;sajl;
                  jsdl f;jadlf jsadlf jadl fjasdlfj aldfj asld; jflkjcvlkxczjv
                  lkjalskjvxcl kjzlxcvj lcxjv ljalkjdf lkjdfl kjadl;
                  jal;djal;kfj la;sskfj s;lafj ;sldfj ladfj;sldajf l;sdjf
                  l;dasjf l;sadjf ;lsdajf ;ldaj f;lsdj fl;dja fl;jad;l
                  fjdafljsad;fl jsasldkj falsdk asld;fk jsadl kjsad;lf jsadl;
                  jdal; jdsl; jald;j fsdla;jfld ;sajl; jsdl f;jadlf jsadlf jadl
                  fjasdlfj aldfj asld; jflkjcvlkxczjv lkjalskjvxcl kjzlxcvj
                  lcxjv ljalkjdf lkjdfl kjadl; jal;djal;kfj la;sskfj s;lafj
                  ;sldfj ladfj;sldajf l;sdjf l;dasjf l;sadjf ;lsdajf ;ldaj
                  f;lsdj fl;dja fl;jad;l fjdafljsad;fl jsasldkj falsdk asld;fk
                  jsadl kjsad;lf jsadl; jdal; jdsl; jald;j fsdla;jfld ;sajl;
                  jsdl f;jadlf jsadlf jadl fjasdlfj aldfj asld; jflkjcvlkxczjv
                  lkjalskjvxcl kjzlxcvj lcxjv ljalkjdf lkjdfl kjadl;
                  jal;djal;kfj la;sskfj s;lafj ;sldfj ladfj;sldajf l;sdjf
                  l;dasjf l;sadjf ;lsdajf ;ldaj f;lsdj fl;dja fl;jad;l
                  fjdafljsad;fl js
                </Typography>
              </Box>
            </Box>
          </Link>
        </Popover>
      </div>
      <CardActions disableSpacing>
        <Tooltip title="Add to favourites" placement="top">
          <IconButton aria-label="add to favorites" onClick={addFavourite}>
            <FavoriteIcon className={added ? "text-red-600" : ""} />
          </IconButton>
        </Tooltip>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
