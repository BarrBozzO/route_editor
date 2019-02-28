import React from "react";
import WayPointInput from "./WayPointInput";
import { shallow, mount } from "enzyme";
import { wrap } from "module";

it("renders without crashing", () => {
  function addWaypoint() {
    return true;
  }
  shallow(<WayPointInput addWaypoint={addWaypoint} />);
});
