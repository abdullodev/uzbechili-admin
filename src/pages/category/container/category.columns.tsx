import { IconButton } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { DeleteIcon } from "assets/svgs";
import { setOpenDrawer } from "components/elements/FormDrawer/formdrawer.slice";
import EditIcon from "components/elements/Table/assets/EditIcon";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "store/storeHooks";

export const useCategoryColumns = (): GridColumns => {
  const { t } = useTranslation();

  return [
    {
      field: t("common.categoryName"),
      renderCell({ row }) {
        return get(row, "name", "");
      },
    },
  ];
};
