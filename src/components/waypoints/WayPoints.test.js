import React from "react";
import WayPoints from "./WayPoints";
import { shallow, mount } from "enzyme";
import WayPointItem from "./WayPointItem";

it("renders without crashing", () => {
  let waypoints = [];

  function removeWaypoint() {
    return true;
  }
  function reorderWaypoints() {
    return true;
  }
  const wrapper = shallow(
    <WayPoints
      waypoints={waypoints}
      removeWaypoint={removeWaypoint}
      reorderWaypoints={reorderWaypoints}
    />
  );
});

it("renders without crashing", () => {
  let waypoints = [{ id: "123", name: "test" }];

  function removeWaypoint() {
    return true;
  }
  function reorderWaypoints() {
    return true;
  }
  const wrapper = mount(
    <WayPoints
      waypoints={waypoints}
      removeWaypoint={removeWaypoint}
      reorderWaypoints={reorderWaypoints}
    />
  );
  expect(wrapper.find(WayPointItem)).toHaveLength(1);
});
