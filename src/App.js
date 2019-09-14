import React, { Component } from "react";
import { ReactiveBase, DataSearch, RatingsFilter,RangeSlider } from "@appbaseio/reactivesearch";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <ReactiveBase
          app="yelp-app"
          credentials="hkXdk3vcA:a32683f3-c8ad-45db-8c86-2ac2c0f45e0c"
          type="yelp-app"
        >
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              Clean Search
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="col-lg-7 dataSearch">
                <DataSearch
                  componentId="nameReactor"
                  placeholder="Search for clean"
                  dataField="name"
                  searchInputId="NameSearch"
                  iconPosition="right"
                  renderError={error => (
                    <div>
                      Something went wrong with DataSearch
                      <br />
                      Error details
                      <br />
                      {error}
                    </div>
                  )}
                />
              </div>
            </div>
          </nav>

			<div className="box">
                <RangeSlider
                  componentId="RangeSliderSensor"
                  dataField="average_cost_for_two"
                  title="Average Cost for Two"
                  range={{
                    start: 0,
                    end: 7000
                  }}
                  rangeLabels={{
                    start: "Low",
                    end: "High"
                  }}
                  react={{
                    and: ["cuisineReactor", "currencyReactor"]
                  }}
                  renderError={error => (
                    <div>
                      Something went wrong with RangeSlider
                      <br />
                      Error details
                      <br />
                      {error}
                    </div>
                  )}
                />
              </div>
          
          <RatingsFilter
  			componentId="ratingsReactor"
  			dataField="rating"
 			 title="Avg. Customer Reviews"
  data={[
    { start: 4, end: 5, label: ">= 4 stars" },
    { start: 3, end: 5, label: ">= 3 stars" },
    { start: 2, end: 5, label: ">= 2 stars" },
    { start: 1, end: 5, label: "> 1 stars" }
  ]}
  showFilter={true}
  filterLabel="Avg. Customer Reviews"
  react={{
    and: [""]
  }}
  renderError={error => (
    <div>
      Something went wrong with RatingsFilter
      <br />
      Error details
      <br />
      {error}
    </div>
  )}
/>;
        </ReactiveBase>
      </div>
    );
  }
}

export default App;
