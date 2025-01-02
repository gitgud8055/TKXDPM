import React from "react";
import CustomPageContainer from "../utils/custom-page-container";
import { useSelector } from "react-redux";
import { getAllGroupWithMembers } from "@/store/groups";
import { Grid } from "@mui/material";
import CustomCard from "./card/group-card";

const MainGroup = () => {
  const groups = useSelector(getAllGroupWithMembers);
  console.log(groups);
  const dup = (x, cnt) => {
    return new Array(cnt).fill(x).flat();
  };
  return (
    <CustomPageContainer breadcrumbs={[]}>
      <Grid container spacing={4}>
        {groups &&
          groups.map((group) => (
            <Grid item xs={12} sm={6} lg={4} key={group._id}>
              <CustomCard
                href={`/groups/${group._id}`}
                thumbnail={`/avatars/${group.avatar}`}
                title={group.name}
                subtitle={`Created by ${group.owner.username}`}
                members={group.members!}
                description={
                  <>
                    <b>Shining Alpaca</b> and 3 others are already members of
                    this group.
                  </>
                }
              />
            </Grid>
          ))}
        {/* <Grid item xs={12} sm={6} lg={4}>
          <CustomCard
            thumbnail={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQHCBAj8nRJkEwjWg5TpNuSZZG9iscsf43V1mfx0LZHNDYW3S_&usqp=CAU"
            }
            title={"APEX Legends: Assemble!"}
            subtitle={"Created by siriwatknp"}
            description={
              <>
                <b>Shining Alpaca</b> and 3 others are already members of this
                group.
              </>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <CustomCard
            joined
            thumbnail={
              "https://cm1.narvii.com/7153/05204b8d8dcbb652dd1a8ceaafde997bc1909468_00.jpg"
            }
            title={"League of Legends Official"}
            subtitle={"Created by LoL"}
            description={
              "You are already a member of this group since April 5th 2019."
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <CustomCard
            thumbnail={"https://avatarfiles.alphacoders.com/537/53765.jpg"}
            title={"Overwatch official"}
            subtitle={"Created by Bliz"}
            description={
              <>
                <b>RainBOW</b> and 3 others are already members of this group.
              </>
            }
          />
        </Grid> */}
      </Grid>
    </CustomPageContainer>
  );
};

export default MainGroup;
