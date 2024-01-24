import {
  AutoCompleteFilter,
  DatePicker,
  RangeDatePicker,
  Table,
  TextInput,
} from "components";
import { useOrderTableColumns } from "./orderTable.columns";
import SwitchView from "pages/order/components/SwitchView/SwitchView";
import { useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import CommonButton from "components/common/commonButton/Button";
import { useState } from "react";
import { Button, Modal, Space } from "antd";
import { get } from "lodash";
import { useForm } from "react-hook-form";

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
  const [cancelOrder, setCancelOrder] = useState<any>();
  const [acceptOrder, setAcceptOrder] = useState<any>();
  const [tabValue, setTabValue] = useState<string>(filterTab[0].value);
  const columns = useOrderTableColumns(setCancelOrder, setAcceptOrder);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const acceptFormStore = useForm();

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

  const handleCancelOrder = () => {
    console.log(cancelOrder);
  };

  const handleAcceptOrder = () => {};

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

      <Modal
        open={!!cancelOrder}
        // onOk={handleCancelOrder}
        onCancel={() => setCancelOrder(false)}
        footer={[
          <Button key="back" onClick={() => setCancelOrder(false)}>
            No
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleCancelOrder}
          >
            Yes
          </Button>,
        ]}
      >
        <h1 className="realy_cancel text-center">Cancel</h1>
        <h2>
          Rosdan ham{" "}
          <code className="color-blue">#{get(cancelOrder, "uuid", 0)}</code>{" "}
          buyurtmani bekor qilmoqchimisiz?
        </h2>
      </Modal>

      <Modal
        open={!!acceptOrder}
        onOk={handleAcceptOrder}
        onCancel={() => setAcceptOrder(false)}
        footer={[
          <Button key="back" onClick={() => setAcceptOrder(false)}>
            Back
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            // loading={loading}
            onClick={acceptFormStore.handleSubmit(handleAcceptOrder)}
          >
            Save
          </Button>,
        ]}
      >
        <form>
          <Space direction="vertical">
            <Space size={"middle"}>
              <div className="px-2">
                <h1 className="text-center color-blue">Accept</h1>
                <h3>
                  Buyurtmani qabul qilishdan oldin zaklat olinish kerak, zaklat
                  oldingizmi?
                </h3>
              </div>
            </Space>
            <Space>
              <TextInput
                control={acceptFormStore.control}
                name="acceptPrice"
                label={"Miqdor"}
                type="number"
              />
            </Space>
          </Space>
        </form>
      </Modal>
    </>
  );
};

export default OrderTable;
