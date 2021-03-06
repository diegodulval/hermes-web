import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Api from '../main/api'

import { getList, showUpdate, showDelete, update } from './oscActions'

import FieldSearch from '../common/form/FieldSearch'
import ButtonIcon from '../common/ui/button/ButtonIcon'
import Grid from '../common/layout/Grid'


class OscList extends Component {

    componentWillMount() {
        this.props.getList()
    }

    readById(osc) {
        Api.getOsc(`/${osc.id}`)
            .then(resp => {
                this.props.showUpdate(resp.data)
            })
    }

    delete(osc) {
        Api.getOsc(`/${osc.id}`)
            .then(resp => {
                this.props.showDelete(resp.data)
            })
    }

    renderRows() {
        const list = this.props.list || []
        return list.map((osc, index) => (
            <tr key={index}>
                <td> {osc.name} </td>
                <td> {osc.cnpj} </td>
                <td> {osc.phone} </td>
                <td>
                    {(osc.approvalADM === true && osc.approvalPS === true) &&
                        <span className='label label-success'>Ativa</span>
                    }
                    {(osc.approvalADM === false && osc.approvalPS === true) &&
                        <span className='label label-primary'>Aguardando aprovação do Administrador</span>
                    }
                    {(osc.approvalPS === false && osc.approvalADM === false) &&
                        <span className='label label-danger'>Aguardando avaliação</span>
                    }
                    {(osc.approvalPS === false && osc.approvalADM === true) &&
                        <span className='label label-warning'>Aguardando avaliação do gestor</span>
                    }
                </td>
                <td>
                    {this.props.user.type === 'OSC' &&
                        <ButtonIcon cssStyle='btn btn-warning' onClick={() => this.readById(osc)} icon='pencil' tooltip='Alterar' />
                    }
                    {this.props.user.type !== 'OSC' &&
                        <ButtonIcon cssStyle='btn btn-primary' onClick={() => this.readById(osc)} icon='address-book-o' tooltip='Detalhes' />
                    }
                    {(osc.approvalADM === false && this.props.user.type === 'ADMINISTRATOR') &&
                        <span>
                            <ButtonIcon tooltip='Excluir' cssStyle='btn btn-danger' onClick={() => this.props.showDelete(osc)} icon='trash-o' />
                            <ButtonIcon tooltip='Aprovar' cssStyle='success' onClick={() => {
                                osc.approvalADM = true
                                this.props.update(osc)
                            }} icon='check' />
                        </span>
                    }
                    {(osc.approvalPS === false && this.props.user.type === 'PUBLIC-SERVER') &&
                        <span>
                            <ButtonIcon tooltip='Excluir' cssStyle='btn btn-danger' onClick={() => this.delete(osc)} icon='trash-o' />
                            <ButtonIcon tooltip='Aprovar' cssStyle='success' onClick={() => {
                                osc.approvalPS = true
                                this.props.update(osc)
                            }} icon='check' />
                        </span>
                    }
                </td>
            </tr>
        ))
    }

    render() {
        const { qtd } = this.props
        return (
            <div>
                <FieldSearch handleClick={this.props.getList} name='name_search' icon='search' type='text' placeholder='Buscar por nome' />

                {(qtd === 0 && !this.props.isLoading) &&
                    <Grid cols='12 12'>
                        <div className="alert alert-info alert-dismissible" style={{ margin: "0 0 0 0" }}>
                            <h4><i className="icon fa fa-info"></i> Nenhuma OSC cadastrado!</h4>
                        </div>
                    </Grid>
                }
                {(qtd > 0 && !this.props.isLoading) &&
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th> Nome </th>
                                <th> CNPJ </th>
                                <th> Telefone </th>
                                <th> Situação </th>
                                <th className='table-action'> Ações </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                }
                {this.props.isLoading &&
                    <div className="overlay">
                        <i className="fa fa-refresh fa-spin"></i>
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    list: state.osc.list,
    qtd: state.osc.total,
    isLoading: state.osc.isFetching,
    user: state.auth.user
})
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showUpdate, showDelete, update }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(OscList)