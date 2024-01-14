import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import { get } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IOrder } from "types/common.types";
import { OrderDetailsStyled } from "./OrderDetails.styled";

const OrderDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const formStore = useForm();
  const { setValue, reset, handleSubmit } = formStore;

  const { data, status, refetch } = useApi<IOrder>(
    `order/${id}`,
    {},
    {
      enabled: !!id,
      // suspense: false,
    }
  );
  const order = data?.data;

  const { data: orderStates } = useApi("order/states", {}, { suspense: false });

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
        items: order?.items,
        addressName: order?.addressName,
        addressLocation: order?.addressLocation,
        customer:
          get(order, "customer.firstName", "") +
          " " +
          get(order, "customer.lastName", ""),
        phoneNumber: order?.customer.phoneNumber,
        paymentType: order?.paymentType,
        houseNumber: order?.houseNumber,
        entrance: order?.entrance,
        floor: order?.floor,
        deliveryDate: get(order, "deliveryDate", ""),
        apartmentNumber: order?.apartmentNumber,
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
    mutate(requestData);
  });

  return (
    <OrderDetailsStyled>
      <h2>Details</h2>
    </OrderDetailsStyled>
  );
};

export default OrderDetails;
