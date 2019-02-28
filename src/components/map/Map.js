import React, { Component } from "react";
import PropTypes from "prop-types";

class Map extends Component {
  constructor(props) {
    super(props);
    this.balloon = null;
    this.geocoder = null;
    this.map = null;
    this.route = null;
    this.onMapLoaded = this.onMapLoaded.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
    this.drawRoute = this.drawRoute.bind(this);
  }

  onMapLoaded() {
    this.map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      {
        center: { lat: 41.0082, lng: 28.9784 },
        zoom: 8,
        streetViewControl: false,
        mapTypeControl: false
      }
    );
    this.balloon = new window.google.maps.InfoWindow();
    this.geocoder = new window.google.maps.Geocoder();
    this.props.onMapLoad({
      createMarker: this.addMarker,
      removeMarker: this.removeMarker,
      drawRoute: this.drawRoute
    });
    window.addEventListener(
      "resize",
      window.google.maps.event.trigger(this.map, "resize")
    );
  }

  addMarker(options) {
    let marker = new window.google.maps.Marker(
      Object.assign(
        {
          position: this.map.getCenter(),
          draggable: true,
          map: this.map
        },
        options
      )
    );
    marker.addListener("click", () => {
      this.balloon.marker = marker;
      this.balloon.setContent(
        `<div><p><b>Название:</b> ${marker.title}</p>${
          marker.formatted_address ? marker.formatted_address : ""
        }</div>`
      );
      this.balloon.open(this.map, marker);
    });
    marker.addListener("dragstart", () => {
      this.balloon.close();
      this.balloon.marker = null;
    });
    marker.addListener("dragend", () => {
      this._geocodeCoords(marker);
      this.props.onMarkerDragEnd();
    });
    this.balloon.addListener("closeclick", () => {
      this.balloon.marker = null;
    });
    this._geocodeCoords(marker);
    return marker;
  }

  removeMarker(marker) {
    if (marker !== null) {
      marker.setMap(null);
      marker = null;
      return true;
    }
    return false;
  }

  drawRoute(options) {
    if (this.route === null) {
      this.route = new window.google.maps.Polyline(
        Object.assign(
          {
            path: [],
            geodesic: true,
            strokeColor: "#F42002",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            map: this.map
          },
          options
        )
      );
    } else {
      this.route.setPath(options.path || []);
    }
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyCP3HdXkRp_SclLXHar_C_7FflyU1rjK80`;
      var x = document.getElementsByTagName("body")[0];
      x.appendChild(s);
      s.addEventListener("load", e => {
        this.onMapLoaded();
      });
    } else {
      this.onMapLoaded();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize");
  }

  _geocodeCoords(marker) {
    this.geocoder.geocode(
      { location: marker.getPosition() },
      (results, status) => {
        if (marker) {
          if (status === "OK") {
            if (results[0]) {
              marker.formatted_address = `<p><b>Адрес:</b> ${
                results[0].formatted_address
              }</p>`;
            } else {
              marker.formatted_address = "<b>Не удалось определить адрес</b>";
            }
          } else {
            marker.formatted_address = "";
          }
        }
      }
    );
  }

  render() {
    return <div style={{ width: "100%", height: "100%" }} id={this.props.id} />;
  }
}

Map.propTypes = {
  id: PropTypes.string.isRequired,
  onMapLoad: PropTypes.func.isRequired,
  onMarkerDragEnd: PropTypes.func.isRequired
};

export default Map;
