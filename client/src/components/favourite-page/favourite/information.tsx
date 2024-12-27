import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Divider from "@mui/material/Divider";

interface InformationProps {
  infor: string;
  editMode: boolean;
}
export default function Information({ infor, editMode }: InformationProps) {
  const data = infor.split("\\n\\n").map((item) => item.split("\\n"));
  console.log(data);

  const content = () => (
    <Root sx={{ width: "500px", maxWidth: "100%" }} className="mt-8 p-4">
      <Typography variant="h6">Information</Typography>
      {data &&
        data.map((item, index) => (
          <Box key={index}>
            <Divider />
            <Box className="pt-3 pb-3">
              {item.map((item, index) => (
                <Typography key={index + "subtitle"}>
                  {item[0].toUpperCase() + item.slice(1)}
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
    </Root>
  );
  const editContent = () => (
    <Box
      component={"form"}
      sx={{ "& .MuiTextField-root": { m: 1, width: "500px" } }}
      noValidate
      autoComplete="off"
      className="mt-8"
    >
      <TextField
        id="outlined-multiline-static"
        label="Information"
        multiline
        defaultValue={infor}
      />
    </Box>
  );
  return !editMode ? content() : editContent();
}

const blue = {
  50: "#F0F7FF",
  200: "#A5D8FF",
  400: "#3399FF",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Root = styled("div")(
  ({ theme }) => `
  border-radius: 12px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  overflow: clip;
  `
);
