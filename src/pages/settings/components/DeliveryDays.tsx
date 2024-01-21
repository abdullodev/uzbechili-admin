import { Grid } from "@mui/material";
import { MainButton, TextInput } from "components";
import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { HeaderOfSettings, SettingTitle } from "../container/Settings.styled";

const DeliveryDays = () => {
  const { t } = useTranslation();

  const { handleSubmit, control, setValue, reset } = useForm();

  const {
    data: getData,
    refetch,
    status: getStatus,
  } = useApi("/general-settings");

  const { mutate, status } = useApiMutation("/general-settings", "put", {
    onSuccess() {
      refetch();
      toast.success(t("general.success"));
    },
  });

  const onSubmit = (data: Record<string, any>) => {
    const requestData: any = {
      ...data,
    };

    mutate(requestData);
  };

  useEffect(() => {
    if (getStatus === "success") {
      const siteSettings = getData.data;
      reset({
        ...siteSettings,
      });
    }
  }, [getStatus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="clientSite">
      <HeaderOfSettings>
        <SettingTitle>Delivery time</SettingTitle>
        <MainButton
          title={t("general.save")}
          variant="contained"
          type="submit"
          form="clientSite"
          // disabled={status === "loading"}
        />
      </HeaderOfSettings>

      <Grid container spacing={2}>
        <Grid item md={12}>
          <TextInput
            control={control}
            name="deliveryDays"
            type="number"
            label={"Day"}
            rules={{ required: true }}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default DeliveryDays;
