import { GridColumns } from "@mui/x-data-grid";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

export const useBannerColumns = (): GridColumns => {
  const { t } = useTranslation();

  return [
    {
      field: "Banner name",
      renderCell({ row }) {
        return row.name;
      },
    },
    {
      field: "Created date",
      renderCell({ row }) {
        return dayjs(get(row, "createdDate", "")).format("DD-MM-YYYY");
      },
    },
    {
      field: "Note",
      renderCell({ row }) {
        return (
          <Tooltip
            title={
              <div
                dangerouslySetInnerHTML={{ __html: get(row, "note", "-") }}
              ></div>
            }
            color="cyan"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: get(row, "note", "-").slice(0, 16),
              }}
            ></div>
          </Tooltip>
        );
      },
    },
  ];
};
