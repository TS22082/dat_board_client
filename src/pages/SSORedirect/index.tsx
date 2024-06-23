import { useEffect } from "react";
import useSSORedirectData from "./useSSORedirectData";

const SSORedirect = () => {
  const { code } = useSSORedirectData();

  useEffect(() => {
    if (code) console.log(code);
  }, [code]);

  return <div>SSO Redirect</div>;
};

export default SSORedirect;
