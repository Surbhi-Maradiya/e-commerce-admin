import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            msg: ''
        }
    }

    loginCheck = () => {

        if ((this.state.email != "") && (this.state.pass != "")) {
            this.setState({
                msg: "Please wait processing..."
            })
            var url = "https://www.firstenquiry.com/api/react/store/auth.php";
            let mydata = new FormData();
            mydata.append("email", this.state.email);
            mydata.append("pass", this.state.pass);
            axios.post(url, mydata).then(response => {
                if (response.data.id == "") {
                    this.setState({
                        msg: "Invalid or not exists..."
                    })
                } else {
                    sessionStorage.setItem("id", response.data.id);
                    sessionStorage.setItem("username", response.data.name);
                    window.location.reload();
                }
            })
            //        store1@gmail.com / 123

        } else {
            this.setState({
                msg: "Invalid input..."
            })
        }
    }

    handelEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handelPass = (event) => {
        this.setState({
            pass: event.target.value
        })
    }

    render() {
        return <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"><br /><br />
                    <div className="card">
                        <div className="card-header bg-secondary text-white">Login</div>
                        <div className="card-body">
                            <p className="text-danger text-center">{this.state.msg}</p>
                            <div className="form-group">
                                <label>e-Mail</label>
                                <input type="text" class="form-control" onChange={this.handelEmail} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" onChange={this.handelPass} />
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-primary" onClick={this.loginCheck}>Login</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    }
}

export default Login;