import { GridColumns } from "@mui/x-data-grid";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

export const useProductColumns = (): GridColumns => {
  const { t } = useTranslation();

  return [
    {
      field: "Product name",
      renderCell({ row }) {
        return get(row, "name", "");
      },
    },
    {
      field: "Category",
      renderCell({ row }) {
        return get(row, "category.name", "");
      },
    },
    {
      field: "Price",
      renderCell({ row }) {
        return get(row, "price", "");
      },
    },
  ];
};
