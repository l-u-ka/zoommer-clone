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
  PRIMARY = "primary"
}
export interface RegistrationFormInput {
  first_name:string;
  last_name:string;
  email:string;
  phone_number:string;
  password:string;
}

export interface AuthorizationFormInput {
  email:string;
  password:string;
}

export interface TCategory {
  id: string; 
  created_at: string;
  updated_at: string; 
  name: string;
}
export interface CartITem {
  
}

export interface TAuthRequest {
  access_token:string;
  refresh_token:string;
}

export interface TUserData {
  email:string;
  id:string;
  first_name:string;
  last_name:string;
  phone_number: string;
}

export interface ProductType {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category_name: string;
  salePrice: null | number;
}