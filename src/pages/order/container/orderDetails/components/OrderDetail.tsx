import React from "react";
import { CardView, OrderDetailStyle } from "../container/OrderDetails.styled";
import CommonButton from "components/common/commonButton/Button";
import { Chip, Grid, Stack, Tooltip, Typography } from "@mui/material";
import { ChipButton } from "components";
import {
  AllPriceIcon,
  CompleteIcon,
  DateIconPlus,
  PlusIcon,
  ProductPriceIcon,
  PromocodeIcon,
  TaxiIcon,
} from "assets/svgs";

const OrderDetail = () => {
  return (
    <OrderDetailStyle>
      <div className="d-flex justify-content-between header_sticky">
        <Stack direction="column" spacing={2}>
          <Stack>
            <h2>
              <b>Order</b> <span className="order_number">#12345678</span>
            </h2>
          </Stack>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <ChipButton label="New" color="#fff" bgColor="#0065FF" />
            <ChipButton label="Cash" color="#fff" bgColor="#17C657" />
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={1}>
          <CommonButton title="Cancel" className="cancel" />
          <CommonButton title="Accept" className="accept" />
        </Stack>
      </div>

      <Stack direction={"column"} spacing={2} mt={1}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <DateIconPlus />
            <div className="grey">Ordered date:</div>
          </Stack>
          <b>12.12.2024</b>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <CompleteIcon />
            <div className="grey">Complated date:</div>
          </Stack>
          <b>12.12.2024</b>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <ProductPriceIcon />
            <div className="grey">Mahsulotlar narxi:</div>
          </Stack>
          <b>150 000 uzs</b>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <PromocodeIcon />
            <div className="grey">Promokod:</div>
          </Stack>
          <b>15 000 uzs</b>
          <Typography>OZBECHILI10 (10%)</Typography>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <TaxiIcon />
            <div className="grey">Yetkazish narxi:</div>
          </Stack>
          <b>30 000 uzs</b>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <AllPriceIcon />
            <div className="grey">Umumiy narx narxi:</div>
          </Stack>
          <b>165 000 uzs</b>
        </Stack>
      </Stack>

      <Stack direction={"column"} spacing={2} mt={3}>
        <CardView>
          <Stack direction={"row"} spacing={2}>
            <div className="image_box">
              <img
                src="https://sportcourt.ru/content/models/large/84988_959670.jpg"
                alt="image"
              />
            </div>
            <Stack direction={"column"} spacing={0.5} width={"80%"}>
              <Tooltip
                title="Толстовка короткая длина (Color: Grey, Size: L)"
                placement="top-start"
              >
                <p className="title">
                  Толстовка короткая длина (Color: Grey, Size: L)
                </p>
              </Tooltip>
              <p className="grey">150 000 uzs</p>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <CommonButton title="Add" sx={{ height: "28px !important" }} />
                <p>150 000 uzs</p>
              </Stack>
            </Stack>
          </Stack>
        </CardView>
      </Stack>
    </OrderDetailStyle>
  );
};

export default OrderDetail;
