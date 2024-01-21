import React, { useEffect } from "react";
import { Box, Grid, Switch } from "@mui/material";
import { ImageInput, TextInput } from "components";
import { UseFormReturn } from "react-hook-form";
import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface IBranchForm {
  formStore: UseFormReturn<any>;
  resetForm: () => void;
  editSubCategory?: Record<string, any>;
  setRender?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubCategoryForm: React.FC<IBranchForm> = ({
  formStore,
  resetForm,
  editSubCategory,
  setRender,
}) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { control, handleSubmit, reset, setValue, watch, register } = formStore;

  const { mutate, status } = useApiMutation<any>(
    "category",
    editSubCategory ? "put" : "post"
  );

  const sumbit = (data: any) => {
    mutate({
      ...data,
      categoryId: id,
      isSoon: false,
    });
  };

  useEffect(() => {
    if (status === "success") {
      resetForm();
      setRender?.(true);
    }
  }, [status]);

  useEffect(() => {
    if (editSubCategory) {
      reset(editSubCategory);
    }
  }, [editSubCategory]);

  return (
    <div className="custom-drawer">
      <form id="category" onSubmit={handleSubmit(sumbit)}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <TextInput name="name" control={control} label={t("common.name")} />
          </Grid>
          {/* <Grid item md={12}>
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
          </Grid> */}
        </Grid>
      </form>
    </div>
  );
};

export default SubCategoryForm;
