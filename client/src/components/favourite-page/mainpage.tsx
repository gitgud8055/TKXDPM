import React, { useEffect } from "react";
import Dish from "../cards/dish";
import { useDispatch, useSelector } from "react-redux";
import CustomPageContainer from "../utils/custom-page-container";
import SearchBar from "../utils/search-bar-auto";
import { selectFavDish } from "@/store/dish";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { actions as api } from "@/store/api";

const Mainpage = () => {
  const favDishes = useSelector(selectFavDish);
  const [list, setList] = React.useState(favDishes);
  const [search, setSearch] = React.useState("");
  const dispatch: any = useDispatch();
  console.log(favDishes);

  useEffect(() => {
    setList(
      favDishes.filter((item) => {
        return item?.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [favDishes]);

  const header = React.useCallback(() => {
    return (
      <div className="w-full flex flex-row">
        <SearchBar
          onTrigger={(data) => {
            setSearch(data);
            setList(
              favDishes.filter((item) => {
                console.log(item, search);
                return item?.name.toLowerCase().includes(data.toLowerCase());
              })
            );
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            dispatch(
              api.wsCallBegan({
                event: "CREATE_DISH",
                data: {},
              })
            );
          }}
        >
          Add dish
        </Button>
      </div>
    );
  }, []);

  return (
    <CustomPageContainer breadcrumbs={[]} slots={{ header }} addHeader>
      <div className="flex h-full w-full flex-row flex-wrap justify-center mt-3 gap-3">
        {list &&
          list.map((item) => (
            <div key={item._id}>
              <Dish data={item} />
            </div>
          ))}
      </div>
    </CustomPageContainer>
  );
};

export default Mainpage;
