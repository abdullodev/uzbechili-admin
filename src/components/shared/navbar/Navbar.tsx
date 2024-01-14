import { useApiMutation } from "hooks/useApi/useApiHooks";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/storeHooks";
import { SIDEBAR_CLOSE, SIDEBAR_OPEN } from "styles/global.style";
import { FlexEnd, LanguageBox, NavbarContainer } from "./Navbar.style";

import { useRoleManager } from "services/useRoleManager";
import useSocket from "services/useSocket";
import { ArrowDown, ProfileIcon } from "assets/svgs";
import { MenuItem, MenuList, Paper, Popover } from "@mui/material";
import { get } from "lodash";
import WarningModal from "components/common/WarningModal/WarningModal";
import useOutsideClick from "services/useOutsideClick/useOutsideClick";
import CommonButton from "components/common/commonButton/Button";
import { useTranslation } from "react-i18next";
import { socketReRender } from "store/reducers/SocketSlice";
// @ts-ignore
import audio from "../../../assets/order-voice.mp3";
// @ts-ignore
import completedVoice from "../../../assets/completed-voice.mp3";
import { socket } from "socket";

const Navbar = ({ hasNavbar }: { hasNavbar: boolean }) => {
  const [newNotification, setNewNotification] = useState<any>();
  const handleChangeIsFree = useSocket();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const hasAccess = useRoleManager();
  const [limit, setLimit] = useState(10);
  const [exit, setExit] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;
  const [pop, setPop] = useState<boolean>(false);
  const defaultLang = localStorage.getItem("i18nextLng");
  const [language, setLanguage] = useState<string>(
    defaultLang ? defaultLang : "uz"
  );
  const { i18n } = useTranslation();
  const dis = useAppDispatch();

  const makeNoice = () => {
    try {
      new Audio(audio).play();
    } catch (error) {
      console.log(error);
    }
  };

  const makeNoiceCompleted = () => {
    try {
      new Audio(completedVoice).play();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function OrderUpdate(data: any) {
      dis(socketReRender(true));
      console.log(data);
      if (!!data.data.state?.isSoundable) makeNoiceCompleted();
    }
    function OrderCreate(data: any) {
      dis(socketReRender(true));
      console.log(data);

      if (!!data.data.state?.isSoundable) makeNoice();
    }

    socket.on("orderCreated", OrderCreate);
    socket.on("orderUpdated", OrderUpdate);
    return () => {
      socket.off("orderUpdated", OrderUpdate);
      socket.off("orderCreated", OrderCreate);
    };
  }, []);

  const { mutate } = useApiMutation<{
    // _id: string;
    currentBranchId: string;
  }>("employee/branch", "post", {
    onSuccess(data, variables, context) {
      if (pathname?.split("/")?.some((path) => path?.length === 24)) {
        navigate("order/table");
      }
      navigate(0);
    },
  });
  const { value } = useAppSelector((state) => state.sideBarData);
  const { loginData } = useAppSelector((state) => state.LoginState);
  // @ts-ignore
  const admin = JSON.parse(localStorage.getItem("admin"));

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const openUser = Boolean(anchorElUser);
  const handleClickUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const refLang = useRef(null);

  const handleChangeLang = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    setPop(false);
    i18n.changeLanguage(lang);
  };

  // const logoutUser = () => {
  //   localStorage.clear();
  //   navigate("/login", {
  //     replace: false,
  //   });
  // };

  const { mutate: getUnconfirmedContracts, data: unconfirmedContractsData } =
    useApiMutation(`contract/unconfirmed?page=1&limit=${limit}`, "get");

  useOutsideClick(refLang, () => {
    setPop(false);
  });
  return (
    <NavbarContainer>
      <div
        style={{ left: value ? SIDEBAR_OPEN : SIDEBAR_CLOSE }}
        className="navbar-content"
      >
        <FlexEnd>
          <LanguageBox ref={refLang}>
            <CommonButton
              title={
                language === "uz"
                  ? "O'zbek"
                  : language === "ru"
                  ? "Русский"
                  : "English"
              }
              endIcon={<ArrowDown />}
              onClick={() => setPop(!open)}
              className={pop ? "arrow" : ""}
            />
            <Paper className={pop ? "show" : ""}>
              <MenuList>
                <MenuItem
                  className={language === "uz" ? "active" : ""}
                  onClick={() => handleChangeLang("uz")}
                >
                  O'zbek
                </MenuItem>
                <MenuItem
                  className={language === "ru" ? "active" : ""}
                  onClick={() => handleChangeLang("ru")}
                >
                  Русский
                </MenuItem>
                {/* <MenuItem
                  className={language === "en" ? "active" : ""}
                  onClick={() => handleChangeLang("en")}
                >
                  English
                </MenuItem> */}
              </MenuList>
            </Paper>
          </LanguageBox>
          <div className="profile">
            <span
              className="icon"
              aria-describedby={popoverId}
              onClick={(e: any) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
            >
              <ProfileIcon />
            </span>
            <Popover
              id={popoverId}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              className="popover-container"
            >
              <div className="popover">
                <h4>
                  {get(admin, "firstName", "")} {get(admin, "lastName", "")}
                </h4>
                <span>{get(admin, "phoneNumber", "")}</span>
                <button className="mt-2" onClick={() => setExit(true)}>
                  Chiqish
                </button>
              </div>
            </Popover>
            <WarningModal
              open={exit}
              setOpen={setExit}
              title="Rostdan ham chiqmoqchimisiz?"
              // confirmFn={logoutUser}
            />
          </div>
        </FlexEnd>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
