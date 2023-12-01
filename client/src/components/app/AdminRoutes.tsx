import { Route, Routes } from "react-router-dom";

import HUB_UI from "../componentsUI/componentPages/Hub.UI";
import AddContent from "../componentsLogic/configureContents/Add_Content";
import UpdateContent from "../componentsLogic/configureContents/Update_Content";
import EditContent from "../componentsLogic/configureContents/Edit_Content";
import DeleteContents from "../componentsLogic/configureContents/Delete_Content";
import SeeContents from "../componentsLogic/configureContents/See_Content";
import ContentDetail from "../componentsLogic/configureContents/Content_Detail";
import ManagementPanel from "../componentsLogic/configureContents/Management_Panel";
import ErrorPage from "../errors/ErrorPage";
import { UserAuthInfo } from "../../interface/UserData";
import { useAuthorizeUserQuery } from "../../redux/apis/authorizeApi";
import LoadingPage from "../errors/LoadingPage";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/stores/hooks";
import { setAuthUser } from "../../redux/slices/AuthInfoSlices";

export function AdminRoutes() {
  const dispatch = useAppDispatch();
  const { data: authUser, isLoading: authLoading } = useAuthorizeUserQuery();

  const isAuthUser = !authUser ? false : authUser.authenticated;
  const rootAccess = !authUser ? false : authUser.rootAccess;

  const userAuthInfo: UserAuthInfo = {
    isAuthUser: isAuthUser,
    rootAccess: rootAccess,
  };

  useEffect(() => {
    if(authUser){
      dispatch(setAuthUser(userAuthInfo));
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isAuthUser, rootAccess]);

  // useEffect(()=>{
  //   if(window.location.href === "http://localhost:3030/admin"){
  //     return window.location.assign("/admin/hub");
  //   }
  // },[])

  if (authLoading) {
    return <LoadingPage />;
  }

  const adminRoutes = (
    <Routes>
      <Route
        path="/admin/hub"
        element={<HUB_UI rootAccess={userAuthInfo.rootAccess} />}
      />
      <Route path="/admin/addContent" element={<AddContent />} />
      <Route path="/admin/updateContents" element={<UpdateContent />} />
      <Route path="/admin/editContent" element={<EditContent />} />
      <Route path="/admin/deleteContents" element={<DeleteContents />} />
      <Route path="/admin/seeContents" element={<SeeContents />} />
      <Route path="/admin/contentDetail" element={<ContentDetail />} />
      <Route
        path="/admin/management"
        element={
          !rootAccess ? <HUB_UI rootAccess={rootAccess} /> : <ManagementPanel />
        }
      />

      <Route
        path="*"
        element={<ErrorPage messageTitle="404" messageBody="Page Not Found!" />}
      />
    </Routes>
  );

  return !isAuthUser ? (
    <Route
      path="*"
      element={<ErrorPage messageTitle="404" messageBody="Not Authorized!" />}
    />
  ) : (
    adminRoutes
  );
}
