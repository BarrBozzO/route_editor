import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import WayPointItem from "../waypoints/WayPointItem";

class WayPoints extends React.Component {
  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    this.props.reorderWaypoints(result.source.index, result.destination.index);
  };
  render() {
    const { waypoints, removeWaypoint } = this.props;
    const wpListItems = waypoints.map((waypoint, index) => (
      <WayPointItem
        key={waypoint.id}
        waypoint={waypoint}
        removeWaypoint={removeWaypoint}
        index={index}
      />
    ));

    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        <Droppable droppableId="droppable">
          {provided => (
            <div
              className="waypoints list-group list-group-flush"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {wpListItems}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

WayPoints.propTypes = {
  waypoints: PropTypes.array.isRequired,
  removeWaypoint: PropTypes.func.isRequired,
  reorderWaypoints: PropTypes.func.isRequired
};

export default WayPoints;
