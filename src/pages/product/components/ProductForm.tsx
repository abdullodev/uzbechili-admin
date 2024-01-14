import { Dispatch, SetStateAction, useEffect } from "react";
import { Box, Grid, Switch } from "@mui/material";
import {
  AutoCompleteForm,
  DatePickerForm,
  ImageInput,
  SelectForm,
  TextInput,
} from "components";
import { useApiMutation } from "hooks/useApi/useApiHooks";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { ProductFormStyled } from "./ProductForm.styled";
import TextEditor from "components/form/TextEditor/TextEditor";
import { IIdImage } from "hooks/usePostImage";
import { DeleteIcon } from "assets/svgs";
import { DISCOUNT_TYPES } from "types/enums";

interface IProductForm {
  formStore: any;
  resetForm: () => void;
  editingProduct: any;
  productProps: {
    productImages: IIdImage[];
    setProductImages: Dispatch<SetStateAction<IIdImage[]>>;
    mainImageId: any;
    setMainImageId: any;
  };
}

const ProductForm = ({
  formStore,
  resetForm,
  editingProduct,
  productProps,
}: IProductForm) => {
  const { productImages, setProductImages, mainImageId, setMainImageId } =
    productProps;

  const { control, handleSubmit, reset, setValue, register, watch } = formStore;
  const { t } = useTranslation();

  const { mutate, status } = useApiMutation<any>(
    editingProduct ? `product/${editingProduct?._id}` : "product",
    editingProduct ? "put" : "post"
  );

  const sumbit = (data: any) => {
    const requestData = {
      ...data,
      imageIds: productImages.map((image) => image._id),
      mainImageId,
      discountStartAt: data.discountStartAt?.toISOString(),
      discountEndAt: data.discountEndAt?.toISOString(),
      _id: editingProduct?._id,
    };
    mutate(requestData);
  };

  useEffect(() => {
    if (status === "success") {
      resetForm();
    }
  }, [status]);

  useEffect(() => {
    if (editingProduct) {
      reset({
        ...editingProduct,
        categoryId: editingProduct.category?._id,
      });
    }
  }, [editingProduct]);

  return (
    <ProductFormStyled className="custom-drawer">
      <form id="product" onSubmit={handleSubmit(sumbit)}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <div className="product-images">
              <ImageInput
                control={control}
                setValue={setValue}
                name="imageUrl"
                rules={{ required: false }}
                multiple
                getImage={(img) => setProductImages((prev) => [...prev, img])}
              />
              {productImages?.map((image) => (
                <div className="product-image" key={image._id}>
                  <img
                    src={process.env.REACT_APP_BASE_URL + image.url}
                    alt="product"
                  />
                  <div className="on-hover">
                    <span
                      className="delete"
                      onClick={() =>
                        setProductImages((prev) =>
                          prev.filter((prevImg) => prevImg._id !== image._id)
                        )
                      }
                    >
                      <DeleteIcon />
                    </span>
                    <span
                      className={`main-image ${
                        image._id === mainImageId && "active"
                      }`}
                      onClick={() => setMainImageId(image?._id)}
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item md={12}>
            <TextInput
              name="name"
              control={control}
              label={t("common.productName")}
            />
          </Grid>
          <Grid item md={12}>
            <TextInput
              name="price"
              control={control}
              label={t("common.price")}
              type="number"
            />
          </Grid>
          <Grid item md={12}>
            <TextInput
              name="inStock"
              control={control}
              label={"Color"}
              type="text"
            />
          </Grid>
          <Grid item md={12}>
            <label className="custom-label">{t("common.description")}</label>
            <TextEditor
              value={watch("description")}
              onChange={(value) => {
                setValue("description", value);
              }}
            />
          </Grid>
          <Grid item md={12}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <label htmlFor="discountEnabled">{t("common.discount")}</label>
              <Switch
                checked={watch("discountEnabled")}
                id="discountEnabled"
                {...register("discountEnabled")}
              />
            </Box>
            {watch("discountEnabled") && (
              <Grid container spacing={2} alignItems="end">
                <Grid item md={6}>
                  <TextInput
                    control={control}
                    name="discountValue"
                    label={t("common.discountValue")}
                    type="number"
                  />
                </Grid>
                <Grid item md={6}>
                  <SelectForm
                    control={control}
                    name="discountType"
                    options={DISCOUNT_TYPES}
                    label={t("common.type")}
                  />
                </Grid>
                <Grid item md={6}>
                  <DatePickerForm
                    control={control}
                    name="discountStartAt"
                    disableTime={true}
                    label={t("common.discountStartAt")}
                  />
                </Grid>
                <Grid item md={6}>
                  <DatePickerForm
                    control={control}
                    name="discountEndAt"
                    disableTime={true}
                    label={t("common.discountEndAt")}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </form>
    </ProductFormStyled>
  );
};

export default ProductForm;
