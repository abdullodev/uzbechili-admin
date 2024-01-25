import React, { useEffect } from "react";
import { Box, Grid, Switch } from "@mui/material";
import { ImageInput, TextInput } from "components";
import { UseFormReturn } from "react-hook-form";
import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import { useTranslation } from "react-i18next";

interface IBranchForm {
  formStore: UseFormReturn<any>;
  resetForm: () => void;
  editingCategoryId?: Record<string, any>;
}

const CategoryForm: React.FC<IBranchForm> = ({
  formStore,
  resetForm,
  editingCategoryId,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset, setValue, watch, register } = formStore;

  const { mutate, status } = useApiMutation<any>(
    "category",
    editingCategoryId ? "put" : "post"
  );

  const sumbit = (data: any) => {
    console.log(data);

    mutate({
      ...data,
    });
  };

  useEffect(() => {
    if (status === "success") {
      resetForm();
    }
  }, [status]);

  useEffect(() => {
    if (editingCategoryId) {
      reset(editingCategoryId);
    }
  }, [editingCategoryId]);

  return (
    <div className="custom-drawer">
      <form id="category" onSubmit={handleSubmit(sumbit)}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <TextInput name="name" control={control} label={t("common.name")} />
          </Grid>
          <Grid item md={12}>
            <ImageInput control={control} setValue={setValue} name="imageUrl" />
            <div className="d-flex justify-content-between mt-3">
              {/* <span>O'lcham</span>
              <span>1080(px) - 250(px)</span> */}
            </div>
          </Grid>
          <Grid item md={12}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <label htmlFor="isSoon">Soon</label>
              <Switch
                checked={watch("isSoon")}
                id="isSoon"
                {...register("isSoon")}
              />
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CategoryForm;
