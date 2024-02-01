import { Box, Grid } from "@mui/material";
import { RangeDatePicker, Table } from "components";
import React from "react";
import { DetailBox, MainBox } from "styles/global.style";
import { useDetailsColumns } from "./details.columns";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "hooks/useApi/useApiHooks";
import { get } from "lodash";
import dayjs from "dayjs";
import { numberFormat } from "utils/numberFormat";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const columns = useDetailsColumns();

  const { data: client } = useApi("client/" + id);

  const renderHeader = (
    <Box>
      <Grid container>
        <Grid item sm={12}>
          <RangeDatePicker />
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <MainBox>
      <Grid container spacing={[1, 2]}>
        <Grid item xs={6} md={4}>
          <DetailBox>
            <h2>
              {get(client, "data.firstName")} <br />
              {get(client, "data.lastName")}
            </h2>
            <p>{get(client, "data.phoneNumber")}</p>

            <ul>
              <li>
                Total orders: <span>{get(client, "data.totalOrders")} ta</span>
              </li>
              <li>
                Total price:{" "}
                <span>{numberFormat(get(client, "data.totalAmount"))} uzs</span>
              </li>
              <li>
                First order date:{" "}
                <span>
                  {" "}
                  {dayjs(get(client, "data.firstOrderDate", "")).format(
                    "DD-MM-YYYY | HH:mm"
                  )}
                </span>
              </li>
              <li>
                Last order date:{" "}
                <span>
                  {dayjs(get(client, "data.lastOrderOrder")).format(
                    "DD-MM-YYYY | HH:mm"
                  )}
                </span>
              </li>
            </ul>
          </DetailBox>
        </Grid>

        <Grid item xs={6} md={8}>
          <Table
            columns={columns}
            dataUrl="/client/orders"
            searchable
            title="Orders"
            headerChildren={renderHeader}
            onRowClick={(row) => navigate(`/order/${row._id}`)}
            exQueryParams={{ clientId: id }}
          />
        </Grid>
      </Grid>
    </MainBox>
  );
};

export default Details;
