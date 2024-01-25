import { Box, IconButton, Typography } from "@mui/material";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const SIDEBAR_OPEN = "280px";
export const SIDEBAR_CLOSE = "103px";

// ? Colors
export const lightMode = {
  primaryColor: "#2a363b",
  primaryColor2: "#3f4f56",

  darkColor: "#000",
  whiteColor: "#fff",
  whiteColor2: "#eee",
  whiteColor3: "#E8E8E8",
  inputColor: "#f4fff1",
  paragColor: "#A1A1A1",
  checkPointBackground: "#fafafa",
  borderBottomColor: "#e8e8e8",
  ProductItemBackColor: "#fafafa",
};

export const darkMode = {
  primaryColor: "rgb(0, 7, 61)",
  darkColor: "#fff",
  whiteColor: "#0E1621",
  whiteColor2: "#0E1621",
  whiteColor3: "#0E1621",
  inputColor: "#242F3D",
  paragColor: "#eee",
  checkPointBackground: "#17212B",
  borderBottomColor: "#17212B",
  ProductItemBackColor: "#17212B",
};

// ? Font size
export const buttonSize = "16px";
export const paragraphSize = "14px";
export const miniSize = "12px";

// ? Font weight
export const ButtonWeight = "500";
export const sixHundred = "600";

export const GlobalStyle = createGlobalStyle`
     * {
          margin: 0;
          padding: 0;
          outline:0;
          box-sizing: border-box;
          font-family: "SF Pro Display" sans-serif;
     }

     body {
          background-color:  #ffffff;

          :not(:root):fullscreen::backdrop {
               position: fixed;
               top: 0px;
               right: 0px;
               bottom: 0px;
               left: 0px;
               background: #F6F6F9;
          }
     }
     #root{
          margin:0 auto;
     }

     p {
          font-weight: 400;
          font-size: 16px;
          /* line-height: 20px; */
     }
    
   
`;

export const Container = styled.div`
  /* padding-left: 250px !important; */
`;

export const PrivateContainer = styled.div`
  background: #ffffff;
`;

export const BackGroundColorContainer = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
`;

export const AddEditImgContainer = styled.div`
  padding: 1.5rem;
  border-radius: 4px;
  border: 1px solid #eaeaef;
  background-color: #fff;

  .btns-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 2rem;
  }
`;

export const TableTitle = styled(Typography)`
  font-size: 24px !important;
  font-weight: 700 !important;
  font-family: Nunito !important;
  margin-bottom: 10px !important;
`;

export const DeleteStyle = styled(IconButton)`
  width: 42px !important;
  height: 42px !important;
  border-radius: 8px !important;
  background: rgba(239, 56, 56, 0.1) !important;

  svg {
    path {
      fill: #ef3838;
    }
  }
`;

export const AmountCalcBox = styled(Box)`
  min-width: 90px;
  height: 32px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;

  .amount {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #000;
    padding-bottom: 3px;
  }
  .buttonAmount {
    width: 32px;
    height: 32px;
    border-radius: 8px;

    svg {
      path {
        fill: #999;
      }
    }
  }
`;
