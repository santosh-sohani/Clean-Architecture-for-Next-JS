import axios from "axios";
import { userDetailsModel } from "@/domain/models/user.model";

export const fecthUsersFromApi = async (): Promise<userDetailsModel[]> => {
   try {
    const response = await axios.get<userDetailsModel[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/users`);
    return response.data;
   } catch (error) {
     throw new Error("Failed to fetch users");
   }
}

