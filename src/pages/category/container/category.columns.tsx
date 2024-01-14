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

interface IUseStoreCol {
  setCategoryId?: React.Dispatch<React.SetStateAction<string>>;
  setEditingCategoryId?: React.Dispatch<React.SetStateAction<string>>;
}

export const useCategoryCol = ({
  setCategoryId,
  setEditingCategoryId,
}: IUseStoreCol) => {
  const dis = useAppDispatch();
  const { t } = useTranslation();

  return [
    {
      key: "sort",
      width: "5%",
    },
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      width: "5%",
      render: (item: any, record: any, index: number) => <>{index + 1}</>,
    },
    {
      title: t("common.categoryName"),
      dataIndex: "name",
    },
    {
      title: "",
      render: (_: any, record: any) => {
        return (
          <div className="d-flex gap-2 justify-content-end">
            <IconButton
              onClick={() => {
                setEditingCategoryId?.(record?._id);
                dis(setOpenDrawer(true));
              }}
            >
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => setCategoryId?.(record?._id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];
};
