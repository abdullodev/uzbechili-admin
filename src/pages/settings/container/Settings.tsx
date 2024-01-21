import { Grid } from "@mui/material";
import { useApi, useApiMutation } from "hooks/useApi/useApiHooks";
import useAllQueryParams from "hooks/useGetAllQueryParams/useAllQueryParams";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRoleManager } from "services/useRoleManager";
import { SETTINGS_TABS } from "types/enums";
import DeliveryDays from "../components/DeliveryDays";
import { SettingsStyled } from "./Settings.styled";
import DeliveryPrice from "../components/DeliveryPrice";

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allParams = useAllQueryParams();
  const [activeTab, setActiveTab] = useState(SETTINGS_TABS[0].key);
  const { t } = useTranslation();
  const hasAccess = useRoleManager();

  const handleTab = (tab: { name: string; key: string }) => {
    setActiveTab(tab.key);
    setSearchParams({ tab: tab.key });
  };

  return (
    <SettingsStyled>
      <Grid container spacing={3}>
        <Grid item sm={3}>
          <div className="tabs">
            <div className=" mb-4 pt-2 ps-3">
              <h3>Settings</h3>
            </div>
            {SETTINGS_TABS.map((tab) => {
              // if (hasAccess(tab.role)) {
              return (
                <div
                  className={`tab ${activeTab === tab.key && "active"}`}
                  onClick={() => handleTab(tab)}
                >
                  {tab.name}
                  {activeTab === tab.key && <div className="left-border"></div>}
                </div>
              );
              // }
            })}
          </div>
        </Grid>
        {activeTab === "deliveryDays" && (
          <Grid item sm={9}>
            <div className="settings">
              <DeliveryDays />
            </div>
          </Grid>
        )}
        {activeTab === "deliveryPrice" && (
          <Grid item sm={9}>
            <div className="settings">
              <DeliveryPrice />
            </div>
          </Grid>
        )}
      </Grid>
    </SettingsStyled>
  );
};

export default Settings;
