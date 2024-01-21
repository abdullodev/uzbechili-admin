import { IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { AcceptIcon, CancelIcon } from "assets/svgs";
import dayjs from "dayjs";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

export const useOrderTableColumns = (): GridColumns => {
  const { t } = useTranslation();

  return [
    {
      field: "Order number",
      renderCell({ row }) {
        return get(row, "orderNumber", "");
      },
    },
    {
      field: "Phone number",
      renderCell({ row }) {
        return get(row, "phoneNumber", "");
      },
    },
    {
      field: "Order amount",
      renderCell({ row }) {
        return get(row, "amount", "-");
      },
    },
    {
      field: "Order price",
      renderCell({ row }) {
        return get(row, "price", "");
      },
      flex: 1.5,
    },
    {
      field: "Date",
      renderCell({ row }) {
        return dayjs(get(row, "date", "")).format("DD-MM-YYYY");
      },
    },
    {
      field: "Payment method",
      renderCell({ row }) {
        return get(row, "paymentMethod", "");
      },
    },
    {
      field: "Action",
      renderCell({ row }) {
        return (
          <div className="order_action">
            <IconButton className="cancel_order">
              <CancelIcon />
            </IconButton>
            <IconButton className="accept_order">
              <AcceptIcon />
            </IconButton>
          </div>
        );
      },
      flex: 0.5,
    },
  ];
};
