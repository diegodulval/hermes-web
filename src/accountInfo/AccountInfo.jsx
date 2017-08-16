import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../common/template/ContentHeader'
import Content from '../common/template/Content'
import Tabs from '../common/tabs/Tabs'
import TabsHeader from '../common/tabs/TabsHeader'
import TabsContent from '../common/tabs/TabsContent'
import TabHeader from '../common/tabs/TabHeader'
import TabContent from '../common/tabs/TabContent'
import Form from './AccountInfoForm'

import { selectTab, showTabs } from '../common/tabs/tabActions'
import { create, update } from './accountInfoActions'

class AccountInfo extends Component {
    componentWillMount() {
        this.props.selectTab('tabList')
        this.props.showTabs('tabList')
    }

    render() {
        return (
            <div className=''>
                <ContentHeader title='Informações da Conta' small='Versão 1.0' />
                <Content >
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Meus dados' icon='bars' target='tabList' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabList'>
                                <Form
                                    onSubmit={this.props.update}
                                    submitLabel='Atualizar'
                                    submitClass='primary' />
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => 
    bindActionCreators({ selectTab, showTabs, create, update }, dispatch)
export default connect(null, mapDispatchToProps)(AccountInfo)
