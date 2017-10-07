import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import StepZilla from 'react-stepzilla'

import OSCForm from './OSCForm'
import ResponsavelForm from './ResponsavelForm'
import { create } from './registerActions'
import Toastr from '../common/ui/Toastr'

import PanelLeft from './PanelLeft'


import './register.css'
class Register extends Component {

    render() {
        const steps =
            [
                { name: 'OSC', component: <OSCForm /> },
                {
                    name: 'Respónsavel',
                    component:
                    <ResponsavelForm onSubmit={this.props.create}
                        submitLabel='Solicitar Acesso'
                        submitClass='primary'
                    />
                }
            ]

        return (
            <div className="container-fluid">
                <div className="main">
                    <PanelLeft link='/login' label='Entrar' />
                    <div className="col-sm-6 right-side">
                        <div className='step-progress'>
                            <StepZilla steps={steps}
                                backButtonText='Voltar' nextButtonText='Proximo'
                                backButtonCls='btn btn-primary' nextButtonCls='btn btn-primary pull-right'
                            />
                        </div>
                    </div>
                    <Toastr />
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch =>
    bindActionCreators({ create }, dispatch)
export default connect(null, mapDispatchToProps)(Register)