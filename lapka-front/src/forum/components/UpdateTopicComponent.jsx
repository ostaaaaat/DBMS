import React, { Component } from 'react'

import TopicService from '../services/TopicService';
class UpdateTopicComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: ''        
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.updateTopic = this.updateTopic.bind(this);
    }
    componentDidMount() {
        TopicService.getTopicById(this.state.id).then((res) => {
            let topic = res.data;
            this.setState({
                name: topic.name

            });
        });
    }
    updateTopic = (e) => {
        e.preventDefault();
        let topic = { name: this.state.name };
        console.log('topic => ' + JSON.stringify(topic));
        console.log('id => ' + JSON.stringify(this.state.id));
        TopicService.updateTopic(topic, this.state.id).then(res => {
            this.props.history.push('/topics');
        });
    }
    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }
    
    cancel() {
        this.props.history.push('/topics');
    }
    isFormEmpty() {
        const { name } = this.state;
        return !name;
      }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                      <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Topic</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Name: </label>
    <input placeholder="Name" name="name" className="form-control"
        value={this.state.name} onChange={this.changeNameHandler} id="name" />
        <label> {this.state.name} </label>
                                    </div>
                                  
   <button className="btn btn-success" onClick={this.updateTopic}>Save</button>
   <button className="btn btn-danger" onClick={this.cancel.bind(this)} 
                style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UpdateTopicComponent
