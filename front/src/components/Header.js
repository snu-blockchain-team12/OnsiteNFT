import { React, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
  EuiTitle,
  EuiListGroup,
  EuiAvatar,
  EuiText,
  EuiButton,
  EuiPanel,
} from "@elastic/eui";

import Cookies from "js-cookie";

const LoginPopup = (props) => {
  const history = useHistory();

  const logout = () => {
    Cookies.remove("user");
    history.push("/");
    window.location.reload();
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <EuiText>
          <span style={{ fontWeight: 600, fontSize: 24 }}>{Cookies.get("user")}</span>
        </EuiText>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <EuiButton size="m" fill onClick={() => logout()}>
          logout
        </EuiButton>
      </div>
    </div>
  );
};

function Header() {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const moveToHome = () => {
    //history.push("/");
  };

  const moveToLogin = () => {
    history.push("/login");
  };

  const logout = () => {
    Cookies.remove("user");
    history.push("/");
    window.location.reload();
  };
  let user = Cookies.get("user") || "";

  return (
    <EuiHeader
      theme="dark"
      style={{
        height: "70px",
      }}
      sections={[
        {
          items: [
            <EuiHeaderSectionItem>
              <EuiHeaderLogo iconType={"list"}>
                <p> </p>
              </EuiHeaderLogo>
            </EuiHeaderSectionItem>,
          ],
          borders: "none",
        },
        {
          items: [
            <EuiHeaderSectionItem>
              <EuiHeaderLogo iconType={"logoElasticStack"} onClick={() => moveToHome()}>
                <span style={{ fontWeight: 500, fontSize: 24 }}> Onsite NFT </span>
              </EuiHeaderLogo>
            </EuiHeaderSectionItem>,
            // <EuiHeaderLinks aria-label="App navigation dark theme example">
            //   <EuiHeaderLink isActive>Docs</EuiHeaderLink>
            //   <EuiHeaderLink>Code</EuiHeaderLink>
            //   <EuiHeaderLink iconType="help"> Help</EuiHeaderLink>
            // </EuiHeaderLinks>,
          ],
          borders: "none",
        },
        {
          items: [
            <EuiHeaderSectionItem>
              {user === "" ? (
                <>
                  <EuiButton size="m" fill onClick={() => moveToLogin()}>
                    login
                  </EuiButton>
                </>
              ) : (
                <>
                  <EuiHeaderSectionItem>
                    <EuiHeaderSectionItemButton aria-label="Account menu" onClick={togglePopup}>
                      <EuiAvatar name={user} size="l" />
                    </EuiHeaderSectionItemButton>
                    {isOpen && <LoginPopup handleClose={togglePopup} />}
                  </EuiHeaderSectionItem>
                  {/* <EuiHeaderSectionItemButton aria-label="Account menu">
                    <EuiAvatar name={Cookies.get("user")} size="l" />
                  </EuiHeaderSectionItemButton>

                  </EuiButton> */}
                </>
              )}
            </EuiHeaderSectionItem>,
          ],
          borders: "none",
        },
      ]}
    />
  );
}

export default Header;
