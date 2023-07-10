import React, { Component } from 'react';
import Layout from '../Layout';
import { showError, showLoading, showEmailSent, showEmailNotSent, showSuccess } from '../../utils/messages';
import { authenticate, userInfo } from '../../utils/auth';
import { sendEmail, verifyUser } from '../../api/apiAuth';
import { Navigate } from 'react-router';

class EmailVerify extends Component {
    state = {
        code: '' + Math.floor(100000 + Math.random() * 900000),
        inputCode: '',
        error: false,
        loading: true,
        disabled: true,
        redirect: false,
        success: false,
        emailSuccess: false,
        emailNotSuccess: false,
    }

    componentDidMount = () => {
        console.log(this.state.code);
        console.log(this.state.loading);
        const { token, email } = userInfo();
        console.log(token);
        sendEmail(token, { code: this.state.code, email: email })
            .then(res => {
                console.log(res.data);
                this.setState({
                    emailSuccess: true,
                    loading: false,
                    disabled: false,
                })
            })
            .catch(err => {
                this.setState({
                    emailNotSuccess: true,
                    disabled: true,
                    loading: false
                })
            });

    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            error: false,
            loading: true,
            disabled: true,
        });
        //check whether the email code and the input code is the same
        if (this.state.inputCode === this.state.code) {
            const { token, email, role } = userInfo();
            verifyUser(token, { email: email, role: role })
                .then(res => {
                    authenticate(res.data.token, () => {
                        this.setState({
                            error: false,
                            loading: false,
                            success: true,
                            disabled: true,
                        })
                    })
                })
                .catch(err => {
                    this.setState({
                        error: true,
                        loading: false,
                        success: false,
                        disabled: false,
                    })
                });

        } else {
            this.setState({
                error: true,
                loading: false,
                success: false,
                disabled: false
            })
        }
        //the go back to back end and save varified true for this user
        //them comeback with a new token in response and delete the old one and set it again.
    }
    redirectUserEmailNotSuccess = () => {
        if (this.state.emailNotSuccess) {
            return (<Navigate to='/' />)
        }
    }
    render() {
        return (
            <Layout title="Email Verification" className="container col-md-8 offset-md-2">

                {showEmailNotSent(this.state.emailNotSuccess, "Email couldn't be sent")}
                {this.redirectUserEmailNotSuccess()}
                {showEmailSent(this.state.emailSuccess, "An Email has been sent, Check your Latest Email from freelancebangla.com")}
                {showLoading(this.state.loading)}
                {showError(this.state.error, "Pin did not match, Try again")}
                {showSuccess(this.state.success, "Email Verified,Redirecting you to Homepage")}
                <h3>Verify Here,</h3>
                <hr />
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label className='text-muted'>Enter Six Digit Code:</label>
                        <input name='inputCode' type='number' className='form-control' value={this.state.inputCode} required onChange={this.handleChange} disabled={this.state.disabled} />
                    </div>
                    <button type="submit" className='btn btn-outline-primary' disabled={this.state.disabled}>Verify</button>
                </form>
                <hr />
            </Layout>
        );
    }
}

export default EmailVerify;