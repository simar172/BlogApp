import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogin, isLogin } from "../auth/Index";
import Base from "../cmpnts/Base";
import { loginU } from "../services/Service";
import vcont from "../Context/VerificationContext";
import swal from "sweetalert";
export default function Login() {
  const navigate = useNavigate();
  const cont = useContext(vcont);
  useEffect(() => {
    localStorage.removeItem("data");
    cont.update(true);
  }, [cont.helper.flag]);

  const [loginDetails, setloginDetails] = useState({
    username: "",
    password: "",
  });

  const handlChange = (e, property) => {
    setloginDetails({
      ...loginDetails,
      [property]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (loginDetails.username === "" || loginDetails.password === "") {
      toast.error("Username or Password is Empty!!");
      return;
    }
    loginU(loginDetails)
      .then((token) => {
        doLogin(token, () => {
          navigate("/user/dashboard");
        });

        toast.success("success");
      })
      .catch((err) => {
        toast.error("Please enter correct details!!");
        return;
      });
  };

  return (
    <Base>
      <div className="container " style={{ "margin-top": "50px" }}>
        <div className="card">
          <div className="card-body">
            <h1 align="left">
              <i>Login here...</i>
            </h1>
            <br />
            <p className="card-text">
              <form onSubmit={submitForm}>
                <div className="mb-3" align="left">
                  <label for="exampleInputEmail1" className="form-label">
                    <h3>Email address</h3>
                  </label>

                  <input
                    onChange={(e) => handlChange(e, "username")}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter email"
                    aria-describedby="emailHelp"
                    value={loginDetails.username}
                  />
                  {loginDetails.username !== "" ? (
                    <p
                      style={{
                        backgroundColor: "lightgoldenrodyellow",
                        borderRadius: "5px",
                      }}
                    >
                      {loginDetails.username}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3" align="left">
                  <label for="exampleInputPassword1" className="form-label">
                    <h3>Password</h3>
                  </label>
                  <input
                    onChange={(e) => handlChange(e, "password")}
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter password"
                    value={loginDetails.password}
                  />
                  {loginDetails.password !== "" ? (
                    <p
                      style={{
                        backgroundColor: "lightgoldenrodyellow",
                        borderRadius: "5px",
                      }}
                    >
                      {loginDetails.password}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
                <br />
                <br />
                <a
                  href="data/forgot"
                  className=""
                  style={{ pointerEvents: `${isLogin() ? "none" : ""} ` }}
                >
                  <u className="text text-success ">Forgot password</u>
                </a>
              </form>
            </p>
          </div>
        </div>
      </div>
    </Base>
  );
}
