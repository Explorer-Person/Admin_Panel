import { UserLoginDatas } from "../../../interface/UserData";
import { useGetCsrfTokenQuery } from "../../../redux/apis/getCsrfToken";
import LoginAdminUI from "../../componentsUI/componentPages/Login_Admin.UI";
import { useState } from "react";
import LoadingPage from "../../errors/LoadingPage";
import ErrorPage from "../../errors/ErrorPage";
import { useLoginAdminPanelMutation } from "../../../redux/apis/authAdminApi";
import DOMPurify from "dompurify";
import showMessage from "../../../messages/showMessage";


const LoginAdmin = () => {
  const {data: responseCsrf, isLoading: csrfLoading, isError: csrfError } = useGetCsrfTokenQuery();
  const csrfToken = responseCsrf?.csrfToken;
  const [loginAdmin] = useLoginAdminPanelMutation();
  const [loginValues, setLoginValues] = useState<UserLoginDatas>({
    username: "",
    password: "",
  });

  if(csrfLoading){
    return <LoadingPage/>
  }
  if(csrfError){
    return <ErrorPage messageTitle="ERROR" messageBody="CSRF Error"/>
  }
  const handleLoginInputs = (event: React.ChangeEvent<unknown>) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    setLoginValues((prevData) => ({
      ...prevData,
      [name]: DOMPurify.sanitize(value.trim()),
    }));
  };
  const handleSubmitLogin = () => {
    const loginDatas = {
      userDatas: loginValues,
      csrfToken: csrfToken,
    }
    loginAdmin(loginDatas)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((result:any)=>{
      if(result && result.data && result.data.authenticated === true){
        window.location.reload();    
        return result;
      } 
      if(result && result.error.data.errors){
        return showMessage(result.error.data.errors[0].msg, "error");
      }     
      if(result && result.error && result.error.data.status === "fail"){
        return showMessage(result.error.data.msg, "error");
      }
    })
    .then((result)=>{
      if(result && result.data && result.data.authenticated === true){
        window.location.assign("/admin/hub");    
      }    
    })
    .catch(()=> showMessage("Something Went Wrong", "error"));
  };

  return (
    <LoginAdminUI
      handleLoginInputs={handleLoginInputs}
      handleSubmitLogin={handleSubmitLogin}
    />
  );
};
export default LoginAdmin;
