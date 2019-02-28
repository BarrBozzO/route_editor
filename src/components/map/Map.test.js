import React from "react";
import Map from "./Map";
import { shallow, mount } from "enzyme";

it("renders without crashing", () => {
  function onMapLoad() {
    return true;
  }
  function onMarkerDragEnd() {
    return true;
  }
  let wrapper = mount(
    <Map id="map" onMapLoad={onMapLoad} onMarkerDragEnd={onMarkerDragEnd} />
  );
});
