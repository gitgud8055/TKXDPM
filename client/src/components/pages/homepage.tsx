import React, { useRef, useState } from "react";
import SidebarWrapper from "../navigation/sidebar/sidebar-wrapper";
import { Link } from "react-router-dom";
import CustomPageContainer from "../utils/custom-page-container";
import Test from "./test";
import Wrapper from "./wrapper";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { uploadFile } from "@/store/api";

const Homepage = () => {
  const ref = useRef(null);
  const [url, setUrl] = useState("");
  const dispatch: any = useDispatch();
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUrl(e.target!.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <SidebarWrapper>
        <CustomPageContainer breadcrumbs={[]}>
          <input
            type="file"
            name=""
            id=""
            className="hidden"
            ref={ref}
            onChange={handleChangeImage}
            accept="image/*"
            formEncType="multipart/form-data"
          />
          <Button
            onClick={(e) => {
              ref.current.click();
            }}
          >
            Click me
          </Button>
          <img src={url} alt="" className="h-16 w-16" />
          <Button
            onClick={() => {
              if (ref.current.files && ref.current.files.length > 0) {
                dispatch(uploadFile(ref.current.files[0], () => {}));
              }
            }}
          >
            submit
          </Button>
        </CustomPageContainer>
      </SidebarWrapper>
    </>
  );
};

export default Homepage;
