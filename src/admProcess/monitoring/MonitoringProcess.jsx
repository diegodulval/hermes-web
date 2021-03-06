import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../../common/template/ContentHeader'
import Content from '../../common/template/Content'

import Tabs from '../../common/tabs/Tabs'
import TabsHeader from '../../common/tabs/TabsHeader'
import TabsContent from '../../common/tabs/TabsContent'
import TabHeader from '../../common/tabs/TabHeader'
import TabContent from '../../common/tabs/TabContent'

import Form from './MonitoringProcessForm'
import List from './MonitoringProcessList'

import { selectTab, showTabs } from '../../common/tabs/tabActions'
import { create, update, remove } from './monitoringProcessActions'

class MonitoringProcess extends Component {

    componentWillMount() {
        this.props.selectTab('tabList')
        this.props.showTabs('tabList', 'tabCreate')
    }

    render() {
        return (
            <div className=''>
                <ContentHeader title='Acompanhamento do Processo' small={this.props.match.params.id} />
                <Content >
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Listar' icon='bars' target='tabList' />
                            <TabHeader label='Incluir' icon='plus' target='tabCreate' />
                            <TabHeader label='Alterar' icon='pencil' target='tabUpdate' />
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabList'>
                                <List processoId={this.props.match.params.id}/>
                            </TabContent>
                            <TabContent id='tabCreate'>
                                <Form
                                    initialValues={{ idProcesso: this.props.match.params.id }}
                                    onSubmit={this.props.create}
                                    submitLabel='Incluir'
                                    submitClass='primary'
                                    readOnly={false}
                                    />
                            </TabContent>
                            <TabContent id='tabUpdate'>
                                <Form
                                    onSubmit={this.props.update}
                                    submitLabel='Alterar'
                                    submitClass='primary' 
                                    initialValues={{ idProcesso: this.props.match.params.id }}
                                    />
                            </TabContent>
                            <TabContent id='tabDelete'>
                                <Form
                                    onSubmit={this.props.remove}
                                    readOnly={true}
                                    submitLabel='Excluir'
                                    submitClass='danger' 
                                    initialValues={{ idProcesso: this.props.match.params.id }} />
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div >
        )
    }
}
const mapDispatchToProps = dispatch =>
    bindActionCreators({ selectTab, showTabs, create, update, remove }, dispatch)
export default connect(null, mapDispatchToProps)(MonitoringProcess)