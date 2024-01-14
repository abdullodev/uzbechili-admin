import { useNavigate } from "react-router-dom";
import { MainButton, PhoneInput, TextInput } from "components";
import { LoginStyled } from "./Login.style";
import { useForm } from "react-hook-form";
import { useApiMutation } from "hooks/useApi/useApiHooks";
import { useAppDispatch } from "store/storeHooks";
import { ILoginData, setLoginData } from "store/reducers/LoginSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface ILoginBody {
  phoneNumber: string;
  password: string;
}

const Login = () => {
  const { control, handleSubmit } = useForm<ILoginBody>();
  const dis = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate, status } = useApiMutation<ILoginBody, ILoginData>(
    "auth/login",
    "post",
    {
      onSuccess(data) {
        dis(setLoginData(data.data));
        toast.success(t("general.success"));
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("employeeId", data.data._id);
        localStorage.setItem("i18nextLng", "uz");
        navigate("/store");
      },
    }
  );

  const submit = (data: ILoginBody) => {
    mutate(data);
  };

  return (
    <LoginStyled>
      <form onSubmit={handleSubmit(submit)}>
        <h1>LOGIN</h1>
        <main>
          <span>
            <PhoneInput
              control={control}
              name="phoneNumber"
              label="Phone number"
              autofocus={true}
              rules={{ required: false }}
            />
          </span>
          <span>
            <TextInput
              control={control}
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              rules={{ required: false }}
            />
          </span>
          <span>
            <MainButton
              disabled={status === "loading"}
              title="Kirish"
              type="submit"
              variant="contained"
            />
          </span>
        </main>
      </form>
    </LoginStyled>
  );
};

export default Login;
