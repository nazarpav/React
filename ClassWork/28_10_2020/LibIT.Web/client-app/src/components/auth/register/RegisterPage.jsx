import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const validEmailRegex = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
const validPhonelRegex = RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
/*(123) 456-7890
    (123)456-7890
    123-456-7890
    123.456.7890
    1234567890
    +31636363634
    075-63546725*/
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            password: null,
            confirmPassword: null,
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: ''
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'firstName':
                errors.firstName =
                    value.length < 5
                        ? 'Name must be 5 characters long!'
                        : '';
                break;
            case 'lastName':
                errors.lastName =
                    value.length < 5
                        ? 'Surname must be 5 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'phone':
                errors.phone =
                    validPhonelRegex.test(value)
                        ? ''
                        : 'Phone is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'invalid password'
                        : '';
                break;
            case 'confirmPassword':
                errors.confirmPassword =
                    value.length < 8 && this.state.password == this.state.confirmPassword
                        ? 'invalid password'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            console.info('Valid Form')
        } else {
            console.error('Invalid Form')
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <br />
                <div className="card" style={{ marginBottom: "50px" }}>
                    <article className="card-body mx-auto" style={{ maxWidth: 600 + 'px' }}>
                        <h4 className="card-title mt-3 text-center">Create Account</h4>
                        <p>
                            <Link to="" className="btn btn-block btn-twitter"> <i className="fab fa-twitter"></i>    Login via Twitter</Link>
                            <Link to="" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"></i>    Login via facebook</Link>
                        </p>
                        <p className="divider-text">
                            <span className="bg-light">OR</span>
                        </p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                </div>
                                <input className="form-control" type='text' name='firstName' onChange={this.handleChange} />
                                <p className="text-danger">
                                    {errors.firstName}
                                </p>
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                </div>
                                <input className="form-control" type='text' name='lastName' onChange={this.handleChange} />
                                <p className="text-danger">
                                    {errors.lastName}
                                </p>
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                </div>
                                <input className="form-control" type='text' name='email' onChange={this.handleChange} noValidate />
                                <p className="text-danger">
                                    {errors.email}
                                </p>
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                                </div>
                                <input className="form-control" type='text' name='phone' onChange={this.handleChange} noValidate />
                                <p className="text-danger">
                                    {errors.phone}
                                </p>
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input className="form-control" type='text' name='password' onChange={this.handleChange} noValidate />
                                <p className="text-danger">
                                    {errors.password}
                                </p>
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                </div>
                                <input className="form-control" type='text' name='confirmPassword' onChange={this.handleChange} noValidate />
                                <p className="text-danger">
                                    {errors.confirmPassword}
                                </p>
                            </div>
                            <div className='info'>
                                <small>Password must be eight characters in length.</small>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Create Account  </button>
                            </div>
                            <p className="text-center">Have an account? <Link to="/login">Log In</Link> </p>
                        </form>
                    </article>
                </div>
            </div>
        );
    }
}

export default RegisterPage;