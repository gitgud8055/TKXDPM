import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import { getInfoApexStyles } from "@/mui-treasury/info-apex";
import { Info, InfoSubtitle, InfoTitle } from "@/mui-treasury/info-basic";
import { Link } from "@toolpad/core/internal";

const DivRoot = styled("div")(() => ({
  height: "100%",
  transition: "0.3s",
  position: "relative",

  "&:before": {
    transition: "0.2s",
    position: "absolute",
    width: "100%",
    height: "100%",
    content: '""',
    display: "block",
    backgroundColor: "#d9daf1",
    borderRadius: "1rem",
    zIndex: 0,
    bottom: 0,
  },

  "&:hover": {
    "&:before": {
      bottom: -6,
    },
    "& $card": {
      boxShadow: "-12px 12px 64px 0 #bcc3d6",
    },
  },
}));

const ColumnCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  zIndex: 1,
  position: "relative",
  borderRadius: "1rem",
  boxShadow: "0 6px 20px 0 #dbdbe8",
  backgroundColor: theme.palette.background.paper,
  transition: "0.2s",
  height: "100%",
}));

const AvatarLogo = styled(Avatar)(() => ({
  width: 48,
  height: 48,
  borderRadius: "0.75rem",
}));

const ButtonJoin = styled(Button)(() => ({
  borderRadius: 50,
  textTransform: "initial",
  "&:focus": {
    boxShadow:
      "0 4px 6px 2px rgba(0,0,0,0.08), 0px 2px 4px 0px rgba(0,0,0,0.24), inset 0 -3px 0 0 rgba(0,0,0,0.12)",
  },
  "&:active": {
    boxShadow: `inset 0 4px 4px 0 rgba(0,0,0,0.14)`,
  },
  textShadow: "0 1px 0 rgba(0,0,0,0.2)",
  transition: "0.2s",
  background: `linear-gradient(to top, #638ef0, #82e7fe)`,
  boxShadow:
    "0 4px 6px 2px rgba(0,0,0,0.08), 0px 2px 4px 0px rgba(0,0,0,0.24), inset 0 -3px 0 0 rgba(0,0,0,0.12)",
  "&:hover": {
    borderBottom: "none",
  },
  "& > *": {
    textTransform: "none !important",
  },
}));

const CustomCard = ({
  title,
  subtitle,
  description,
  thumbnail,
  joined,
  members,
  href,
}: {
  title: string;
  subtitle: string;
  description: React.ReactNode;
  thumbnail: string;
  joined?: boolean;
  members: any[];
  href: string;
}) => (
  <DivRoot>
    <ColumnCard>
      <Box display="flex" p={2} gap={2} flexWrap="nowrap">
        <AvatarLogo variant={"rounded"} src={thumbnail} />
        <Info useStyles={getInfoApexStyles} sx={{ alignSelf: "center" }}>
          <InfoTitle>{title}</InfoTitle>
          <InfoSubtitle>{subtitle}</InfoSubtitle>
        </Info>
      </Box>
      <Box
        pb={1}
        px={2}
        color={"grey.600"}
        fontSize={"0.875rem"}
        fontFamily={"Ubuntu"}
        flexGrow={1}
      >
        {description}
      </Box>
      <Box
        display="flex"
        p={2}
        gap={2}
        sx={{
          flexWrap: "wrap",
          justifyContent: "space-between",
          "&& > *": {
            minWidth: `clamp(0px, (248px + 1px - 100%) * 999, 100%)`,
          },
        }}
      >
        <Box>
          <AvatarGroup
            max={4}
            sx={{
              "& .MuiAvatar-root": {
                fontFamily: "Ubuntu",
                fontSize: "0.875rem",
                backgroundColor: "#6d7efc",
                width: 32,
                height: 32,
                "&:first-of-type": {
                  marginRight: "auto",
                },
              },
            }}
          >
            {members &&
              members.map((member, index) => {
                if (index < 3)
                  return (
                    <Avatar key={index} src={`/avatars/${member.avatar}`} />
                  );
                else return <Avatar></Avatar>;
              })}
          </AvatarGroup>
        </Box>
        <Link href={href}>
          <ButtonJoin variant={"contained"} color={"primary"} disableRipple>
            {joined ? "Leave group" : "Join group"}
          </ButtonJoin>
        </Link>
      </Box>
    </ColumnCard>
  </DivRoot>
);

export default CustomCard;
