import Cookies from "js-cookie";
import { useState, useEffect } from "react";

function ProtectRout({ children }) {
  const [loggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const token = await Cookies.get("token");
    if (token) setLoggedIn(true);
  };

  return loggedin ? <div>{children}</div> : null;
}

export default ProtectRout;
