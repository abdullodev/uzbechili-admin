import { Grid, Stack, Typography } from "@mui/material";
import CommonButton from "components/common/commonButton/Button";
import React from "react";
import { OrderDetailFormStyle } from "../container/OrderDetails.styled";
import { PhoneInput, SelectForm, TextInput } from "components";
import { useForm } from "react-hook-form";

const OrderDetailForm = () => {
  const { control } = useForm();
  return (
    <OrderDetailFormStyle>
      <div className="d-flex justify-content-between header_sticky">
        <Typography component={"h1"} variant="h5">
          Client details
        </Typography>
        <CommonButton title="Save" className="main" />
      </div>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextInput control={control} name="firstName" label={"Name"} />
        </Grid>
        <Grid item xs={12}>
          <PhoneInput
            control={control}
            name="phoneNumber"
            label={"Phone number"}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectForm control={control} name="region" label={"Region"} />
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <SelectForm control={control} name="district" label={"District"} />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              control={control}
              name="postIndex"
              label={"Post index"}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextInput control={control} name="address" label={"Address"} />
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextInput
              control={control}
              name="homeNumber"
              label={"Home number"}
              rules={{ required: false }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              control={control}
              name="enterance"
              label={"Enterance"}
              rules={{ required: false }}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextInput
              control={control}
              name="flour"
              label={"Flour"}
              rules={{ required: false }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              control={control}
              name="houseNumber"
              label={"House number"}
              rules={{ required: false }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TextInput
            control={control}
            name="nearbyLandMark"
            label={"Nearby landmarks"}
            rules={{ required: false }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextInput
            control={control}
            name="description"
            label={"Description"}
            rules={{ required: false }}
          />
        </Grid>
      </Grid>
    </OrderDetailFormStyle>
  );
};

export default OrderDetailForm;
