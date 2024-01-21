import { AutoCompleteFilter, Checkbox, FormDrawer, Table } from "components";
import { useProductColumns } from "./product.columns";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ProductForm from "../components/ProductForm";
import { IIdImage } from "hooks/usePostImage";
import { useAppDispatch } from "store/storeHooks";
import { setOpenDrawer } from "components/elements/FormDrawer/formdrawer.slice";

const Client = () => {
  const columns = useProductColumns();
  const dis = useAppDispatch();
  const { t } = useTranslation();
  const formStore = useForm();
  const [editingProduct, setEditingProduct] = useState();
  const [productId, setProductId] = useState<string>("");
  const [productImages, setProductImages] = useState<IIdImage[]>([]);
  const [mainImageId, setMainImageId] = useState<any>();

  const renderHeader = <Grid container width={600} spacing={2}></Grid>;

  const resetForm = () => {
    setEditingProduct(undefined);
    setProductImages([]);
    setMainImageId(null);
    formStore.setValue("isActive", "");
    formStore.reset({
      name: "",
      price: "",
      salePrice: "",
      inStock: "",
      isActive: "",
      discountValue: "",
      discountType: "",
      discountStartAt: "",
      discountEndAt: "",
    });
  };

  return (
    <>
      <Table
        columns={columns}
        dataUrl="product/pagin"
        searchable
        headerChildren={renderHeader}
        onAddButton={() => dis(setOpenDrawer(true))}
        title="Products"
        exQueryParams={{
          isActive: formStore.watch("isActive") || undefined,
        }}
        onEditColumn={(row) => {
          dis(setOpenDrawer(true));
          setEditingProduct(row);
        }}
        onDeleteColumn={(row) => setProductId(row._id)}
      />
      <FormDrawer
        FORM_ID="product"
        isEditing={!!editingProduct}
        customTitle={t("general.addProduct")}
        onClose={resetForm}
      >
        <ProductForm
          formStore={formStore}
          resetForm={resetForm}
          editingProduct={editingProduct}
          productProps={{
            productImages,
            setProductImages,
            mainImageId,
            setMainImageId,
          }}
        />
      </FormDrawer>
    </>
  );
};

export default Client;
