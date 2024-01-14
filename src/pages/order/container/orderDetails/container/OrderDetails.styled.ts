import { Box } from "@mui/material";
import styled from "styled-components";

export const OrderDetailsStyled = styled.div``;

export const OrderDetailStyle = styled(Box)`
  width: 100%;
  border-radius: 12px;
  background-color: #fff;
  padding: 0 16px 16px 16px;
  height: calc(100vh - 40px);
  overflow: auto;

  .header_sticky {
    position: sticky;
    top: 0;
    z-index: 99;
    background-color: #fff;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 10px;
  }
`;

export const CardView = styled(Box)`
  width: 100%;

  .image_box {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    background-color: #e9e9e9;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 90%;
      max-height: 90%;
      object-fit: cover;
    }
  }

  .title {
    width: 100%;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }
`;

export const OrderDetailFormStyle = styled(Box)`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  background-color: #fff;
  padding: 0 16px 16px 16px;
  height: calc(100vh - 40px);
  overflow: auto;

  .header_sticky {
    position: sticky;
    top: 0;
    z-index: 99;
    background-color: #fff;
    padding-top: 16px;
    padding-bottom: 10px;
    align-items: center;
  }
`;
