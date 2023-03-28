import axios from "axios";
import Constants from "expo-constants";

axios.defaults.baseURL = Constants.expoConfig.extra.apiURL;
