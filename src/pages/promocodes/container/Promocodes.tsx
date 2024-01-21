import React, { useState } from "react";
import { Grid } from "@mui/material";
import { FormDrawer, Table } from "components";
import { usePromocodesColumns } from "./procomodes.column";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "store/storeHooks";
import { setOpenDrawer } from "components/elements/FormDrawer/formdrawer.slice";
import PromocodeForm from "../components/PromocodeForm";
import WarningModal from "components/common/WarningModal/WarningModal";

const Promocodes = () => {
  const [editingPromocode, setEditingPromocode] = useState<any>(undefined);
  const [promocodeId, setPromocodeId] = useState<string>();
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
        dataUrl="/promo-code"
        searchable
        title="Promocodes"
        onAddButton={() => dis(setOpenDrawer(true))}
        headerChildren={renderHeader}
        onDeleteColumn={(row) => setPromocodeId(row._id)}
        onEditColumn={(row) => {
          setEditingPromocode(row);
          dis(setOpenDrawer(true));
        }}
        isGetAll
      />

      <WarningModal
        open={promocodeId}
        setOpen={setPromocodeId}
        url={`promo-code`}
      />
      <FormDrawer
        FORM_ID="promocode_form"
        isEditing={!!editingPromocode}
        customTitle={"Create"}
        onClose={resetForm}
      >
        <PromocodeForm
          formStore={formStore}
          resetForm={resetForm}
          editingPromocode={editingPromocode}
        />
      </FormDrawer>
    </div>
  );
};

export default Promocodes;
