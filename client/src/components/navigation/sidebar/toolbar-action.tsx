import Stack from "@mui/material/Stack";

import { ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import SearchBar from "../../utils/search-bar-enter";

function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <SearchBar
        onTrigger={(e) => {
          console.log(e);
        }}
      />
      <ThemeSwitcher />
    </Stack>
  );
}

export default ToolbarActionsSearch;
