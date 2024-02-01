import React from "react";
import { Route, Routes } from "react-router-dom";
import Client from "./container/Customer";
import Details from "./details/Details";

const index = () => {
  return (
    <Routes>
      <Route path="*" element={<Client />} />
      <Route path=":id" element={<Details />} />
    </Routes>
  );
};

export default index;
