import React, { useState } from "react";
import hubCSS from "/public/css/hub.module.css";
import UserSettings from "../componentUIParts/ManagementPanelUIParts/pages/UserSettings";
import SuperUserSettings from "../componentUIParts/ManagementPanelUIParts/pages/SuperUserSettings";
import { HandleSubmitUserProps } from "../../../interface/Interfaces";

const ManagementPanelUI = ({handleSubmitUser, handleSubmitSuperUser}: HandleSubmitUserProps) => {
  const [page, setPage] = useState("");
  const handlePages = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
       const selectedId = event.currentTarget.id
       setPage(selectedId);
  }

  return (
    <div>
      {page === "superUserSetting" ? <SuperUserSettings handleSubmitSuperUser={handleSubmitSuperUser}/> : <UserSettings handleSubmitUser={handleSubmitUser}/>}
      <div className={`${hubCSS.settingBox}`}>
        <div className={`d-flex`}>
          <div id="userSetting" onClick={handlePages} className={`${hubCSS.settingCol}`}>User Setting</div>
          <div id="superUserSetting" onClick={handlePages} className={`${hubCSS.settingCol}`}>Super User Setting</div>
        </div>
      </div>
    </div>
  );
};
export default ManagementPanelUI;
