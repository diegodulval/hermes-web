import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'

import Api from '../../main/api'
import { showTabs, selectTab } from '../../common/tabs/tabActions'
import { closeModal } from '../../common/ui/modal/modalActions'

const INITIAL_VALUE = {}

export const getList = (idOsc, field, value) => {
    let search = idOsc ? `?osc=${idOsc}` : ''

    console.log(idOsc)

    const request = Api.getMember(search, idOsc)
    return [
        requestMember(),
        {
            type: "MEMBER_RECEIVE",
            payload: request
        }
    ]
}

export const requestMember = member => ({
    type: 'MEMBER_REQUEST',
    payload: member
})

export const create = (values) => {
    return submit(values, 'postMember')
}

export const update = (values, oscId) => {
    return submit(values, 'putMember', oscId)
}

export const remove = (values) => {
    return submit(values, 'deleteMember')
}

const submit = (values, method, oscId) => {
    return dispatch => {
        dispatch(requestMember(values))
        Api[method](values, oscId)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso!')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export const showUpdate = (member) => {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('memberForm', member)
    ]
}

export const showDelete = (member) => {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('memberForm', member)
    ]
}

export const init = (idOsc) => {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(idOsc, null, null),
        initialize('memberForm', INITIAL_VALUE)
    ]
}

export const clean = () => {
    return [
        initialize('memberForm', INITIAL_VALUE)
    ]
}

export const close = () => {
    return [
        closeModal()
    ]
}
