import React from "react";
import { Grid } from "@mui/material";
import { Table } from "components";
import { usePromocodesColumns } from "./procomodes.column";

const Promocodes = () => {
  const columns = usePromocodesColumns();

  const renderHeader = <Grid container width={600} spacing={2}></Grid>;

  return (
    <div>
      <Table
        columns={columns}
        dataUrl="product/pagin"
        searchable
        title="Promocodes"
        headerChildren={renderHeader}
      />
    </div>
  );
};

export default Promocodes;
