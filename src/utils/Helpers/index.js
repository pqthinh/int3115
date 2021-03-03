import { getConfigs } from "../../config/index";
import { Alert } from "react-native";
import axios from "axios";

const POINT_URL = getConfigs().POINT_URL;
const TOKEN = getConfigs().TOKEN;

export async function createPoint(sdgData) {
  const data = {
    user_id: sdgData.userId,
    sdg_type: sdgData.sdgType,
    sdg_ids: sdgData.sdgIds,
    ipaddr: sdgData.ipaddr || "",
    lat: sdgData.lat || "",
    lng: sdgData.lng || "",
    note: sdgData.note || "",
  };

  const res = await axios({
    method: "post",
    url: POINT_URL + "/api/v1/user_sdgs",
    headers: {
      "X-TADAIMA-TOKEN": TOKEN,
    },
    data,
  }).catch((error) => {
    const { messages } = error.response.data;
    Alert.alert("An error occurred while adding points.", messages);
    return;
  });

  return res;
}
