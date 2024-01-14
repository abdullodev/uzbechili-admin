import { Button } from "@mui/material";
import { IconButton } from "@mui/material";
import styled from "styled-components";

export const ButtonStyled = styled(Button)`
  height: 42px !important;
  min-width: 110px !important;
  border-radius: 12px !important;
  outline: none !important;
  font-size: 14px !important;
  text-transform: inherit !important;
  padding: 0 18px !important;
  color: #000 !important;
  background-color: #fff !important;
  font-weight: 500 !important;

  &:hover {
    color: #000 !important;
  }

  .MuiButton-startIcon {
    path {
      stroke: #000 !important;
    }
  }

  &.designed {
    background: linear-gradient(90deg, #ff5c4d 0%, #eb469f 40%, #8341ef 100%);
    color: #ffffff !important;

    .MuiButton-startIcon {
      transition: all 0.2s ease;
      path {
        stroke: #fff !important;
      }
    }
  }

  &.grey {
    background: #e9e9e9 !important;
    color: #000 !important;
  }

  &.accept {
    background-color: #3e5189 !important;
    color: #fff !important;
  }
  &.cancel {
    background-color: #ef3838 !important;
    color: #fff !important;
  }

  &.main {
    background-color: #3e5189 !important;
    color: #fff !important;
  }

  &:disabled {
    color: #999 !important;
  }
`;

export const IconButtonStyled = styled(IconButton)`
  width: 36px !important;
  height: 36px !important;
  background-color: #f5f5f5 !important;
`;
