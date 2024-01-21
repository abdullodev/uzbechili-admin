import { Box, Grid, Switch } from "@mui/material";
import { DatePickerForm, SelectForm, TextInput } from "components";
import dayjs from "dayjs";
import { useApiMutation } from "hooks/useApi/useApiHooks";
import { FC, useEffect } from "react";

interface IPromocodeForm {
  formStore: any;
  editingPromocode?: Record<string, any>;
  resetForm: () => void;
}
const PromocodeForm: FC<IPromocodeForm> = ({
  formStore,
  editingPromocode,
  resetForm,
}) => {
  const { control, register, watch, handleSubmit, reset } = formStore;

  const { mutate, status } = useApiMutation(
    "/promo-code",
    editingPromocode ? "put" : "post"
  );

  const onSubmit = (data: Record<string, any>) => {
    const requestData = {
      ...data,
      fromDate: dayjs(data.fromDate).toISOString(),
      toDate: dayjs(data.toDate).toISOString(),
    };

    mutate(requestData);
  };

  useEffect(() => {
    if (status === "success") {
      resetForm();
    }
  }, [status]);

  useEffect(() => {
    if (editingPromocode) {
      reset(editingPromocode);
    }
  }, [editingPromocode]);

  return (
    <form
      style={{ width: "400px" }}
      onSubmit={handleSubmit(onSubmit)}
      id="promocode_form"
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextInput control={control} name="name" label={"Promocode name"} />
        </Grid>
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextInput
              control={control}
              type="number"
              name="amount"
              label={"Amount"}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectForm
              control={control}
              name="currency"
              label={"Type"}
              options={[
                {
                  _id: "percent",
                  name: "Foiz",
                },
                {
                  _id: "uzs",
                  name: "UZS",
                },
              ]}
            />
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
            <label htmlFor="infiniteUse">Infinity</label>
            <Switch
              checked={watch("infiniteUse")}
              id="infiniteUse"
              {...register("infiniteUse")}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextInput
            control={control}
            type="number"
            name="useAmount"
            label={"Using amount"}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PromocodeForm;
