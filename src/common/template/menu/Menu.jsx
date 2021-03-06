import React, { Component } from 'react'
import { connect } from 'react-redux'

import MenuItem from './MenuItem'


class Menu extends Component {

    render() {
        const { user } = this.props.auth
        return (
            < ul className='sidebar-menu tree' data-widget="tree" >
                <li className='header'> Menu de navegação </li>
                <MenuItem path='/' label='Painel de Informações' icon='dashboard' />
                {(user.type === 'ADMINISTRATOR' && user.approvalADM === true && user.approvalPS === true) &&
                    <MenuItem path='/publicAdm' label='Administração Pública' icon='building' />
                }
                <MenuItem path='/myAccount' label='Minha Conta' icon='id-card-o' />
                {user.type === 'OSC' &&
                    <MenuItem path='/members' label='Membros' icon='users' />
                }
                {user.type !== 'OSC' && user.approvalADM === true && user.approvalPS === true &&
                    <MenuItem path='/osc' label='OSCs' icon='university' />
                }
                {user.type === 'ADMINISTRATOR' &&
                    <MenuItem path='/users' label='Gestão de Usuários' icon='users' />
                }
                {(user.type !== 'ADMINISTRATOR' && user.approvalADM === true && user.approvalPS === true) &&
                    <MenuItem path='/admProcess' label='Processo Administrativo' icon='bullhorn' />
                }
            </ul >
        )
    }
}


const mapStateToProps = state => ({ auth: state.auth })
export default connect(mapStateToProps, null)(Menu)


