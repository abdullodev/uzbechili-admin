import styled from "styled-components";

export const SwitchViewStyled = styled.div<any>`
  .MuiToggleButton-root {
    height: 47px;
    border-radius: 12px;
    background-color: #f5f5f5 !important;
    z-index: 2;
    transition: all 0.3s ease;
    &.active {
      background-color: #3e5189 !important;
    }
  }
`;
