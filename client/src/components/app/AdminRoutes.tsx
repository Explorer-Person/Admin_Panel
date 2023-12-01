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
    if (authUser) {
      dispatch(setAuthUser(userAuthInfo));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthUser, rootAccess]);

  if (authLoading) {
    return <LoadingPage />;
  }

  const adminRoutes = (
    <Routes>
      <Route
        path="/hub"
        element={<HUB_UI rootAccess={userAuthInfo.rootAccess} />}
      />
      <Route path="/addContent" element={<AddContent />} />
      <Route path="/updateContents" element={<UpdateContent />} />
      <Route path="/editContent" element={<EditContent />} />
      <Route path="/deleteContents" element={<DeleteContents />} />
      <Route path="/seeContents" element={<SeeContents />} />
      <Route path="/contentDetail" element={<ContentDetail />} />
      <Route
        path="/management"
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
    <Routes>
      <Route
        path="*"
        element={<ErrorPage messageTitle="404" messageBody="Not Authorized!" />}
      />
    </Routes>
  ) : (
    adminRoutes
  );
}
