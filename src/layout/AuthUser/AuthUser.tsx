import { Loading } from "components";
import { useApi } from "hooks/useApi/useApiHooks";
import { Outlet } from "react-router-dom";
import {
  ILoginData,
  setRoleData,
} from "store/reducers/LoginSlice";
import { useAppDispatch } from "store/storeHooks";

const AuthUser = () => {
  const dis = useAppDispatch();
  const hasToken = !!localStorage.getItem("token");
  // const { isLoading, isFetching } = useApi<ILoginData>(
  //   "profile",
  //   {},
  //   {
  //     enabled: hasToken,
  //     cacheTime: 0,
  //     staleTime: Infinity,
  //     onSuccess(data) {
  //       dis(setLoginData(data.data));
  //       localStorage.setItem("employeeId", data.data._id);
  //       if (!localStorage.getItem("i18nextLng")) {
  //         localStorage.setItem("i18nextLng", "uz");
  //       }
  //       navigate("/home");
  //     },
  //   }
  // );
  const { isLoading: roleIsLoading, isFetching: roleIsFetching } =
    useApi<ILoginData>(
      "role",
      {},
      {
        enabled: hasToken,
        cacheTime: 0,
        staleTime: Infinity,
        onSuccess(data) {
          dis(setRoleData(data.data));
        },
      }
    );
  if (
    // isLoading ||
    //  isFetching ||
    roleIsLoading ||
    roleIsFetching
  ) {
    return <Loading />;
  }
  return <Outlet />;
};

export default AuthUser;
