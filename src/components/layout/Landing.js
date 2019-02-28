import React, { Component } from "react";
import { PropTypes } from "prop-types";
import WayPoints from "../waypoints/WayPoints";
import WayPointInput from "../waypoints/WayPointInput";
import Map from "../map/Map";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }
  toggleSidebar() {
    this.setState(prevState => ({
      toggled: !prevState.toggled
    }));
  }
  render() {
    const { waypoints, handlers } = this.props;
    return (
      <div
        className={`d-flex ${this.state.toggled ? "toggled" : ""}`}
        id="wrapper"
      >
        <div
          className="sidebar-wrapper bg-light border-right"
          style={{ position: "relative" }}
        >
          <div>
            {this.state.toggled ? (
              <button
                className="toggle-btn btn btn-primary toggled"
                onClick={this.toggleSidebar}
              >
                показать
              </button>
            ) : (
              <button
                className="toggle-btn btn btn-primary"
                onClick={this.toggleSidebar}
              >
                скрыть
              </button>
            )}
          </div>
          <WayPointInput addWaypoint={handlers.addWaypoint} />
          <WayPoints
            waypoints={waypoints}
            removeWaypoint={handlers.removeWaypoint}
            reorderWaypoints={handlers.reorderWaypoints}
          />
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <Map
              id="map"
              onMapLoad={handlers.initMap}
              onMarkerDragEnd={handlers.markerDragEnd}
            />
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  handlers: PropTypes.object.isRequired,
  waypoints: PropTypes.array.isRequired
};

export default Landing;
