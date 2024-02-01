import { AutoCompleteFilter, Table } from "components";
import { useCustomerColumns } from "./customer.columns";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Client = () => {
  const columns = useCustomerColumns();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const renderHeader = <></>;

  return (
    <>
      <Table
        columns={columns}
        dataUrl="/client/pagin"
        searchable
        title="Users"
        headerChildren={renderHeader}
        onRowClick={(row) => navigate(`/customer/${row._id}`)}
      />
    </>
  );
};

export default Client;
