import React, { Component } from "react";
import { 
  ReactiveBase,
  ResultList,
  MultiList,
  RatingsFilter,
  SelectedFilters,
  MultiDataList,
  DataSearch,
  RangeSlider } from "@appbaseio/reactivesearch";
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import Login from './components/Login/Login.js'
import Register from './components/Login/Register.js'
import "./App.css";
import americanFood from "./Images/americanFood.jpg";
import barFood from "./Images/barFood.jpeg";
import breakfast from "./Images/breakfast.jpeg";
import desserts from "./Images/desserts.jpeg";
import sandwich from "./Images/sandwich.jpeg";
//import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {hashHistory} from 'react-router';
import { Button} from 'antd';
import { Router, Route,Link,Redirect  } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class App extends Component {
    onData(resturant) {
    const image =
      resturant.cuisine === "Bar Food"
        ? barFood
        : resturant.cuisine === "Desserts"
        ? desserts
        : resturant.cuisine === "Breakfast"
        ? breakfast
        : resturant.cuisine === "American"
        ? americanFood
        : sandwich;

    const stars = [];
    const { rating, currency, address, cuisine } = resturant;
    for (let x = 0; x < rating; x++) {
      stars.push(
        <span key={x}>
          <i className="fa fa-star" />
        </span>
      );
    }

    const result = {
      image: image,
      title: resturant.name,
      description: (
        <div>
          <p>{address}</p>
          <span className="tag">{currency}</span>
          <span className="tag">{cuisine}</span>
          <div>Avg. Customer Reviews : {stars}</div>
        </div>
      )
    };
    return result;
  }

  onPopoverClick(marker) {
    return (
      <div
        className="row"
        style={{ margin: "0", maxWidth: "300px", paddingTop: 10 }}
      >
        <div className="col s12">
          <div>
            <strong>{marker.name}</strong>
          </div>
          <p style={{ margin: "5px 0", lineHeight: "18px" }}>
            {marker.address}
          </p>
        </div>
      </div>
    );
  }


  handleClick(event){
 window.location.href("./components/Login/Login.js")

  }

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
              City Service
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
                  placeholder="Search for cleaning company"
                  dataField="name"
                  searchInputId="NameSearch"
                  iconPosition="right"
                />
              </div>
              <div className="links">
                <a
                href = "/Login"
                  target="_blank"
                  className="btn link"
                >
               
                 <button  type="button">Login</button>

                  

                </a>
                <a
                 
                  href = "/Register"
                  className="btn link"
                >
                  <button  type="button">Register</button>
                </a>
                <a
                  target="_blank"
                
                  className="btn link"
                >
                  <button type="button">Admin</button>
                </a>
              </div>
            </div>
          </nav>

          <div className="row">
            <div className="col-8 col-lg-3 col-md-3 col-sm-4 scroll">
              <div className="box">
                <MultiList
                  dataField="currency.keyword"
                  title="Currency Options"
                  componentId="currencyReactor"
                  placeholder="Filter Currency"
                  showFilter={true}
                  filterLabel="Currency Options"
                  react={{
                    and: [
                      "ratingsReactor",
                      "cuisineReactor",
                      "deliveringNowReactor",
                      "tableBookinReactor",
                      "deliveryReactor",
                      "bookingReactor",
                      "nameReactor",
                      "RangeSliderSensor"
                    ]
                  }}
                />
              </div>

              <div className="box">
                <MultiList
                  dataField="cuisine.keyword"
                  title="Cuisine Options"
                  componentId="cuisineReactor"
                  placeholder="Filter Cuisine"
                  showFilter={true}
                  filterLabel="Cuisine Options"
                  react={{
                    and: [
                      "ratingsReactor",
                      "currencyReactor",
                      "deliveringNowReactor",
                      "tableBookinReactor",
                      "musicReactor",
                      "bookingReactor",
                      "nameReactor",
                      "RangeSliderSensor"
                    ]
                  }}
                />
              </div>

              <div className="box">
                <MultiDataList
                  dataField="delivering_now"
                  componentId="deliveringNowReactor"
                  title="Refine By"
                  showSearch={false}
                  data={[
                    {
                      label: "Delivering Now",
                      value: true
                    }
                  ]}
                />

                <MultiDataList
                  dataField="has_table_booking"
                  componentId="tableBookinReactor"
                  showSearch={false}
                  data={[
                    {
                      label: "Has Table Bookings",
                      value: true
                    }
                  ]}
                />
                <MultiDataList
                  dataField="online_delivery"
                  componentId="deliveryReactor"
                  showSearch={false}
                  data={[
                    {
                      label: "Online Delivery",
                      value: true
                    }
                  ]}
                />
              </div>
            </div>
            <div className="col-12 col-lg-6 col-md-6 col-sm-8 scroll marginBottom">
              <SelectedFilters />
              <ResultList
                componentId="queryResult"
                dataField="name"
                from={0}
                size={15}
                onData={this.onData}
                pagination={true}
                react={{
                  and: [
                    "currencyReactor",
                    "ratingsReactor",
                    "cuisineReactor",
                    "deliveringNowReactor",
                    "bookingReactor",
                    "deliveryReactor",
                    "tableBookinReactor",
                    "nameReactor",
                    "RangeSliderSensor"
                  ]
                }}
              />
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6">
              
            </div>
          </div>
        </ReactiveBase>
      </div>
      
    );
  }
}
const style = {
  margin: 15,
};


export default App;


