export enum LANGUAGE_ENUM {
    KA = "ka",
    EN = "en",
  }

export interface TFLAGS {
    [LANGUAGE_ENUM.KA]: string;
    [LANGUAGE_ENUM.EN]: string;
}