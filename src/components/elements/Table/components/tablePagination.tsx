import Pagination from "@mui/material/Pagination";
import { get } from "lodash";
import React from "react";
import { TSetState } from "types/form.types";
import { IQueryParams } from "../Table.constants";
import PagIcon from "../assets/PagIcon";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const TablePagination: React.FC<{
  setQueryParams: TSetState<IQueryParams | undefined>;
  tableData: any[];
  queryParams: IQueryParams;
  totalData: number;
}> = ({ setQueryParams, queryParams, totalData, tableData }) => {
  return (
    <div className="pagination_container">
      <CustomizedMenus
        currLimit={queryParams.limit}
        onLimitChange={(limit) => {
          // @ts-ignore
          setQueryParams((prev) => ({ ...prev, limit }));
        }}
      />

      {tableData?.length > 0 && (
        <Pagination
          count={Math.ceil(+totalData / +queryParams.limit)}
          variant="outlined"
          shape="rounded"
          onChange={(event, page) =>
            // @ts-ignore
            setQueryParams((prev) => ({
              ...prev,
              page,
            }))
          }
        />
      )}
    </div>
  );
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({}));

function CustomizedMenus({
  onLimitChange,
  currLimit,
}: {
  onLimitChange: (limit: number) => void;
  currLimit: number;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { t } = useTranslation();
  return (
    <>
      <button onClick={handleClick} className="pag_title">
        <PagIcon /> {currLimit} rows
        {/* {t("PAGES_TITLE.ROWDAN")} */}
      </button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {[10, 20, 30, 40, 50].map((limit) => (
          <MenuItem
            disabled={currLimit === limit}
            onClick={() => {
              onLimitChange(limit);
              handleClose();
            }}
            disableRipple
            key={limit}
            sx={{
              width: "145px",
            }}
          >
            {limit}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
}

export default TablePagination;
