import { userDetailsModel } from "@/domain/models/user.model";
import { fetchUserFromApiWithParams } from "@/infrastructure/api/userParams.api";

export const getUserWithParam = async (id:number):Promise<userDetailsModel[]> => {
    return await fetchUserFromApiWithParams(id)
}