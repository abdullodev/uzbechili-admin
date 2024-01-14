import React, { useState } from "react";
import { Grid } from "@mui/material";
import { FormDrawer, Table } from "components";
import { usePromocodesColumns } from "./procomodes.column";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "store/storeHooks";
import { setOpenDrawer } from "components/elements/FormDrawer/formdrawer.slice";
import PromocodeForm from "../components/PromocodeForm";

const Promocodes = () => {
  const [editingPromocode, setEditingPromocode] = useState<any>(undefined);
  const columns = usePromocodesColumns();

  const dis = useAppDispatch();
  const formStore = useForm();

  const renderHeader = <Grid container width={600} spacing={2}></Grid>;

  const resetForm = () => {
    setEditingPromocode(undefined);
    formStore.reset({
      name: "",
      imageId: "",
    });
  };
  return (
    <div>
      <Table
        columns={columns}
        dataUrl="product/pagin"
        searchable
        title="Promocodes"
        onAddButton={() => dis(setOpenDrawer(true))}
        headerChildren={renderHeader}
      />

      <FormDrawer
        FORM_ID="category"
        isEditing={!!editingPromocode}
        customTitle={"Create"}
        onClose={resetForm}
      >
        <PromocodeForm
          formStore={formStore}
          editingPromocode={editingPromocode}
        />
      </FormDrawer>
    </div>
  );
};

export default Promocodes;
