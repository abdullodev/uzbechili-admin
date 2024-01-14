import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { ImageInput, TextInput } from "components";
import { UseFormReturn } from "react-hook-form";
import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import { useTranslation } from "react-i18next";

interface IBranchForm {
  formStore: UseFormReturn<any>;
  resetForm: () => void;
  editingCategoryId?: string;
  setRender?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryForm: React.FC<IBranchForm> = ({
  formStore,
  resetForm,
  editingCategoryId,
  setRender,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, reset, setValue } = formStore;

  const { mutate, status } = useApiMutation<any>(
    editingCategoryId
      ? `category/product/${editingCategoryId}`
      : "category/product",
    editingCategoryId ? "put" : "post"
  );

  const { data: getByIdData, status: getByIdStatus } = useApi(
    `category/product/${editingCategoryId}`,
    {},
    {
      enabled: !!editingCategoryId,
      suspense: false,
    }
  );

  const sumbit = (data: any) => {
    mutate({
      ...data,
      imageId: data.imageId?._id,
      _id: editingCategoryId,
    });
  };

  useEffect(() => {
    if (status === "success") {
      resetForm();
      setRender?.(true);
    }
  }, [status]);

  useEffect(() => {
    if (getByIdStatus === "success") {
      reset({
        name: getByIdData.data.name,
        imageId: getByIdData.data.image,
      });
    }
  }, [getByIdStatus, getByIdData]);

  return (
    <div className="custom-drawer">
      <form id="category" onSubmit={handleSubmit(sumbit)}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <TextInput name="name" control={control} label={t("common.name")} />
          </Grid>
          {/* <Grid item md={12}>
            <ImageInput
              control={control}
              setValue={setValue}
              name="imageId"
              rules={{ required: false }}
              className="mb-3"
            />
          </Grid> */}
        </Grid>
      </form>
    </div>
  );
};

export default CategoryForm;
