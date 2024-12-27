import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

type searchBarProps = {
  onTrigger?: (data: string) => void;
};

export default function SearchBar({ onTrigger }: searchBarProps) {
  const [data, setData] = React.useState<string>("");
  return (
    <>
      <Tooltip title="Search" enterDelay={1000}>
        <div id="123">
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: "inline", sm: "none" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                type="button"
                aria-label="search"
                size="small"
                onClick={onTrigger ? () => onTrigger!(data) : undefined}
              >
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: "none", sm: "inline-block" }, mr: 1 }}
        onKeyUp={
          onTrigger
            ? (e: any) => {
                if (e.key == "Enter") onTrigger!(data);
                else setData(e.target.value);
              }
            : undefined
        }
      />
    </>
  );
}
