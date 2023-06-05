import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { List } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react';



class FooterComponent extends Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    

    render(){
        return(
            <div style={{ width: '500px', margin: '0 auto' }}><br></br>
                <List>
    <List.Item icon='users' content='lapka' />
    <List.Item icon='marker' content='Volgograd, VLG' />
    <List.Item
      icon='mail'
      content={<a href='mailto:support@lapka.com'>support@lapka.com</a>}
    />
    <List.Item
      icon='linkify'
      content={<a href='http://www.lapka.com'>lapka.com</a>}
    />
  </List>
            </div>
        )
    }
}
export default FooterComponent