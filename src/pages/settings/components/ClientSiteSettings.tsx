import React, { useEffect } from "react";
import { ImageInput, MainButton, PhoneInput, TextInput } from "components";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  BottomBorder,
  HeaderOfSettings,
  ImageStyled,
  SettingTitle,
  StyledSocial,
} from "../container/Settings.styled";
import { Grid } from "@mui/material";
import EditIcon from "components/elements/Table/assets/EditIcon";
import {
  CallIcon,
  FacebookIcon,
  HelpIcon,
  InstagramIcon,
  TelegramIcon,
} from "assets/svgs";
import Apple from "../../../assets/images/appleIcon.png";
import Playmarket from "../../../assets/images/PlaymarketIcon.png";
import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import { toast } from "react-toastify";

const ClientSiteSettings = () => {
  const { t } = useTranslation();

  const { handleSubmit, control, setValue, reset } = useForm();

  // const {
  //   data: getData,
  //   refetch,
  //   status: getStatus,
  // } = useApi("/site-settings");
  // const { mutate, status } = useApiMutation("/site-settings", "post", {
  //   onSuccess() {
  //     refetch();
  //     toast.success(t("general.success"));
  //   },
  // });

  const onSubmit = (data: Record<string, any>) => {
    const links: object[] = [];
    Object.entries(data).forEach(([key, value]) => {
      if (
        (key === "instagram" ||
          key === "help" ||
          key === "telegram" ||
          key === "facebook" ||
          key === "call" ||
          key === "playmarket" ||
          key === "apple") &&
        value
      ) {
        links.push({ type: key, link: value });
      }
    });
    const requestData: any = {
      ...data,
      logoId: data.logoId._id,
      links: links,
    };

    delete requestData["instagram"];
    delete requestData["help"];
    delete requestData["facebook"];
    delete requestData["telegram"];
    delete requestData["call"];
    delete requestData["playmarket"];
    delete requestData["apple"];

    // mutate(requestData);
  };

  // useEffect(() => {
  //   if (getStatus === "success") {
  //     const siteSettings = getData.data;
  //     reset({
  //       ...siteSettings,
  //       logoId: siteSettings.logo,
  //     });

  //     siteSettings.links.forEach((social: any) => {
  //       setValue(`${social.type}`, social.link);
  //     }, []);
  //   }
  // }, [getStatus]);

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
            name="title"
            type="number"
            label={"Day"}
            rules={{ required: true }}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ClientSiteSettings;
