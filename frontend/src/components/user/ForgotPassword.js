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
        ActivateOne: true,
        ActivateTwo: false,
        ActivateThree: false,
        emailSuccess: false,
        emailNotSuccess: false,
        loading: false,
        error: false,
        errorMsg: '',
        newPasswordOne: '',
        newPasswordTwo: '',
        success: false,


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
            ActivateOne: true,
            ActivateTwo: false,
            ActivateThree: false,

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
                    ActivateOne: false,
                    ActivateTwo: true,
                    ActivateThree: false,
                })
            })
            .catch(err => {
                this.setState({
                    error: true,
                    errorMsg: err.response.data.msg,
                    emailNotSuccess: false,
                    loading: false,
                    disabledOne: false,
                    disableTwo: true,
                    disabledThree: true,
                    ActivateOne: true,
                    ActivateTwo: false,
                    ActivateThree: false,
                })
            })
    }

    handleCodeSubmit = e => {
        e.preventDefault();
        this.setState({
            error: false,
            loading: true,
            disabledTwo: true,
            ActivateOne: false,
            ActivateTwo: true,
            ActivateThree: false,
        })
        console.log(this.state.inputCode);
        if (this.state.inputCode === this.state.code) {
            this.setState({
                emailSuccess: false,
                loading: false,
                disabledThree: false,
                ActivateOne: false,
                ActivateTwo: false,
                ActivateThree: true,
            })
        } else {
            this.setState({
                emailSuccess: false,
                loading: false,
                disabledTwo: false,
                error: true,
                errorMsg: "Pin did not match",
                ActivateOne: false,
                ActivateTwo: true,
                ActivateThree: false,
            })
        }
    }

    handleNewPasswordSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true,
            disabledThree: true,
            ActivateOne: false,
            ActivateTwo: false,
            ActivateThree: true,
        })
        if (this.state.newPasswordOne !== this.state.newPasswordTwo) {
            this.setState({
                loading: false,
                disabledThree: false,
                error: true,
                errorMsg: 'password did not match',
                ActivateOne: false,
                ActivateTwo: false,
                ActivateThree: true,
            })
        }
        else {
            updateUserWithNewPassword({ email: this.state.email, password: this.state.newPasswordOne })
                .then(res => {
                    //console.log("horah");
                    this.setState({
                        error: false,
                        success: true,
                        disabledThree: true,
                        loading: false,
                        ActivateOne: false,
                        ActivateTwo: false,
                        ActivateThree: false,
                    })
                })
                .catch(err => {
                    this.setState({
                        success: false,
                        disabledThree: false,
                        error: true,
                        errorMsg: err.message,
                        ActivateOne: false,
                        ActivateTwo: false,
                        ActivateThree: true,
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

                <h3 style={{ color: this.state.ActivateOne ? 'green' : 'grey' }}>enter your registered email</h3>
                <hr />
                <form onSubmit={this.handleEmailSubmit} >
                    <div className="form-group">
                        <label className='text-muted'>Enter your email:</label>
                        <input name='email' type='email' className='form-control' value={this.state.email} required onChange={this.handleChange} disabled={this.state.disabledOne} />
                    </div>
                    <button type="submit" className='btn btn-outline-primary' disabled={this.state.disabledOne}>send me code</button>
                </form>
                <hr />

                <h3 style={{ color: this.state.ActivateTwo ? 'green' : 'grey' }}>input the 6 digit code sent to your email</h3>
                <hr />
                <form onSubmit={this.handleCodeSubmit} >
                    <div className="form-group">
                        <label className='text-muted'>enter six digit code sent to your {this.state.email}:</label>
                        <input name='inputCode' type='number' className='form-control' value={this.state.inputCode} required onChange={this.handleChange} disabled={this.state.disabledTwo} />
                    </div>
                    <button type="submit" className='btn btn-outline-primary' disabled={this.state.disabledTwo}>lets change my password</button>
                </form>
                <hr />

                <h3 style={{ color: this.state.ActivateThree ? 'green' : 'grey' }}>set new password</h3>
                <hr />
                <form onSubmit={this.handleNewPasswordSubmit}>

                    <div className="form-group">
                        <label className="text-muted">set new password:</label>
                        <input type="password" name="newPasswordOne" className="form-control"
                            value={this.state.newPasswordOne} required onChange={this.handleChange} disabled={this.state.disabledThree} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">type new password:</label>
                        <input type="password" name="newPasswordTwo" className="form-control"
                            value={this.state.newPasswordTwo} required onChange={this.handleChange} disabled={this.state.disabledThree} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={this.state.disabledThree}>Change Password</button>
                </form>
                {this.showSuccess()}
                <hr />
            </Layout>
        )
    }
}

export default ForgotPassword;