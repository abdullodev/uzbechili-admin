import { FormDrawer, Table } from "components";
import WarningModal from "components/common/WarningModal/WarningModal";
import { setOpenDrawer } from "components/elements/FormDrawer/formdrawer.slice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "store/storeHooks";
import CategoryForm from "../components/CategoryForm";
import { useCategoryColumns } from "./category.columns";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const columns = useCategoryColumns();
  const [editingCategoryId, setEditingCategoryId] = useState<any>();
  const [categoryId, setCategoryId] = useState<any>();
  const navigate = useNavigate();
  const dis = useAppDispatch();
  const { t } = useTranslation();
  const formStore = useForm<any>();

  const resetForm = () => {
    setEditingCategoryId(undefined);
    formStore.reset({
      name: "",
      imageId: "",
    });
  };

  return (
    <>
      <Table
        columns={columns}
        dataUrl="/categories"
        searchable
        onAddButton={() => dis(setOpenDrawer(true))}
        onEditColumn={(row) => {
          setEditingCategoryId(row);
          dis(setOpenDrawer(true));
        }}
        onRowClick={(row) => navigate(`/category/${row._id}`)}
        title="Categories"
        onDeleteColumn={(row) => setCategoryId(row._id)}
        isGetAll
      />

      {/* <DragTable
        columns={columnsDrag}
        dataUrl="category/product"
        dragUrl="/category/positions"
        dragKey="categoryIds"
        render={render}
        setRender={setRender}
        onAddButton={() => dis(setOpenDrawer(true))}
      /> */}
      <WarningModal
        open={categoryId}
        setOpen={setCategoryId}
        url={`category`}
      />
      <FormDrawer
        FORM_ID="category"
        isEditing={!!editingCategoryId}
        customTitle={t("general.addCategory")}
        onClose={resetForm}
      >
        <CategoryForm
          formStore={formStore}
          resetForm={resetForm}
          editingCategoryId={editingCategoryId}
        />
      </FormDrawer>
    </>
  );
};

export default Category;
