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
import { useEffect, useMemo, useState } from "react";
import { Button, Modal, Space } from "antd";
import { get } from "lodash";
import { useForm } from "react-hook-form";
import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import { useAppDispatch, useAppSelector } from "store/storeHooks";
import { reRenderTable } from "components/elements/Table/reducer/table.slice";

const defaultTab = [
  {
    title: "New",
    value: "new",
  },
  {
    title: "Proccess",
    value: "inProgress",
  },
  {
    title: "Completed",
    value: "completed",
  },
  {
    title: "Cancelled",
    value: "cancelled",
  },
];

const OrderTable = () => {
  const [cancelOrder, setCancelOrder] = useState<any>();
  const [acceptOrder, setAcceptOrder] = useState<any>();
  const [tabValue, setTabValue] = useState<string>(defaultTab[0].value);
  const columns = useOrderTableColumns(setCancelOrder, setAcceptOrder);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dis = useAppDispatch();
  const reRender = useAppSelector((store) => store.tableState.render);

  const acceptFormStore = useForm();

  const { data: states, refetch } = useApi("/order/states");

  const filterTab = useMemo(() => {
    return defaultTab.map((item) => {
      const found = states?.data.find(
        (val: Record<string, any>) => val._id === item.value
      );
      if (found) {
        return { ...found, ...item };
      }

      return item;
    });
  }, [states]);

  const { mutate } = useApiMutation(`order`, "put", {
    onSuccess() {
      acceptOrder && setAcceptOrder(false);
      cancelOrder && setCancelOrder(false);
      dis(reRenderTable(true));
      refetch();
    },
  });

  const handleAcceptOrder = () => {
    const requestData = {
      initialPayment: acceptFormStore.watch("initialPayment"),
      _id: acceptOrder._id,
      state: "inProgress",
    };

    mutate(requestData);
  };

  const handleCancelOrder = () => {
    const requestData = {
      _id: cancelOrder._id,
      state: "cancelled",
    };

    mutate(requestData);
  };

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
      {filterTab?.map((btn: Record<string, any>) => (
        <CommonButton
          key={btn.title}
          title={btn.title + ` (${btn?.count || 0})`}
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
          state: tabValue,
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
            // key="submit"
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
          <code className="color-blue">
            #
            {get(cancelOrder, "uuid", 0) +
              " raqamli buyurtmani " +
              get(cancelOrder, "receiverPhoneNumber", "") +
              " dan"}{" "}
          </code>{" "}
          bekor qilmoqchimisiz?
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
            onClick={handleAcceptOrder}
          >
            Save
          </Button>,
        ]}
      >
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
              name="initialPayment"
              label={"Miqdor"}
              type="number"
            />
          </Space>
        </Space>
      </Modal>
    </>
  );
};

export default OrderTable;
