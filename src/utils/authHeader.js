import { isJson } from "./utils";
export default function AuthHeader() {
  const accessToken = localStorage.getItem("accessToken");
  const device = localStorage.getItem("device");

  const token = isJson(accessToken) ? JSON.parse(accessToken) : null;

  const deviceDetails = isJson(device) ? JSON.parse(device) : null;

  if (token?.accessToken) {
    return {
      Authorization: `${token?.tokenType} ${token?.accessToken}`,
      "Content-type": "application/json",
      // "X-Device-Id": deviceDetails?.deviceId,
      "X-Device-Id": "366836ac-e1e8-4579-81f7-67c78c6c13d8",
      "X-Device-Type": "Web",
      "X-Device-Fcm-Token": "d6UflH4NX-tSa5B4rc85Sb:APA91bHhmOwf9nl5bslJEJw4A0QE-dY8p5YQidJ915hXk3UAHs5bPmtNokrbrgC5DhoWnZhzt8xRrVmnSCE1kinVaAeRdq3S3nvsbuk4VcSBg4t34MsWIIM",
    };
  } else {
    return {
      "Content-type": "application/json",
      // "X-Device-Id": deviceDetails?.deviceId,
      "X-Device-Id": "366836ac-e1e8-4579-81f7-67c78c6c13d8",
      "X-Device-Type": "Web",
      "X-Device-Fcm-Token": "d6UflH4NX-tSa5B4rc85Sb:APA91bHhmOwf9nl5bslJEJw4A0QE-dY8p5YQidJ915hXk3UAHs5bPmtNokrbrgC5DhoWnZhzt8xRrVmnSCE1kinVaAeRdq3S3nvsbuk4VcSBg4t34MsWIIM",
    };
  }
}