import { toaster } from "evergreen-ui";
import jwt_decode from "jwt-decode";

export function verifyToken() {
  const token = sessionStorage.getItem("token");

  // if token is null return is expired
  if (!token) {
    toaster.warning("session timeout");
    return true;
  }

  var decodedToken = jwt_decode(token);

  var dateNow = new Date();

  // check if token is expired
  if (decodedToken.exp * 1000 < dateNow.getTime()) {
    //  return true if expired
    toaster.warning("session timeout");
    return true;
  } else {
    return false;
  }
}
