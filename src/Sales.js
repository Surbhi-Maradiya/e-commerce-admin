import React, { Component } from 'react';
import axios from 'axios';

export default class Sales extends Component {
    constructor() {
        super();
        this.state = {
            orderlist: [],
            message: ''
        }
    }

    componentDidMount() {
        this.getOrder();
    }

    getOrder = () => {
        let url = "https://www.firstenquiry.com/api/react/store/orderlist.php";
        axios.get(url).then(response => {
            this.setState({
                orderlist: response.data,
                message: "Total Products - " + response.data.length
            })
        })
    }

    changeState = (value) => {
        this.setState({
            message: "Please wait processing..."
        })
        let formData = new FormData();
        formData.append("value", value);
        let url = "https://www.firstenquiry.com/api/react/store/orderlist.php";
        axios.post(url, formData).then(response => {
            this.setState({
                orderlist: response.data,
                message: "Orders loaded successfully !"
            })
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <br />
                        <select className="form-control">
                            <option value="All" onClick={this.changeState.bind(this, 'All')}>All Sales</option>
                            <option value="delivered" onClick={this.changeState.bind(this, 'delivered')}>Delivered</option>
                            <option value="cancel" onClick={this.changeState.bind(this, 'cancel')}>Cancel</option>
                            <option value="processing" onClick={this.changeState.bind(this, 'processing')}>Processing</option>
                        </select>
                    </div>
                    <div className="col-md-9 text-center">
                        <h3 className="text-secondary">Order & Sales</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-success text-center">Sales List - {this.state.message}</h4>
                        <table className="table table-stripped table-sm">
                            <thead>
                                <tr className="tex-secondary">
                                    <th>Order No</th>
                                    <th>C-Name</th>
                                    <th>C-Mobile</th>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>price/Unit</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.orderlist.map((row, index) => {
                                        return <tr key={index}>
                                            <td>{row.orderid}</td>
                                            <td>{row.cname}</td>
                                            <td>{row.mobile}</td>
                                            <td>{row.product}</td>
                                            <td>{row.qty}</td>
                                            <td>{row.priceperunit}</td>
                                            <td>{row.price}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
