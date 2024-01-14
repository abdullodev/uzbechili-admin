import { GridColumns } from "@mui/x-data-grid";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

export const useProductColumns = (): GridColumns => {
  const { t } = useTranslation();

  return [
    {
      field: t("common.productName"),
      renderCell({ row }) {
        return get(row, "name", "");
      },
    },
    {
      field: t("common.store"),
      renderCell({ row }) {
        return get(row, "store.name", "-");
      },
    },
    {
      field: t("common.price"),
      renderCell({ row }) {
        return get(row, "price", "");
      },
    },
    {
      field: t("common.residue"),
      renderCell({ row }) {
        return get(row, "inStock", "");
      },
    },
    // {
    //   field: t("common.status"),
    //   renderCell({ row }) {
    //     return get(row, "status", "");
    //   },
    // },
  ];
};
