import React, { Component } from 'react';
import axios from 'axios';

export default class Stock extends Component {
    constructor() {
        super();
        this.state = {
            productList: [],
            message: '',
            name: '',
            price: 0,
            quantity: 0
        }
    }

    componentDidMount() {
        this.getProduct();
    }

    getProduct = () => {
        let url = "https://www.firstenquiry.com/api/react/store/allproduct.php";
        axios.get(url).then(response => {
            this.setState({
                productList: response.data,
                message: "Total Products - " + response.data.length
            })
        })
    }

    save = () => {
        this.setState({
            message: "Please wait processing..."
        })
        let formData = new FormData();
        formData.append("pname", this.state.name);
        formData.append("price", this.state.price);
        formData.append("quantity", this.state.quantity);
        let url = "https://www.firstenquiry.com/api/react/store/saveproduct.php";
        axios.post(url, formData).then(response => {
            this.setState({
                message: response.data.status,
                name: '',
                price: 0,
                quantity: 0
            })
            this.getProduct(); //to reload the product list
        })
    }

    handleName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handlePrice = (event) => {
        this.setState({
            price: event.target.value
        })
    }

    handleQuantity = (event) => {
        this.setState({
            quantity: event.target.value
        })
    }

    deleteProduct = (index) => {
        this.setState({
            message: "Please wait processing..."
        })
        let input = new FormData();
        input.append("id", index);
        let url = "https://www.firstenquiry.com/api/react/store/deleteproduct.php";
        axios.post(url, input).then(response => {
            this.setState({
                message: response.data.status
            })
            this.getProduct();
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="text-center text-secondary p-3">Stock Management</h3>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-1"></div>
                    <div className="col-md-3">
                        <i>Product Name</i>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.handleName} />
                    </div>
                    <div className="col-md-3">
                        <i>Product Price / Unit</i>
                        <input type="number" className="form-control" value={this.state.price} onChange={this.handlePrice} />
                    </div>
                    <div className="col-md-3">
                        <i>Product Quantity</i>
                        <input type="number" className="form-control" value={this.state.quantity} onChange={this.handleQuantity} />
                    </div>
                    <div className="col-md-1"><br />
                        <button className="btn btn-primary btn-sm" onClick={this.save}>Save</button></div>
                    <div className="col-md-1"></div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <p className="text-center text-primary">{this.state.message}</p>
                        <table className="table table-striped table-sm text-center">
                            <thead>
                                <tr>
                                    <th>P-id</th>
                                    <th>Product Name</th>
                                    <th>Product Price</th>
                                    <th>Product quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.productList.map((row, index) => {
                                        return <tr>
                                            <td>{row.pid}</td>
                                            <td>{row.name}</td>
                                            <td>Rs. {row.price}</td>
                                            <td>{row.qty}</td>
                                            <td><a href="javascript:void(0)" onClick={this.deleteProduct.bind(this, row.pid)}><i className="fa fa-trash text-danger fa-lg"></i></a></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        )
    }
}
