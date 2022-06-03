import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiButton,
  EuiFieldPassword,
} from "@elastic/eui";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";
import API from "../../API";

function Login() {
  const history = useHistory();

  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");

  var [isSubmitted, SetIsSubmitted] = useState("");

  const [dual, setDual] = useState(true);

  const handleSubmit = (event) => {
    API.post(
      "/login_post",
      {
        name: username,
        pass: password,
      },
      {
        // withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        SetIsSubmitted("good");
        Cookies.set("user", res.data['user'])

        // redirect to home, reload
        history.push("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        SetIsSubmitted("bad");
      });
  };

  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup direction="column" size={{ width: "50%" }}>
          <EuiFlexItem>
            <EuiFieldText
              placeholder="username을 입력해주세요"
              prepend={["username"]}
              onChange={(e) => setUsername(e.target.value)}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFieldPassword
              placeholder="비밀번호를 입력해주세요"
              prepend={["password"]}
              type={dual ? "dual" : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Use aria labels when no actual label is in use"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButton
              type="submit"
              fill={typeof username !== "undefined" && typeof password !== "undefined"}
              size={"s"}
              iconType={"push"}
              onClick={handleSubmit}
            >
              로그인
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem>
            <p>hello</p>
            <p>{isSubmitted}</p>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export default Login;
