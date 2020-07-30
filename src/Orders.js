import React, { Component } from 'react';
import axios from 'axios';

export default class Orders extends Component {
    constructor() {
        super();
        this.state = {
            productList: [],
            orderlist: [],
            message: '',
            pname: '',
            indprice: 0,
            totprice: 0,
            quantity: 0,
            cname: '',
            mobile: ''
        }
    }

    componentDidMount() {
        this.getOrder();
        this.getProduct();
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

    getProduct = () => {
        let url = "https://www.firstenquiry.com/api/react/store/allproduct.php";
        axios.get(url).then(response => {
            this.setState({
                productList: response.data
            })
        })
    }

    handleName = (index) => {
        this.setState({
            pname: this.state.productList[index].name,
            indprice: this.state.productList[index].price
        })
    }

    handleQuantity = (event) => {
        console.log(event.target.value);
        this.setState({
            quantity: event.target.value,
            totprice: this.state.indprice * event.target.value
        })
    }

    handleCname = (event) => {
        this.setState({
            cname: event.target.value
        })
    }

    handleMobile = (event) => {
        this.setState({
            mobile: event.target.value
        })
    }

    save = () => {
        this.setState({
            message: "Please wait processing..."
        })
        let formData = new FormData();
        formData.append("customer", this.state.cname);
        formData.append("mobile", this.state.mobile);
        formData.append("product", this.state.pname);
        formData.append("qty", this.state.quantity);
        formData.append("totprice", this.state.totprice);
        formData.append("indprice", this.state.indprice);
        let url = "https://www.firstenquiry.com/api/react/store/saveorder.php";
        axios.post(url, formData).then(response => {
            this.setState({
                message: response.data.status,
                pname: '',
                indprice: 0,
                totprice: 0,
                quantity: 0,
                cname: '',
                mobile: ''
            })
            this.getOrder();
        })
    }

    changeState = (orderId, value) => {
        this.setState({
            message: "Please wait processing..."
        })
        let formData = new FormData();
        formData.append("orderid", orderId);
        formData.append("value", value);
        let url = "https://www.firstenquiry.com/api/react/store/changeorder.php";
        axios.post(url, formData).then(response => {
            this.setState({
                message: response.data.status
            })
            this.getOrder();
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h3 className="text-secondary">Order Management</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 p-2 border">
                        <h4 className="text-danger text-center">New Order</h4>
                        <div className="form-group">
                            <lable>Customer Name</lable>
                            <input type="text" className="form-control" value={this.state.cname} onChange={this.handleCname} />
                        </div>
                        <div className="form-group">
                            <lable>Customer Mobile No</lable>
                            <input type="number" className="form-control" value={this.state.mobile} onChange={this.handleMobile} />
                        </div>
                        <div className="form-group">
                            <lable>Product</lable>
                            <select className="form-control">
                                <option value="">Choose</option>
                                {
                                    this.state.productList.map((row, index) => {
                                        return <option onClick={this.handleName.bind(this, index)}>{row.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <lable>Product Quantity</lable>
                            <input type="number" className="form-control" value={this.state.quantity} onChange={this.handleQuantity} />
                        </div>
                        <div className="form-group">
                            <lable>Total Price</lable>
                            <input readOnly="readonly" type="number" className="form-control" value={this.state.totprice} />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-danger btn-sm" onClick={this.save}>Place Order</button>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h4 className="text-success text-center">Order List - {this.state.message}</h4>
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
                                    <th>Status</th>
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
                                            <td>
                                                <select>
                                                    <option value={row.status}>{row.status}</option>
                                                    <option value="delivered" onClick={this.changeState.bind(this, row.orderid, 'delivered')}>Delivered</option>
                                                    <option value="cancel" onClick={this.changeState.bind(this, row.orderid, 'cancel')}>Cancel</option>
                                                    <option value="processing" onClick={this.changeState.bind(this, row.orderid, 'processing')}>Processing</option>
                                                </select>
                                            </td>
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
