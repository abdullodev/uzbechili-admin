import { AutoCompleteFilter, Table } from "components";
import { useCustomerColumns } from "./customer.columns";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const Client = () => {
  const columns = useCustomerColumns();
  const { t } = useTranslation();

  const renderHeader = <></>;

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
