import { Chip, IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { AcceptIcon, CancelIcon } from "assets/svgs";
import dayjs from "dayjs";
import { get } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";

export const useOrderTableColumns = (
  setCancelOrder: React.Dispatch<React.SetStateAction<any>>,
  setAcceptOrder: React.Dispatch<React.SetStateAction<any>>
): GridColumns => {
  const { t } = useTranslation();

  return [
    {
      field: "Order number",
      renderCell({ row }) {
        return get(row, "uuid", "");
      },
    },
    {
      field: "Phone number",
      renderCell({ row }) {
        return get(row, "receiverPhoneNumber", "-");
      },
    },
    {
      field: "Order amount",
      renderCell({ row }) {
        return get(row, "itemsCount", 1);
      },
    },
    {
      field: "Order price",
      renderCell({ row }) {
        return get(row, "totalCalculatedPrice", "");
      },
      flex: 1.5,
    },
    {
      field: "Date",
      renderCell({ row }) {
        return dayjs(get(row, "createdAt", "")).format("DD-MM-YYYY");
      },
    },
    {
      field: "Payment method",
      renderCell({ row }) {
        return <Chip label={get(row, "paymentMethod", "")} color="primary" />;
      },
    },
    {
      field: "Action",
      renderCell({ row }) {
        return (
          get(row, "state", "") !== "cancelled" &&
          get(row, "state", "") !== "completed" && (
            <div className="order_action">
              <IconButton
                className="cancel_order"
                onClick={(e: any) => {
                  e.stopPropagation();
                  setCancelOrder(row);
                }}
              >
                <CancelIcon />
              </IconButton>
              <IconButton
                className="accept_order"
                onClick={(e: any) => {
                  e.stopPropagation();
                  setAcceptOrder(row);
                }}
              >
                <AcceptIcon />
              </IconButton>
            </div>
          )
        );
      },
      flex: 0.8,
    },
  ];
};
