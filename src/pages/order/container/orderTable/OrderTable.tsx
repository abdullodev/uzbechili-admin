import {
  AutoCompleteFilter,
  DatePicker,
  RangeDatePicker,
  Table,
} from "components";
import { useOrderTableColumns } from "./orderTable.columns";
import SwitchView from "pages/order/components/SwitchView/SwitchView";
import { useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import CommonButton from "components/common/commonButton/Button";
import { useState } from "react";

const filterTab = [
  {
    title: "New (10)",
    value: "new",
  },
  {
    title: "Proccess (0)",
    value: "proccess",
  },
  {
    title: "Completes (0)",
    value: "completes",
  },
  {
    title: "Canceled (0)",
    value: "canceled",
  },
];
const OrderTable = () => {
  const [tabValue, setTabValue] = useState<string>(filterTab[0].value);
  const columns = useOrderTableColumns();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const renderHeader = (
    <Box>
      <Grid container>
        <Grid item sm={12}>
          <RangeDatePicker />
        </Grid>
      </Grid>
    </Box>
  );

  const renderHeaderSecond = (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
      }}
    >
      {filterTab.map((btn) => (
        <CommonButton
          key={btn.title}
          title={btn.title}
          onClick={() => setTabValue(btn.value)}
          className={tabValue === btn.value ? "grey" : ""}
        />
      ))}
    </Box>
  );

  return (
    <>
      <Table
        dataUrl="order/pagin"
        title="Orders"
        columns={columns}
        // onAddButton={() => navigate(`/order/add`)}
        headerChildren={renderHeader}
        headerChildrenSecond={renderHeaderSecond}
        searchable
        exQueryParams={{
          state: "new",
        }}
        onRowClick={(row) => navigate(`/order/${row._id}`)}
        tableHeight={"calc(100vh - 295px)"}
      />
    </>
  );
};

export default OrderTable;
