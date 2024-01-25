import { Box, Grid, Switch } from "@mui/material";
import { DeleteIcon } from "assets/svgs";
import { AutoCompleteForm, ImageInput, TextInput } from "components";
import TextEditor from "components/form/TextEditor/TextEditor";
import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import { IIdImage } from "hooks/usePostImage";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { product_color, product_size } from "types/enums";
import { ProductFormStyled } from "./ProductForm.styled";
import { get } from "lodash";

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
    "product",
    editingProduct ? "put" : "post"
  );

  const sumbit = (data: any) => {
    const requestData = {
      ...data,
      imageUrls: productImages.map((image) => image),
    };

    mutate(requestData);
  };

  const { data: getByIdData, status: getByIdStatus } = useApi(
    `product/${editingProduct?._id}`,
    {},
    {
      enabled: !!editingProduct?._id,
    }
  );

  useEffect(() => {
    if (status === "success") {
      resetForm();
    }
  }, [status]);

  useEffect(() => {
    if (getByIdStatus === "success") {
      reset({
        ...get(getByIdData, "data", {}),
        categoryId: get(getByIdData, "data.category._id", ""),
        subCategoryId: get(getByIdData, "data.subCategory._id", ""),
      });
      setProductImages(get(getByIdData, "data.imageUrls", []));
    }
  }, [getByIdStatus, getByIdData]);

  return (
    <ProductFormStyled className="custom-drawer">
      <form id="product" onSubmit={handleSubmit(sumbit)}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <div className="product-images">
              <ImageInput
                control={control}
                setValue={setValue}
                name="imageUrls"
                rules={{ required: false }}
                multiple
                getImage={(img) => setProductImages((prev) => [...prev, img])}
              />
              {productImages?.map((image) => (
                <div className="product-image" key={image._id}>
                  <img
                    src={process.env.REACT_APP_BASE_URL! + image}
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
            <AutoCompleteForm
              control={control}
              name="categoryId"
              optionsUrl="categories"
              label={"Category"}
            />
          </Grid>
          {watch("categoryId") && (
            <Grid item md={12}>
              <AutoCompleteForm
                control={control}
                name="subCategoryId"
                optionsUrl={`categories/${watch("categoryId")}`}
                label={"Sub Category"}
                // multiple
              />
            </Grid>
          )}
          <Grid item md={12}>
            <AutoCompleteForm
              control={control}
              name="sizes"
              options={product_size}
              label={"Size"}
              multiple
            />
          </Grid>
          <Grid item md={12}>
            <AutoCompleteForm
              control={control}
              name="color"
              options={product_color}
              label={"Color"}
              multiple
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
              <label htmlFor="hasDiscount">{t("common.discount")}</label>
              <Switch
                checked={watch("hasDiscount")}
                id="hasDiscount"
                {...register("hasDiscount")}
              />
            </Box>
          </Grid>
        </Grid>
      </form>
    </ProductFormStyled>
  );
};

export default ProductForm;
