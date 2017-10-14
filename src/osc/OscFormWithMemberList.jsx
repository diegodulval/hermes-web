import React, { Component } from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-modal'

import { init } from './oscActions'
import { clean } from './member/memberActions'

import { openModal, closeModal } from '../common/ui/modal/modalActions'

import BoxBody from '../common/template/box/BoxBody'
import BoxFooter from '../common/template/box/BoxFooter'
import ButtonIcon from '../common/ui/button/ButtonIcon'

import OscForm from './OscForm'
import MemberList from './member/MemberList'
import MemberForm from './member/MemberForm'

import { validate } from '../validate/oscFormValidate'

class OscFormWithMemberList extends Component {

    render() {
        const { handleSubmit, readOnly, openModal, memberList, clean, closeModal, modal } = this.props
        const styles = {
            modal: { overlay: { zIndex: 1040 } },
            modalBody: {
                maxHeight: "calc(100vh - 80px)",
                overflowY: "auto"
            }
        }
        return (
            <form onSubmit={handleSubmit}>

                <OscForm readOnly={readOnly} />

                <BoxBody>
                    <fieldset>
                        <legend> Membros
                            {this.props.user.type === 'OSC' &&
                                <ButtonIcon cssStyle='success' tooltip='Adicionar Membro' type="button"
                                    onClick={() => {
                                        clean()
                                        openModal()
                                    }} icon='plus' />
                            }
                        </legend>
                        <MemberList list={memberList} handleOpen={this.props.openModal} />
                    </fieldset>
                </BoxBody>

                <Modal
                    contentLabel="Member Modal"
                    style={styles.modal}
                    className="modal-dialog"
                    closeTimeoutMS={150}
                    isOpen={modal.visible}
                    onRequestClose={closeModal}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                    <span aria-hidden="true">×</span>
                                </button>
                                <h4 className="modal-title">Membro da Diretoria</h4>
                            </div>
                            <div className="modal-body" style={styles.modalBody}>

                                <MemberForm onSubmit={handleSubmit}
                                    submitLabel='Incluir'
                                    submitClass='primary'
                                    readOnly={readOnly}
                                />

                            </div>
                        </div>
                    </div>
                </Modal >

                <BoxFooter >
                    {this.props.user.type === 'OSC' &&
                        <button type='submit' className={`btn btn-${this.props.submitClass}`}> {this.props.submitLabel} </button>
                    }
                    <button type='button' className='btn btn-default' onClick={this.props.init}> {this.props.user.type !== 'OSC' ? 'Voltar' : 'Cancelar'} </button>
                </BoxFooter>
            </form>
        )
    }
}

OscFormWithMemberList = reduxForm(
    {
        form: 'oscForm',
        validate,
        destroyOnUnmount: false,
        initialValues: {
            approvalADM: true,
            approvalPS: true,
            type: "OSC"
        }
    })(OscFormWithMemberList)

const selector = formValueSelector('oscForm')
const mapStateToProps = state => (
    {
        visible: state.modal.visible,
        user: state.auth.user,
        modal: state.modal,
        memberList: selector(state, 'boardMemberList'),
    })
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        init,
        clean,
        openModal,
        closeModal
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OscFormWithMemberList)