import React from "react";
import PropTypes from "prop-types";

class WayPointInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let state = this.state;
    if (state.value.length > 0) {
      this.props.addWaypoint(state.value, {});

      state.value = "";
      this.setState(state);
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="waypoint-input-container">
        <form
          className="waypoint-input-container__form"
          onSubmit={this.handleSubmit}
        >
          <input
            className="waypoint-input-container__input"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            autoComplete="off"
          />
        </form>
      </div>
    );
  }
}

WayPointInput.propTypes = {
  addWaypoint: PropTypes.func.isRequired
};

export default WayPointInput;
