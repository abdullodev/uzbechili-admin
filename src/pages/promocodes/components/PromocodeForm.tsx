import { Box, Grid, Switch } from "@mui/material";
import { DatePickerForm, SelectForm, TextInput } from "components";
import { FC } from "react";

interface IPromocodeForm {
  formStore: any;
  editingPromocode?: Record<string, any>;
}
const PromocodeForm: FC<IPromocodeForm> = ({ formStore, editingPromocode }) => {
  const { control, register, watch } = formStore;
  return (
    <form style={{ width: "400px" }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextInput control={control} name="name" label={"Promocode name"} />
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextInput
              control={control}
              type="number"
              name="name"
              label={"Amount"}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectForm control={control} name="type" label={"Type"} />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <DatePickerForm
            control={control}
            name="fromDate"
            label={"From date"}
          />
        </Grid>
        <Grid item xs={12}>
          <DatePickerForm control={control} name="toDate" label={"To date"} />
        </Grid>
        <Grid item md={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <label htmlFor="discountEnabled">Infinity</label>
            <Switch
              checked={watch("discountEnabled")}
              id="discountEnabled"
              {...register("discountEnabled")}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextInput
            control={control}
            type="number"
            name="usingAmount"
            label={"Using amount"}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PromocodeForm;
