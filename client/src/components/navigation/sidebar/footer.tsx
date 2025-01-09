import { Button, Divider, Stack, Typography } from "@mui/material";
import {
  Account,
  AccountPopoverFooter,
  AccountPreview,
  AccountPreviewProps,
  SidebarFooterProps,
  SignOutButton,
} from "@toolpad/core";
import React from "react";
import Setting from "../../utils/update-user";

function AccountSidebarPreview(props: AccountPreviewProps & { mini: boolean }) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0} overflow="hidden">
      <Divider />
      <AccountPreview
        variant={mini ? "condensed" : "expanded"}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

function SidebarFooterAccountPopover({ handleClick }: any) {
  return (
    <Stack direction="column">
      {/* <Typography variant="body2" mx={2} mt={1}>
        Accounts
      </Typography> */}
      <Button onClick={handleClick}>Setting</Button>

      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

const createPreviewComponent = (mini: boolean) => {
  function PreviewComponent(props: AccountPreviewProps) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

export default function SidebarFooterAccount({ mini }: SidebarFooterProps) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const PreviewComponent = React.useMemo(
    () => createPreviewComponent(mini),
    [mini]
  );
  return (
    <>
      <Setting open={open} onClose={handleClose} />
      <Account
        slots={{
          preview: PreviewComponent,
          popoverContent: SidebarFooterAccountPopover,
        }}
        slotProps={{
          popoverContent: {
            handleClick,
          },
          popover: {
            transformOrigin: { horizontal: "left", vertical: "bottom" },
            anchorOrigin: { horizontal: "right", vertical: "bottom" },
            disableAutoFocus: true,
            slotProps: {
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: (theme) =>
                    `drop-shadow(0px 2px 8px ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.32)"})`,
                  mt: 1,
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translate(-50%, -50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            },
          },
        }}
      />
    </>
  );
}
