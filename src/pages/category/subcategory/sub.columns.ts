import { GridColumns } from "@mui/x-data-grid";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

export const useSubCategoryColumns = (): GridColumns => {
  const { t } = useTranslation();

  return [
    {
      field: "Sub category",
      renderCell({ row }) {
        return get(row, "name", "");
      },
    },
  ];
};
