import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { mapActiveUrlToMenu } from '../../common/template/menu/menuActiveClass'
import AccountInfo from '../../accountInfo/AccountInfo'
import AdmProcess from '../../admProcess/AdmProcess'
import Documents from '../../admProcess/documents/Documents'
import Dashboard from '../../dashboard/Dashboard'
import Osc from '../../osc/Osc'

export default props => (

    <Switch>
        <Route exact path='/' component={Dashboard} onUpdater={mapActiveUrlToMenu()} />
        <Route exact path='/myAccount' component={AccountInfo} />

        {props.approval &&
           <Switch>
                <Route exact path='/osc' component={Osc} />
                <Route exact path='/admProcess' component={AdmProcess} />
                <Route exact path='/documents' component={Documents} />
            </Switch>
        }
        <Route path='*' component={Dashboard} />
    </Switch>
)