import axios from "axios";
import { userDetailsModel } from "@/domain/models/user.model";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fecthUsersFromApi = async (): Promise<userDetailsModel[]> => {
   try {
    const response = await axios.get<userDetailsModel[]>(`${BASE_URL}/users`);
    return response.data;
   } catch (error) {
     throw new Error("Failed to fetch users");
   }
}

