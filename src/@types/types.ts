export enum LANGUAGE_ENUM {
  KA = "ka",
  EN = "en",
}

export interface TFlags {
  [LANGUAGE_ENUM.KA]: string;
  [LANGUAGE_ENUM.EN]: string;
}

export enum BUTTON_TYPE_ENUM {
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

export interface CategoryType {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  image: string;
}

export interface ProductType {
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

export interface CartProduct extends ProductType{
  category: CategoryType
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

export interface LikedProduct extends ProductType {
  category: CategoryType;
}

export interface WishlistItemType {
  id: string;
  created_at: string;
  updated_at: string;
  product_id: string;
  user_id: string;
  likedProduct: LikedProduct;
}

export interface TAuthRequest {
  access_token: string;
  refresh_token: string;
}

export interface TUserData {
  email: string;
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export enum SORT_BY_ENUM {
  DEFAULT = "sort.default",
  PRICE_ASC = "sort.price.asc",
  PRICE_DESC = "sort.price.desc",
  TITLE_ASC = "sort.title.asc",
  TITLE_DESC = "sort.title.desc",
}

export enum EDITING_FORM_ENUM {
  FIRST_NAME = "edit_first_name",
  LAST_NAME = "edit_last_name",
  EMAIL = "edit_email",
  PHONE_NUMBER = "edit_phone_number",
}
