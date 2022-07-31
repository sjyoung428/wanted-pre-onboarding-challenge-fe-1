import { PROPERTIES } from "@/config/properties";
import axios from "axios";

const clientApi = axios.create({
  baseURL: PROPERTIES.BASE_URL,
});

export default clientApi;
