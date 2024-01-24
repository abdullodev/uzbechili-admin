import { Grid, Stack, Typography } from "@mui/material";
import CommonButton from "components/common/commonButton/Button";
import React from "react";
import { OrderDetailFormStyle } from "../container/OrderDetails.styled";
import { PhoneInput, SelectForm, TextInput } from "components";
import { UseFormReturn, useForm } from "react-hook-form";
import { DISTRICTS, REGIONS } from "types/common.types";
import { get } from "lodash";

interface IOrderDetailForm {
  formStore: UseFormReturn<any>;
  submit: any;
  order: Record<string, any>;
}
const OrderDetailForm = ({ formStore, submit, order }: IOrderDetailForm) => {
  const disabled = get(order, "state", "") === "new";

  return (
    <OrderDetailFormStyle>
      <form onSubmit={submit}>
        <div className="d-flex justify-content-between header_sticky">
          <Typography component={"h1"} variant="h5">
            Client details
          </Typography>
          {!disabled && (
            <CommonButton title="Save" className="main" type="submit" />
          )}
        </div>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextInput
              control={formStore.control}
              name="receiverName"
              label={"Name"}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <PhoneInput
              control={formStore.control}
              name="receiverPhoneNumber"
              label={"Phone number"}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectForm
              control={formStore.control}
              name="region"
              label={"Region"}
              options={REGIONS}
              disabled={disabled}
            />
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={6}>
              <SelectForm
                control={formStore.control}
                name="district"
                label={"District"}
                options={DISTRICTS}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                control={formStore.control}
                name="postIndex"
                label={"Post index"}
                disabled={disabled}
                rules={{
                  required: false,
                  maxLength: { value: 6, message: "Max 6" },
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextInput
              control={formStore.control}
              name="address"
              label={"Address"}
              rules={{ required: false }}
              disabled={disabled}
            />
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={6}>
              <TextInput
                control={formStore.control}
                name="homeNumber"
                label={"Home number"}
                rules={{ required: false }}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                control={formStore.control}
                name="enterance"
                label={"Enterance"}
                rules={{ required: false }}
                disabled={disabled}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={6}>
              <TextInput
                control={formStore.control}
                name="floor"
                label={"Flour"}
                rules={{ required: false }}
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                control={formStore.control}
                name="flatNumber"
                label={"House number"}
                disabled={disabled}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TextInput
              control={formStore.control}
              name="about"
              label={"Nearby landmarks"}
              rules={{ required: false }}
              disabled={disabled}
            />
          </Grid>

          {/* <Grid item xs={12}>
          <TextInput
            control={formStore.control}
            name="description"
            label={"Description"}
            rules={{ required: false }}
          />
        </Grid> */}
        </Grid>
      </form>
    </OrderDetailFormStyle>
  );
};

export default OrderDetailForm;
