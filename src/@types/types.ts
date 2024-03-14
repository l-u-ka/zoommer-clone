import { ReactNode } from "react";

export enum LanguageEnum {
  KA = "ka",
  EN = "en",
}

export interface Flags {
  [LanguageEnum.KA]: string;
  [LanguageEnum.EN]: string;
}

interface FooterLink {
  text: string | ReactNode ;
  url: string;
  img?: string;
}
export interface FooterColumn {
  title: string | ReactNode;
  links: FooterLink[]
}


export enum ButtonEnum {
  DEFAULT = "default",
  PRIMARY = "primary",
}
export interface RegistrationFormInput {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface AuthorizationFormInput {
  email: string;
  password: string;
}

export interface ProductCategory {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  image: string;
  price: number;
  salePrice: null | number;
  category_name: string;
}

export interface CartProduct extends Product {
  category: ProductCategory;
}
export interface CartITem {
  id: string;
  created_at: string;
  updated_at: string;
  product_id: string;
  user_id: string;
  count: number;
  cartProduct: CartProduct;
}

export interface LikedProduct extends Product {
  category: ProductCategory;
}

export interface WishlistItem {
  id: string;
  created_at: string;
  updated_at: string;
  product_id: string;
  user_id: string;
  likedProduct: LikedProduct;
}

export interface BoughtProduct {
  id: string;
  created_at: string;
  updated_at: string;
  totalPrice: number;
  totalItems: number;
}

export interface AuthRequest {
  access_token: string;
  refresh_token: string;
}

export interface UserData {
  email: string;
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

enum UserRoleEnum {
  CUSTOMER = "customer",
  ADMIN = "admin",
}

export interface UserInfo {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  verified: boolean;
  role: UserRoleEnum;
  password: string;
  refresh_token: string;
}

export enum SortEnum {
  DEFAULT = "sort.default",
  PRICE_ASC = "sort.price.asc",
  PRICE_DESC = "sort.price.desc",
  TITLE_ASC = "sort.title.asc",
  TITLE_DESC = "sort.title.desc",
}

export enum EditFormEnum {
  FIRST_NAME = "edit_first_name",
  LAST_NAME = "edit_last_name",
  EMAIL = "edit_email",
  PHONE_NUMBER = "edit_phone_number",
}

export enum ProfileMenuEnum {
  ON_EDITING = "edit.profile",
  ON_WISHLIST = "wishlist",
  ON_MENU = "hello",
  ON_PURCHASE_HISTORY= "purchase.history"
}