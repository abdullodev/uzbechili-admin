import React from "react";
import { Grid } from "@mui/material";
import { Table } from "components";
import { useFinanceColumns } from "./finance.columns";

const Finance = () => {
  const columns = useFinanceColumns();

  const renderHeader = <Grid container width={600} spacing={2}></Grid>;

  return (
    <div>
      <Table
        columns={columns}
        dataUrl="product/pagin"
        searchable
        title="Finance"
        headerChildren={renderHeader}
      />
    </div>
  );
};

export default Finance;
