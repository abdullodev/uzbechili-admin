import { Chip } from "@mui/material";
import React, { FC } from "react";
import { ChipButtonStyle } from "./ChipButton.style";

interface IChipButton {
  label: string;
  color?: string;
  bgColor?: string;
}
const ChipButton: FC<IChipButton> = ({
  label,
  color = "#000",
  bgColor = "#e9e9e9",
}) => {
  return (
    <ChipButtonStyle>
      <Chip label={label} sx={{ color, background: bgColor }} />
    </ChipButtonStyle>
  );
};

export default ChipButton;
