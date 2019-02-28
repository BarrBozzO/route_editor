import React from "react";
import WayPointItem from "./WayPointItem";
import { shallow, mount } from "enzyme";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

it("renders without crashing", () => {
  let waypoint = {
    id: "234"
  };
  function removeWaypoint() {
    return true;
  }
  shallow(<WayPointItem waypoint={waypoint} removeWaypoint={removeWaypoint} />);
});

it("calls removeWaypoint event on remove button click", () => {
  let waypoint = {
    id: "KLA3fmaw",
    name: "name"
  };
  const removeWaypoint = jest.fn();
  const onDragEndFake = function() {};
  let wrapper = mount(
    <DragDropContext onDragEnd={onDragEndFake}>
      <Droppable droppableId="droppable">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <WayPointItem
              index={0}
              key={waypoint.id}
              waypoint={waypoint}
              removeWaypoint={removeWaypoint}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
  wrapper
    .find("button.btn.btn-danger")
    .first()
    .simulate("click");
  expect(removeWaypoint).toBeCalledWith(waypoint.id);
});
