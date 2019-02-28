import React from "react";
import Landing from "./Landing";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const waypoints = [{ id: "123" }],
    handlers = {
      addWaypoint: function() {
        return true;
      },
      removeWaypoint: function() {
        return true;
      },
      reorderWaypoints: function() {
        return true;
      },
      initMap: function() {
        return true;
      },
      markerDragEnd: function() {
        return true;
      }
    };
  shallow(<Landing handlers={handlers} waypoints={waypoints} />);
});
