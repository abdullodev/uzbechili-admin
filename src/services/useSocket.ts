import { useApiMutation } from "hooks/useApi/useApiHooks";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { socket } from "socket";

import { useAppDispatch } from "store/storeHooks";

const useSocket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dis = useAppDispatch();

  const { mutate: mutateStatus } = useApiMutation<{ isFree: boolean }>(
    "/employee/status",
    "post",
    {
      onSuccess() {},
    }
  );

  useEffect(() => {
    function onConnect() {
      console.log("Socket connected!");
    }

    function onDisconnect() {
      console.log("Socket disconnected!");
    }

    function onNewOrderEvent(order: any) {
      console.log("New order: ", order);
      navigate(`/order/order-person/${order?._id}`);
      if (order?._id) {
        setTimeout(() => {
          mutateStatus({ isFree: false });
          // socket.emit("change", {
          //   dispatcherId: _id,
          //   branchId: currentBranch._id,
          //   isFree: false,
          // });
        }, 1000);
      }
    }

    function onChangeEvent(change: { isFree: boolean }) {
      console.log("Change: ", change);
    }

    function onBotEvent(data: any) {
      console.log("bot: ", data);
      console.log("location?.pathname: ", location?.pathname);

      if (data?.isFree) {
        toast.success(`Buyurtma qabul qilindi!`);
        navigate("/order/table");
        // }
      } else {
        toast.error(`Menejer qabul qilmadi: ${data?.reason}`);
      }
    }
    // socket.connect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("newOrder", onNewOrderEvent);
    socket.on("change", onChangeEvent);
    socket.on("bot", onBotEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("newOrder", onNewOrderEvent);
      socket.off("change", onChangeEvent);
      socket.off("bot", onBotEvent);
    };
  }, []);
  const handleChangeIsFree = (event: any) => {
    mutateStatus({
      // dispatcherId: _id,
      // branchId: currentBranch._id,
      isFree: event?.target?.checked,
    });
    if (!event?.target?.checked) {
    }
  };
  return handleChangeIsFree;
};

export default useSocket;
