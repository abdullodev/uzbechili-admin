import { IRoleData } from "store/reducers/LoginSlice";

export const PAYMENT_TYPES = [
  {
    _id: "cash",
    name: "Naqd",
    trans_key: "cash",
  },
  // {
  //   _id: "card",
  //   name: "Karta",
  //   trans_key: "card",
  // },
];

export const DISCOUNT_TYPES = [
  {
    _id: "percent",
    name: "Foiz",
    trans_key: "percent",
  },
  {
    _id: "amount",
    name: "Miqdor",
    trans_key: "amount",
  },
];

export const STATE_TYPES = [
  {
    _id: "created",
    name: "Yaratildi",
    trans_key: "created",
  },
  {
    _id: "inProcess",
    name: "Jarayonda",
    trans_key: "inProcess",
  },
  {
    _id: "inDelivery",
    name: "Yetkazib berishda",
    trans_key: "inDelivery",
  },
  {
    _id: "completed",
    name: "Tugatildi",
    trans_key: "completed",
  },
];

export const STORE_STATES = [
  {
    _id: "active",
    name: "Aktiv",
    trans_key: "active",
  },
  {
    _id: "blocked",
    name: "Blok",
    trans_key: "blocked",
  },
];

export const RATINGS = [
  {
    rate: 5,
  },
  {
    rate: 4,
  },
  {
    rate: 3,
  },
  {
    rate: 2,
  },
  {
    rate: 1,
  },
];

interface ISettingsTabs {
  name: string;
  key: string;
  role: keyof IRoleData;
}
export const SETTINGS_TABS: ISettingsTabs[] = [
  {
    name: "Mijoz sayt sozlamalari",
    key: "clientSettings",
    role: "_id",
  },
];

export const SHARE_FORM_STORE_OPTIONS = [
  {
    _id: "percent",
    name: "Foiz",
    trans_key: "percent",
  },
  {
    _id: "amount",
    name: "Miqdor",
    trans_key: "amount",
  },
];
