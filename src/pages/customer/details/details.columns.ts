import { GridColumns } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { numberFormat } from "utils/numberFormat";

export const useDetailsColumns = (): GridColumns => {
  const { t } = useTranslation();

  return [
    {
      field: "Order number",
      renderCell({ row }) {
        return get(row, "uuid", "");
      },
    },
    {
      field: "Date",
      renderCell({ row }) {
        return dayjs(get(row, "createdAt", "")).format("DD-MM-YYYY");
      },
    },
    {
      field: "Order price",
      renderCell({ row }) {
        return numberFormat(get(row, "totalPrice", "")) + "uzs";
      },
    },
    {
      field: "Status",
      renderCell({ row }) {
        return get(row, "state", "");
      },
    },
  ];
};
