import { Button } from "@mui/material";
import styled from "styled-components";

interface IMainBtnStyled {
  variant?: "text" | "outlined" | "contained";
}

export const StyledButton = styled(Button)<IMainBtnStyled>((props) => ({
  height: "46px",
  fontWeight: "600 !important",
  fontSize: "15px !important",
  borderRadius: "12px !important",
  padding: "5px 30px !important",
  backgroundColor:
    !props?.color && props.variant === "contained" ? "#3E5189 !important" : "",
  whiteSpace: "nowrap",
}));
