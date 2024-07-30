import axios from "axios";
import { userDetailsModel } from "@/domain/models/user.model";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUserFromApiWithParams = async (id: number): Promise<userDetailsModel[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/users/?id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user with id: ${id}`);
  }
}
