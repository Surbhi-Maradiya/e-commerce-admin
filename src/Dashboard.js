import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
   constructor() {
      super();
      this.state = {
         dashboard: []
      }
   }

   componentDidMount() {
      this.getDashboard();
   }

   getDashboard = () => {
      let url = "https://www.firstenquiry.com/api/react/store/dashboard.php";
      axios.get(url).then(response => {
         this.setState({
            dashboard: response.data
         })
      })
   }

   render() {
      return <div className="container">
         <div className="row form-group">
            <div className="col-md-12 text-center">
               <h2 className="text-warning p-3">Welcome , {sessionStorage.getItem("username")} </h2>
            </div>
         </div>
         <div className="row text-center">
            <div className="col-md-3 form-group">
               <div className="border p-3">
                  <i className="fa fa-headset fa-2x text-success"></i>
                  <h4> Received Orders  </h4>
                  <p className="text-danger">{this.state.dashboard.totalorder}</p>
               </div>
            </div>

            <div className="col-md-3 form-group">
               <div className="border p-3">
                  <i className="fa fa-truck fa-2x text-info"></i>
                  <h4> Orders Delivered </h4>
                  <p className="text-danger">{this.state.dashboard.delivered}</p>
               </div>
            </div>

            <div className="col-md-3 form-group">
               <div className="border p-3">
                  <i className="fa fa-spinner fa-spin fa-2x text-primary"></i>
                  <h4> Orders in Process </h4>
                  <p className="text-danger">{this.state.dashboard.processing}</p>
               </div>
            </div>

            <div className="col-md-3 form-group">
               <div className="border p-3">
                  <i className="fa fa-sitemap fa-2x text-warning"></i>
                  <h4> Cancel Order </h4>
                  <p className="text-danger">{this.state.dashboard.cancel}</p>
               </div>
            </div>

            <div className="col-md-3 form-group">
               <div className="border p-3">
                  <i className="fa fa-sitemap fa-2x text-warning"></i>
                  <h4> Items in Stock </h4>
                  <p className="text-danger">{this.state.dashboard.stock}</p>
               </div>
            </div>

            <div className="col-md-3 form-group">
               <div className="border p-3">
                  <i className="fa fa-cart-plus fa-2x text-primary"></i>
                  <h4> Today Sales </h4>
                  <p className="text-danger">{this.state.dashboard.todaysale}</p>
               </div>
            </div>

            <div className="col-md-3 form-group">
               <div className="border p-3">
                  <i className="fa fa-people-carry fa-2x text-success"></i>
                  <h4> Total Sales </h4>
                  <p className="text-danger">{this.state.dashboard.totalsale}</p>
               </div>
            </div>

         </div>
      </div>;
   }
}

export default Dashboard;