import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

class WayPointItem extends React.Component {
  onDeleteClick(waypointId) {
    this.props.removeWaypoint(waypointId);
  }

  render() {
    const { waypoint } = this.props;

    return (
      <Draggable draggableId={waypoint.id} index={this.props.index}>
        {provided => (
          <div
            className="waypoints__item"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="waypoints__item-name">{waypoint.name}</div>
            <div className="waypoints__item-btn">
              <button
                onClick={this.onDeleteClick.bind(this, waypoint.id)}
                type="button"
                className="btn btn-danger btn-sm"
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

WayPointItem.propTypes = {
  removeWaypoint: PropTypes.func.isRequired
};

export default WayPointItem;
