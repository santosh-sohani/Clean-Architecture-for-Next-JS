import axios from "axios";
import { userDetailsModel } from "@/domain/models/user.model";

export const fetchUserFromApiWithParams = async (id: number): Promise<userDetailsModel[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/?id=${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user with id: ${id}`);
  }
}
