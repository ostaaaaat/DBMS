
import React, { Component } from 'react';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import TopicService from '../services/TopicService';

class UpdateTopicComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: ''
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.saveOrUpdateTopic = this.saveOrUpdateTopic.bind(this);
  }

  componentDidMount() {
    if (this.state.id === '_add') {
      return;
    } else {
      TopicService.getTopicById(this.state.id).then(res => {
        let topic = res.data;
        this.setState({
          name: topic.name
        });
      });
    }
  }

  saveOrUpdateTopic(e) {
    e.preventDefault();
    let topic = { name: this.state.name};
    console.log('topic => ' + JSON.stringify(topic));
    if (this.state.id === '_add') {
      TopicService.createTopic(topic).then(res => {
        this.props.history.push('/topics');
      });
    } else {
      TopicService.updateTopic(topic, this.state.id).then(res => {
        this.props.history.push('/topics');
      });
    }
  }

  changeNameHandler(event) {
    this.setState({ name: event.target.value });
  }

  cancel() {
    this.props.history.push('/topics');
  }

  getTitle() {
    if (this.state.id === '_add') {
      return <h3 className='ui center aligned header'>Add Topic</h3>;
    } else {
      return <h3 className='ui center aligned header'>Update Topic</h3>;
    }
  }
  isFormEmpty() {
    const { name } = this.state;
    return !name;
  }

  render() {
    const isFormEmpty = this.isFormEmpty();

    return (
      <Container style={{ marginTop: '50px' }}>
        <Form>
          {this.getTitle()}
          <Form.Field>
            <label>Name:</label>
            <Input type='text' placeholder='Name' name='name' value={this.state.name} onChange={this.changeNameHandler}/>
          </Form.Field>
          <Button.Group>
            <Button onClick={this.cancel.bind(this)}>Cancel</Button>
            <Button.Or />
            <Button disabled={isFormEmpty} onClick={this.saveOrUpdateTopic} positive>Save</Button>
          </Button.Group>
        </Form>
      </Container>
    );
  }
}

export default UpdateTopicComponent;