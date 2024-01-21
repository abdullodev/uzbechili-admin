import { GridColumns } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { numberFormat } from "utils/numberFormat";

export const useCustomerColumns = (): GridColumns => {
  const { t } = useTranslation();

  return [
    {
      field: "Name",
      renderCell({ row }) {
        return get(row, "fullName", "");
      },
    },
    {
      field: "Number",
      renderCell({ row }) {
        return get(row, "phoneNumber", "");
      },
    },
    {
      field: "Total orders",
      renderCell({ row }) {
        return get(row, "totalOrders", "");
      },
    },
    {
      field: "Amount",
      renderCell({ row }) {
        return numberFormat(get(row, "totalOrdersPrice", ""));
      },
    },

    {
      field: "Last order date",
      renderCell({ row }) {
        return dayjs(get(row, "lastOrderDate", "")).format("DD-MM-YYYY");
      },
    },
  ];
};
