import React from "react";
import { CardView, OrderDetailStyle } from "../container/OrderDetails.styled";
import CommonButton from "components/common/commonButton/Button";
import {
  Chip,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChipButton } from "components";
import {
  AllPriceIcon,
  CompleteIcon,
  DateIconPlus,
  // DeleteIcon,
  // MinusIcon,
  PlusIcon,
  ProductPriceIcon,
  PromocodeIcon,
  TaxiIcon,
} from "assets/svgs";
import { get } from "lodash";
import dayjs from "dayjs";
import { numberFormat } from "utils/numberFormat";
// import { AmountCalcBox, DeleteStyle } from "styles/global.style";

interface IOrderDetails {
  order: Record<string, any>;
  setCancelOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setAcceptOrder: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: (data: any) => void;
}
const OrderDetail = ({
  order,
  setCancelOrder,
  setAcceptOrder,
  mutate,
}: IOrderDetails) => {
  return (
    <OrderDetailStyle>
      <div className="d-flex justify-content-between header_sticky">
        <Stack direction="column" spacing={2}>
          <Stack>
            <h2>
              <b>Order</b>{" "}
              <span className="order_number">#{get(order, "uuid", 1)}</span>
            </h2>
          </Stack>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <ChipButton
              label={
                get(order, "state", 1) === "new"
                  ? "New"
                  : get(order, "state", 1) === "inProgress"
                  ? "InProgress"
                  : get(order, "state", 1) === "completed"
                  ? "Completed"
                  : "Canceled"
              }
              color="#fff"
              bgColor={
                get(order, "state", 1) === "new"
                  ? "#0065FF"
                  : get(order, "state", 1) === "inProgress"
                  ? "#FFC107"
                  : get(order, "state", 1) === "completed"
                  ? "#17C657"
                  : "#EF3838"
              }
            />
            <ChipButton label="Cash" color="#fff" bgColor="#17C657" />
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          {get(order, "state", 1) !== "cancelled" &&
            get(order, "state", 1) !== "completed" && (
              <>
                <CommonButton
                  title="Cancel"
                  className="cancel"
                  onClick={() => setCancelOrder(true)}
                />
                <CommonButton
                  title={
                    get(order, "state", 1) === "new" ? "Accept" : "Complete"
                  }
                  className={
                    get(order, "state", 1) === "new" ? "accept" : "complete"
                  }
                  onClick={() => {
                    if (get(order, "state", 1) === "new") {
                      setAcceptOrder(true);
                    } else
                      mutate({
                        _id: get(order, "_id", 1),
                        state: "completed",
                      });
                  }}
                />
              </>
            )}
        </Stack>
      </div>

      <Stack direction={"column"} spacing={2} mt={1}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <DateIconPlus />
            <div className="grey">Ordered date:</div>
          </Stack>
          <b>{dayjs(get(order, "createdAt")).format("DD-MM-YYYY | HH:mm")}</b>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <CompleteIcon />
            <div className="grey">Complated date:</div>
          </Stack>
          <b>
            {get(order, "completedAt", null) &&
              dayjs(get(order, "completedAt", null)).format(
                "DD-MM-YYYY | HH:mm"
              )}
          </b>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <ProductPriceIcon />
            <div className="grey">Mahsulotlar narxi:</div>
          </Stack>
          <b>{numberFormat(get(order, "totalPrice", 0))} uzs</b>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <PromocodeIcon />
            <div className="grey">Promokod:</div>
          </Stack>
          <b>{numberFormat(get(order, "promoCode.amount", 0))} uzs</b>
          <Typography>
            {get(order, "promoCode.name", "") +
              " " +
              get(order, "promoCode.type", "")}
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <TaxiIcon />
            <div className="grey">Yetkazish narxi:</div>
          </Stack>
          <b>{numberFormat(get(order, "deliveryPrice", 0))} uzs</b>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <AllPriceIcon />
            <div className="grey">Umumiy narx narxi:</div>
          </Stack>
          <b>{numberFormat(get(order, "totalCalculatedPrice", 0))} uzs</b>
        </Stack>
      </Stack>

      <Stack direction={"column"} spacing={2} mt={3}>
        <CardView>
          {get(order, "orderItems", []).map((item: Record<string, any>) => (
            <Stack direction={"row"} spacing={2}>
              <Stack width={"12%"}>
                <div className="image_box">
                  <img
                    src={
                      process.env.REACT_APP_BASE_URL +
                      get(item, "productsInfo.imageUrls", [])?.[0]
                    }
                    alt={get(item, "productsInfo.imageUrls", [])?.[0]}
                  />
                </div>
              </Stack>
              <Stack direction={"column"} spacing={0.5} width={"70%"}>
                <Tooltip
                  title={
                    <p className="title">
                      {get(item, "productsInfo.name", "")} Color{" "}
                      {get(item, "color", "")} Size: {get(item, "size", "")}
                    </p>
                  }
                  placement="top-start"
                >
                  <p className="title">
                    {get(item, "productsInfo.name", "")} Color:{" "}
                    {get(item, "color", "")} Size: {get(item, "size", "")}
                  </p>
                </Tooltip>
                <p className="grey size-14">{get(item, "price", 0)}</p>

                {/* <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <AmountCalcBox>
                  <IconButton className="buttonAmount">
                    <MinusIcon />
                  </IconButton>
                  <span className="amount">1</span>
                  <IconButton className="buttonAmount">
                    <PlusIcon />
                  </IconButton>
                </AmountCalcBox>
                <p>150 000 uzs</p>
              </Stack> */}
              </Stack>
              {/* <Stack alignSelf={"center"} width={"12%"} alignItems={"flex-end"}>
              <DeleteStyle>
                <DeleteIcon />
              </DeleteStyle>
            </Stack> */}
            </Stack>
          ))}
        </CardView>
      </Stack>
    </OrderDetailStyle>
  );
};

export default OrderDetail;
