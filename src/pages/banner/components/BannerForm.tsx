import { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import { AutoCompleteForm, ImageInput, TextInput } from "components";
import { UseFormReturn } from "react-hook-form";
import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import { useTranslation } from "react-i18next";
import TextEditor from "components/form/TextEditor/TextEditor";

interface IEmployeesForm {
  formStore: UseFormReturn<any>;
  editingBannerId: Record<string, any>;
  resetForm: () => void;
}
const BannerForm: FC<IEmployeesForm> = ({
  formStore,
  editingBannerId,
  resetForm,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset, watch, setValue } = formStore;

  const { mutate, status } = useApiMutation(
    "banner",
    editingBannerId ? "put" : "post"
  );

  useEffect(() => {
    if (status === "success") {
      resetForm();
    }
  }, [status]);

  const submit = (data: any) => {
    mutate({
      _id: editingBannerId,
      ...data,
      imageUrl: data.imageUrl,
    });
  };

  useEffect(() => {
    if (editingBannerId) {
      reset(editingBannerId);
      setValue("imageUrl", editingBannerId.imageUrl);
    }
  }, [editingBannerId]);

  return (
    <div className="custom-drawer">
      <form id="banner" onSubmit={handleSubmit(submit)}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <TextInput control={control} name="name" label={"Banner name"} />
          </Grid>
          <Grid item md={12}>
            <TextEditor
              value={watch("note")}
              onChange={(value) => {
                setValue("note", value);
              }}
            />
          </Grid>
          <Grid item md={12}>
            <ImageInput control={control} setValue={setValue} name="imageUrl" />
            <div className="d-flex justify-content-between mt-3">
              <span>O'lcham</span>
              <span>1080(px) - 250(px)</span>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default BannerForm;
