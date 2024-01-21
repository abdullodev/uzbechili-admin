import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { MainButton, SearchInput } from "components";
import { TSetState } from "types/form.types";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { TableTitle } from "styles/global.style";

const TableHeader: React.FC<{
  searchable?: boolean;
  setSearch: TSetState<string | undefined>;
  search: string | undefined;
  title?: React.ReactNode | string;
  headerChildren: React.ReactNode;
  headerChildrenSecondRow: React.ReactNode;
  headerChildrenSecond: React.ReactNode;
  deletable: boolean;

  selectedRows: any[];
  onDelete: () => void;
  onAddButton?: () => void;
  addButtonTitle?: string;
  dataUrl?: string;
}> = ({
  onAddButton,
  onDelete,

  setSearch,
  searchable,
  search,
  headerChildren,
  headerChildrenSecondRow,
  headerChildrenSecond,
  deletable,
  selectedRows,
  title,
  addButtonTitle,
  dataUrl,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Box>{title && <TableTitle>{title}</TableTitle>}</Box>
      {headerChildrenSecond && (
        <Box sx={{ marginBottom: "20px" }}>{headerChildrenSecond}</Box>
      )}
      <div className="d-flex justify-content-end align-items-center mb-3 ">
        {searchable && (
          <Grid container className="search-box-container">
            <Grid item md={5}>
              <SearchInput
                value={search}
                onChange={(e: any) => {
                  setSearch(e?.target?.value);
                }}
              />
            </Grid>
          </Grid>
        )}
        <div className="actions d-flex align-items-center">
          {headerChildren}
          {onAddButton ? (
            <MainButton
              title={addButtonTitle || "Create"}
              variant="contained"
              onClick={() => {
                onAddButton?.();
              }}
            />
          ) : null}
          {deletable && selectedRows?.length > 0 && (
            <Button
              style={{ borderRadius: 12 }}
              onClick={onDelete}
              sx={{ width: 40 }}
              variant="outlined"
              color="error"
              className="table_add_button"
            >
              <DeleteIcon />
            </Button>
          )}
        </div>
      </div>
      <div>{headerChildrenSecondRow}</div>
    </div>
  );
};

export default TableHeader;
