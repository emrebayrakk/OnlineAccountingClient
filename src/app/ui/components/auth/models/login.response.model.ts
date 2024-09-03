import { CompanyModel } from "./company.model";
import { TokenModel } from "./token.model";

export class LoginResponseModel {
    email: string = "";
    userId: string = "";
    nameLastName: string = "";
    token: TokenModel = new TokenModel();
    companies: CompanyModel[] = [];
    company: CompanyModel = new CompanyModel();
    year: number = new Date().getFullYear();
}