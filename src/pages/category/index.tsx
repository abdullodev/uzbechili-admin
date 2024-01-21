import React from "react";
import { Route, Routes } from "react-router-dom";
import Category from "./container/Category";
import SubCategory from "./subcategory/SubCategory";

const index = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Category />} />
        <Route path=":id" element={<SubCategory />} />
      </Routes>
    </div>
  );
};

export default index;
