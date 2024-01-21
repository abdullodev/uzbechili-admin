import { GridColumns } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { numberFormat } from "utils/numberFormat";

export const usePromocodesColumns = (): GridColumns => {
  const { t } = useTranslation();

  return [
    {
      field: "Promocode name",
      renderCell({ row }) {
        return get(row, "name", "");
      },
    },
    {
      field: "Amount",
      renderCell({ row }) {
        return numberFormat(get(row, "amount", "0"));
      },
    },
    {
      field: "From date",
      renderCell({ row }) {
        return dayjs(get(row, "fromDate")).format("DD-MM-YYYY");
      },
    },
    {
      field: "To date",
      renderCell({ row }) {
        return dayjs(get(row, "toDate")).format("DD-MM-YYYY");
      },
    },
    {
      field: "Using amount",
      renderCell({ row }) {
        return numberFormat(get(row, "useAmount", ""));
      },
    },
  ];
};
