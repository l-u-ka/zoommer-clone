export enum LANGUAGE_ENUM {
    GEO = "GEO",
    ENG = "ENG",
  }

export interface TFLAGS {
    [LANGUAGE_ENUM.GEO]: string;
    [LANGUAGE_ENUM.ENG]: string;
}