import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ContentHeader from '../common/template/ContentHeader'
import Content from '../common/template/Content'
import Form from './RegisterForm'
import { create } from './registerActions'
import Toastr from '../common/ui/Toastr'


import './register.css'
class Register extends Component {

    render() {
        return (
            <div className="wrapper">
                <div className="col-sm-6 left-side">
                    <svg width="150" className="logo-menu" height="150" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350">
                        <path className="logo-h" d="M191.55,152.37v28.7H158.81V152.84s0-25.7-32.74-25.7V232.82s0,26.18,32.74,26.18V213.81h32.74v44.8c31.26,0,31.26-25.61,31.26-25.61V126.66C191.55,126.66,191.55,152.37,191.55,152.37Z" />
                        <path className="wing-left" d="M57.52,113.94c-1.13,4.5-12.07,35.35,22.33,54.75C73,170.11,62.39,166.9,60.25,166c0.33,2.12,4.17,33.32,39.62,37.48a24.5,24.5,0,0,1-18.5,3.8c3.23,5.38,12.48,20.08,34.91,22.67v-86.8C84.33,137,63.72,119,57.52,113.94Z" />
                        <path className="wing-right" d="M291.73,113.94c1.13,4.5,12.07,35.35-22.33,54.75,6.84,1.43,17.47-1.79,19.61-2.68-0.33,2.12-4.17,33.32-39.62,37.48a24.5,24.5,0,0,0,18.5,3.8c-3.23,5.38-12.48,20.08-34.91,22.67v-86.8C264.93,137,285.54,119,291.73,113.94Z" />
                    </svg>
                    <h1>Hermes<br /></h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tristique justo eget nibh convallis pharetra.</p>
                    <br />
                    <Link to='/login' className="fb">Entrar</Link>
                    <a className="tw" href="/" target="_blank">Dados Públicos</a>
                </div>

                <div className="col-sm-6 right-side">
                    <Form onSubmit={this.props.create}
                        submitLabel='Solicitar Acesso'
                        submitClass='deep-primary' />
                </div>
                <Toastr />
            </div>
        )
    }
}
const mapDispatchToProps = dispatch =>
    bindActionCreators({ create }, dispatch)
export default connect(null, mapDispatchToProps)(Register)