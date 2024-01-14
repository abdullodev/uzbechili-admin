import { AutoCompleteFilter, Table } from "components";
import { useCustomerColumns } from "./customer.columns";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const Client = () => {
  const columns = useCustomerColumns();
  const { t } = useTranslation();

  const renderHeader = (
    <>
      <Grid container width={200}>
        <Grid item sm={12}>
          <AutoCompleteFilter
            optionsUrl="store/pagin/choose"
            filterName="storeId"
            placeholder={t("common.store")}
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <Table
        columns={columns}
        dataUrl="customer/pagin"
        searchable
        title="Users"
        headerChildren={renderHeader}
      />
    </>
  );
};

export default Client;
