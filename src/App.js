import React, { Component } from "react";
import Landing from "./components/layout/Landing";
import uniqid from "uniqid";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      waypoints: [] // [{id: Int, name: String, marker: Object}, ...]
    };
    this.map = null;

    this.handleRemove = this.handleRemove.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleReorder = this.handleReorder.bind(this);
    this.handleMarkerDragEnd = this.handleMarkerDragEnd.bind(this);
  }

  handleRemove(id) {
    let state = this.state,
      waypointId = id;

    state.waypoints = state.waypoints.filter((waypoint, index) => {
      if (waypointId === waypoint.id) {
        this.map.removeMarker(waypoint.marker);
        return false;
      }
      return true;
    });
    this.map.drawRoute({
      path: state.waypoints.map(waypoint => waypoint.marker.getPosition())
    });

    this.setState(state);
  }

  handleAdd(name) {
    let state = this.state,
      newWaypoint = {
        id: uniqid(),
        name,
        marker: null
      };

    newWaypoint.marker = this.map.createMarker({ title: newWaypoint.name });
    state.waypoints.push(newWaypoint);
    this.map.drawRoute({
      path: state.waypoints.map(waypoint => waypoint.marker.getPosition())
    });

    this.setState(state);
  }

  handleMapLoad(map) {
    this.map = map;
  }

  handleReorder(startIndex, endIndex) {
    let state = this.state;

    const [removed] = state.waypoints.splice(startIndex, 1);
    state.waypoints.splice(endIndex, 0, removed);

    this.map.drawRoute({
      path: state.waypoints.map(waypoint => waypoint.marker.getPosition())
    });

    this.setState(state);
  }

  handleMarkerDragEnd() {
    this.map.drawRoute({
      path: this.state.waypoints.map(waypoint => waypoint.marker.getPosition())
    });
  }

  render() {
    const handlers = {
      addWaypoint: this.handleAdd,
      removeWaypoint: this.handleRemove,
      initMap: this.handleMapLoad,
      reorderWaypoints: this.handleReorder,
      markerDragEnd: this.handleMarkerDragEnd
    };
    return (
      <div className="App">
        <Landing handlers={handlers} waypoints={this.state.waypoints} />
      </div>
    );
  }
}

export default App;
