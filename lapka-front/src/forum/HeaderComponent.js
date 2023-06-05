import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { Menu } from 'semantic-ui-react';



class HeaderComponent extends Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    

    render(){
        return(
            <div>
                <Menu inverted color="blue">
        <Menu.Item header><a href="/topics">Forum Lapka</a></Menu.Item>
      </Menu>
            </div>
        )
    }
}
export default HeaderComponent