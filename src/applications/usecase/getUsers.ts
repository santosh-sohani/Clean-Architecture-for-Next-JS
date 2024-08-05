import { userDetailsModel } from "@/domain/models/user.model";
import {fecthUsersFromApi} from "@/infrastructure/api/user.api";

export const getUsers = async (): Promise<userDetailsModel[]> => {
    // Transform your data if needed
    return await fecthUsersFromApi();
};


