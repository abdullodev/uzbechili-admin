import styled from "styled-components";

export const SettingsStyled = styled.div`
  .tabs {
    height: 330px;
    background: #fff;
    .tab {
      position: relative;
      color: #454545;
      font-size: 14px;
      padding: 14px 16px;
      border-bottom: 1px solid #f5f5f5;
      cursor: pointer;
      &.active {
        font-weight: 500;
      }
      .left-border {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 6px;
        background-color: #3e5189;
      }
    }
  }
  .settings {
    border-radius: 12px;
    background: #fff;
    padding: 0 20px 0 20px;
    height: calc(100vh - 100px);
    box-sizing: border-box;
    overflow: auto;
    .item {
      border: 1px solid #e8e8e8;
      padding: 15px;
      border-radius: 15px;
      .key {
        display: block;
        color: #333;
        margin-bottom: 5px;
        font-size: 15px;
      }
    }
  }
`;

export const MinimumOrderStyled = styled.div`
  border-radius: 12px;
  background: #fff;
  padding: 20px;
  min-height: calc(100vh - 200px);
`;

export const MultiStoreOrderStyled = styled.div`
  border-radius: 12px;
  background: #fff;
  padding: 20px;
  height: calc(100vh - 100px);
`;

export const SettingTitle = styled.span`
  font-size: 24px;
  color: #000;
`;

export const BottomBorder = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e9e9e9;
`;

export const ImageStyled = styled.div<any>`
  label {
    .image-main {
      width: ${({ width }) => (width ? width : 120)}px !important;
      height: ${({ height }) => (height ? height : 60)}px !important;
      background-color: aqua;
    }
  }
`;

export const StyledSocial = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 10px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderOfSettings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 99;
  height: 80px;
  background-color: #fff;
`;
