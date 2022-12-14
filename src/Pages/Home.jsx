import React from "react";
import Base from "../cmpnts/Base";
import AllPost from "../cmpnts/AllPost";
import SideMenu from "./SideMenu";

export default function Home() {
  return (
    <Base>
      <div className="container " id="simar">
        <div className="row g-0 text-center">
          <div className="col-sm-2 col-md-1 ">
            <SideMenu />
          </div>

          <div className="ms-5 col-sm-10 col-md-10 " >
            <AllPost />
          </div>
        </div>
      </div>
    </Base>
  );
}
