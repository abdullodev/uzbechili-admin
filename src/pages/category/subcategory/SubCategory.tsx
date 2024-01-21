import { FormDrawer, Table } from "components";
import WarningModal from "components/common/WarningModal/WarningModal";
import { setOpenDrawer } from "components/elements/FormDrawer/formdrawer.slice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store/storeHooks";
import SubCategoryForm from "./components/SubCategoryForm";
import { useSubCategoryColumns } from "./sub.columns";

const SubCategory = () => {
  const [render, setRender] = useState<boolean>(false);
  const columns = useSubCategoryColumns();

  const { id } = useParams<{ id: string }>();
  const [editSubCategory, setEditSubCatgory] = useState<any>();
  const [categoryId, setCategoryId] = useState<any>();
  const navigate = useNavigate();
  const dis = useAppDispatch();
  const { t } = useTranslation();
  const formStore = useForm<any>();

  const resetForm = () => {
    setEditSubCatgory(undefined);
    formStore.reset({
      name: "",
      imageId: "",
    });
  };

  return (
    <>
      <Table
        columns={columns}
        dataUrl={`/categories/${id}`}
        searchable
        onAddButton={() => dis(setOpenDrawer(true))}
        onEditColumn={(row) => {
          setEditSubCatgory(row);
          dis(setOpenDrawer(true));
        }}
        title="Sub Categories"
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
        setRender={setRender}
        url="category"
      />
      <FormDrawer
        FORM_ID="category"
        isEditing={!!editSubCategory}
        customTitle={"Sub Category"}
        onClose={resetForm}
      >
        <SubCategoryForm
          formStore={formStore}
          setRender={setRender}
          resetForm={resetForm}
          editSubCategory={editSubCategory}
        />
      </FormDrawer>
    </>
  );
};

export default SubCategory;
