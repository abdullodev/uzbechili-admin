import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { OrderDetailsStyled } from "./OrderDetails.styled";
import { Grid } from "@mui/material";
import OrderDetail from "../components/OrderDetail";
import OrderDetailForm from "../components/OrderDetailForm";
import WarningModal from "components/common/WarningModal/WarningModal";
import { Button, Modal, Space } from "antd";
import { TextInput } from "components";

const OrderDetails = () => {
  const [cancelOrder, setCancelOrder] = useState<boolean>(false);
  const [acceptOrder, setAcceptOrder] = useState<boolean>(false);
  const { id } = useParams();
  const { t } = useTranslation();
  const formStore = useForm();
  const { setValue, reset, handleSubmit } = formStore;

  const acceptFormStore = useForm();

  const { data, status, refetch } = useApi(
    `order/${id}`,
    {},
    {
      enabled: !!id,
      // suspense: false,
    }
  );
  const order = data?.data;

  const { mutate: updateState } = useApiMutation(
    `order/state/${order?._id}`,
    "put",
    {
      onSuccess() {
        refetch();
        toast.success(t("general.success"));
      },
    }
  );

  const { mutate } = useApiMutation(`order/${id}`, "put");

  useEffect(() => {
    if (status === "success") {
      setValue("items", order?.items);
      reset({
        receiverName: order?.receiverName,
        receiverPhoneNumber: order?.receiverPhoneNumber,
        homeNumber: get(order, "client.address.homeNumber", ""),
        entrance: get(order, "client.address.entrance", ""),
        region: get(order, "client.address.region", ""),
        postIndex: get(order, "client.address.postIndex", ""),
        district: get(order, "client.address.district", ""),
        address: get(order, "client.address.address", ""),
        floor: get(order, "client.address.floor", ""),
        flatNumber: get(order, "client.address.flatNumber", ""),
        about: get(order, "client.address.about", ""),
      });
      setTimeout(() => setValue("comment", order?.comment), 0);
    }
  }, [status]);

  const submit = handleSubmit((data: any) => {
    const requestData = {
      ...data,
      items: data.items?.map((e: any) => ({
        productId: e.productId,
        amount: e.amount,
      })),
    };

    console.log(requestData);
    // mutate(requestData);
  });

  const handleAcceptOrder = (data: any) => {
    console.log("first");
  };

  const handleCancelOrder = () => {};
  return (
    <OrderDetailsStyled>
      <Grid container spacing={"20px"}>
        <Grid item xs={7}>
          <OrderDetail
            order={order}
            setCancelOrder={setCancelOrder}
            setAcceptOrder={setAcceptOrder}
          />
        </Grid>
        <Grid item xs={5}>
          <OrderDetailForm
            formStore={formStore}
            submit={submit}
            order={order}
          />
        </Grid>
      </Grid>

      <Modal
        open={cancelOrder}
        onOk={handleCancelOrder}
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
          <code className="color-blue">#{get(order, "uuid", 0)}</code>{" "}
          buyurtmani bekor qilmoqchimisiz?
        </h2>
      </Modal>

      <Modal
        open={acceptOrder}
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
    </OrderDetailsStyled>
  );
};

export default OrderDetails;
