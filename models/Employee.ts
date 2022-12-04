export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    NOT_SPECIFIED = "NOT_SPECIFIED",
  }
export interface Employee{
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    gender:Gender;
    photo?:string
    _id: string;
}

export interface formValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: Gender | string;
}