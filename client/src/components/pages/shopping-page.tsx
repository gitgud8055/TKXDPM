import React, { useEffect } from "react";
import SidebarWrapper from "../navigation/sidebar/sidebar-wrapper";
import CustomPageContainer from "../utils/custom-page-container";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useDispatch } from "react-redux";
import { actions as api } from "../../store/api";
import ShoppingList from "../shopping/shopping-list";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ShoppingPage() {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [data, setData] = React.useState([]);
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(
      api.restCallBegan({
        method: "get",
        url: `/api/shopping?date=${date?.format("YYYY-MM-DD")}`,
        callback: (rawdata) => {
          console.log("Received: ", rawdata[0].list);
          const data = rawdata.map((rawdata) => {
            const food = new Map(rawdata.foods.map((x) => [x._id, x]));
            console.log(rawdata.list);
            rawdata.list = rawdata.list.map((item) => {
              return { ...item, food: food.get(item.food) };
            });
            return rawdata;
          });
          setData(data);
        },
      })
    );
  }, [date]);
  return (
    <SidebarWrapper>
      <CustomPageContainer breadcrumbs={[]}>
        <div className="flex flex-row">
          <div className="flex-1 h-full">
            <Button
              startIcon={<AddIcon />}
              onClick={() => {
                dispatch(
                  api.wsCallBegan({
                    event: "CREATE_SHOPPING_LIST",
                    data: { date: date?.toISOString(), name: "", note: "" },
                  })
                );
              }}
            >
              Add list
            </Button>
            {data.map((data) => (
              <ShoppingList data={data} />
            ))}
          </div>
          <div className="h-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker value={date} onChange={(v) => setDate(v)} />

              {/* <DemoContainer
                components={[
                  "DatePicker",
                  "MobileDatePicker",
                  "DesktopDatePicker",
                  "StaticDatePicker",
                ]}
              >
                <DemoItem label="Static variant"></DemoItem>
              </DemoContainer> */}
            </LocalizationProvider>
          </div>
        </div>
      </CustomPageContainer>
    </SidebarWrapper>
  );
}
