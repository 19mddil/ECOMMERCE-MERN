import React, { Component } from 'react';
import { sendEmailForForgottenPassword, updateUserWithNewPassword } from '../../api/apiAuth';
import Layout from '../Layout';
import { showEmailSent, showEmailNotSent, showLoading, showError } from '../../utils/messages';
import { Link } from 'react-router-dom';
class ForgotPassword extends Component {
    state = {
        code: '' + Math.floor(100000 + Math.random() * 900000),
        inputCode: '',
        email: '',
        disabledOne: false,
        disabledTwo: true,
        disabledThree: true,
        emailSuccess: false,
        emailNotSuccess: false,
        loading: false,
        error: false,
        errorMsg: '',
        newPasswordOne: '',
        newPasswordTwo: '',
        success: false

    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEmailSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true,
            disabledOne: true,
        })
        console.log(this.state.email);
        console.log(this.state.role);
        console.log(this.state.code);
        sendEmailForForgottenPassword({ code: this.state.code, email: this.state.email })
            .then(res => {
                this.setState({
                    error: false,
                    emailSuccess: true,
                    loading: false,
                    disabledOne: true,
                    disabledTwo: false,
                    disabledThree: true,

                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: true,
                    errorMsg: "User does not exist",
                    emailNotSuccess: false,
                    loading: false,
                    disabledOne: false,
                    disableTwo: true,
                    disabledThree: true,
                })
            })
    }

    handleCodeSubmit = e => {
        e.preventDefault();
        this.setState({
            error: false,
            loading: true,
            disabledTwo: true,
        })
        console.log(this.state.intputCode);
        if (this.state.inputCode === this.state.code) {
            this.setState({
                emailSuccess: false,
                loading: false,
                disabledThree: false
            })
        } else {
            this.setState({
                emailSuccess: false,
                loading: false,
                disabledTwo: false,
                error: true,
                errorMsg: "Pin did not match"
            })
        }
    }

    handleNewPasswordSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true,
            disabledThree: true,
        })
        if (this.state.newPasswordOne !== this.state.newPasswordTwo) {
            this.setState({
                loading: false,
                disabledThree: false,
                error: true,
                errorMsg: 'password did not match'
            })
        }
        else {
            updateUserWithNewPassword({ email: this.state.email, password: this.state.newPasswordOne })
                .then(res => {
                    console.log("horah");
                    this.setState({
                        error: false,
                        success: true,
                        disabledThree: true,
                        loading: false
                    })
                })
                .catch(err => {
                    this.setState({
                        success: false,
                        disabledThree: false,
                        error: true,
                        errorMsg: err.message
                    })
                })
        }
    }
    showSuccess = () => {
        if (this.state.success) return (
            <div className='alert alert-primary'>
                New Password has been set. Please <Link to='/login'>Login</Link>
            </div>
        )
    }
    render() {
        return (
            <Layout title="Forgot Password" className="container col-md-8 offset-md-2">
                {showEmailSent(this.state.emailSuccess, "An Email has been sent, Check your Latest Email from freelancebangla.com")}
                {showEmailNotSent(this.state.emailNotSuccess, "Email couldn't be sent,Enter Your Email Address Again.")}
                {showLoading(this.state.loading)}
                {showError(this.state.error, this.state.errorMsg)}
                {this.showSuccess()}
                <h3>Enter your Registered Email</h3>
                <hr />
                <form onSubmit={this.handleEmailSubmit} >
                    <div className="form-group">
                        <label className='text-muted'>Enter your email:</label>
                        <input name='email' type='email' className='form-control' value={this.state.email} required onChange={this.handleChange} disabled={this.state.disabledOne} />
                    </div>
                    <button type="submit" className='btn btn-outline-primary' disabled={this.state.disabledOne}>Send Me Code</button>
                </form>
                <hr />

                <h3>Input the 6 digit Code sent to your Email</h3>
                <hr />
                <form onSubmit={this.handleCodeSubmit} >
                    <div className="form-group">
                        <label className='text-muted'>Enter Six Digit Code Sent to your {this.state.email}:</label>
                        <input name='inputCode' type='number' className='form-control' value={this.state.inputCode} required onChange={this.handleChange} disabled={this.state.disabledTwo} />
                    </div>
                    <button type="submit" className='btn btn-outline-primary' disabled={this.state.disabledTwo}>Lets Change my password</button>
                </form>
                <hr />

                <h3>Set New Password</h3>
                <hr />
                <form onSubmit={this.handleNewPasswordSubmit}>

                    <div className="form-group">
                        <label className="text-muted">Set New Password:</label>
                        <input type="password" name="newPasswordOne" className="form-control"
                            value={this.state.newPasswordOne} required onChange={this.handleChange} disabled={this.state.disabledThree} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Type New Password:</label>
                        <input type="password" name="newPasswordTwo" className="form-control"
                            value={this.state.newPasswordTwo} required onChange={this.handleChange} disabled={this.state.disabledThree} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={this.state.disabledThree}>Create Account</button>
                </form>
                <hr />
            </Layout>
        )
    }
}

export default ForgotPassword;