import { GridColumns } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

export const useOrderTableColumns = (): GridColumns => {
  const { t } = useTranslation();

  return [
    {
      field: t("common.number"),
      renderCell({ row }) {
        return row.number;
      },
    },
    {
      field: t("common.price"),
      renderCell({ row }) {
        return row.totalPrice;
      },
    },
    {
      field: t("common.store"),
      renderCell({ row }) {
        return get(row, "store.name", "-");
      },
    },
    {
      field: t("common.customer"),
      renderCell({ row }) {
        return (
          get(row, "customer.firstName", "") +
          " " +
          get(row, "customer.lastName", "")
        );
      },
      flex: 1.5,
    },
    {
      field: t("common.phoneNumber"),
      renderCell({ row }) {
        return get(row, "customer.phoneNumber", "");
      },
    },
    {
      field: t("common.receiverPhoneNumber"),
      renderCell({ row }) {
        return row.receiverCustomer?.phoneNumber;
      },
    },
    {
      field: t("common.paymentType"),
      renderCell({ row }) {
        return t(`enum.${row.paymentType}`);
      },
      flex: 0.5,
    },
    {
      field: t("common.time"),
      renderCell({ row }) {
        return dayjs(row.createdAt).format("DD.MM.YYYY HH:mm");
      },
    },
  ];
};
