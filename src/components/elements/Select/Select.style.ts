import { MenuItem, Select } from "@mui/material";
import styled from "styled-components";

export const SelectStyled = styled(Select)`
  height: 48px;
  font-size: 17px !important;
  background-color: #f5f5f5;
  border-radius: 12px !important;
  /* padding: 12px !important; */
  border: 2px solid #f5f5f5;
  transition: all 0.3s ease;

  &:hover {
    border: 2px solid #0f6fdf;
  }

  gap: 10px;

  .MuiPaper-rounded {
    background-color: aqua !important;
  }
  .MuiSvgIcon-root {
    /* display: none; */
  }
  .clear-btn {
    margin-right: 10px;
    /* display: none; */
    /* opacity: 0.01; */
    /* opacity: 0.01; */
    opacity: 0.5;
    /* display: none; */
  }
  .clear-btn:hover {
    /* opacity: 1; */
  }

  .select_options_menu {
    background-color: aqua !important;
  }
`;

export const SelectMenuStyled = styled(MenuItem)`
  &:has() {
    /* background-color: aqua; */
  }
`;
