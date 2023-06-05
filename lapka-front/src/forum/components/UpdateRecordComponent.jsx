import React, { Component } from 'react';
import { Form, Input, Button, Container, Rating } from 'semantic-ui-react';
import RecordService from '../services/RecordService';

class UpdateRecordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      title: '',
      message: '',
      evalution: ''
    };
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeMessageHandler = this.changeMessageHandler.bind(this);
    this.changeEvalutionHandler = this.changeEvalutionHandler.bind(this);
    this.saveRecord = this.saveRecord.bind(this);
  }

  componentDidMount() {
    // Получить информацию о записи по её идентификатору и установить значения в состояние компонента
    RecordService.getRecordById(this.state.id).then(res => {
      const { title, message, evalution } = res.data;
      this.setState({ title, message, evalution });
    }).catch(error => {
      console.log(error);
    });
  }

  saveRecord(e) {
    e.preventDefault();
    let record = { message: this.state.message, evalution: this.state.evalution, title: this.state.title };
    console.log('record => ' + JSON.stringify(record));
    RecordService.updateRecord(record, this.state.id).then(res => {
      this.props.history.goBack(); // Переход на предыдущую страницу
    });
  }

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  }

  changeMessageHandler = (event) => {
    this.setState({ message: event.target.value });
  }

  changeEvalutionHandler = (event) => {
    this.setState({ evalution: event.target.value });
  }

  cancel() {
    this.props.history.push('/topics');
  }

  isFormEmpty() {
    const { title, message, evalution } = this.state;
    return !title || !message || !evalution;
  }

  render() {
    const isFormEmpty = this.isFormEmpty();
    return (
      <Container style={{ marginTop: '50px' }}>
        <Form>
          <h3 className='ui center aligned header'>Update Record</h3>
          <Form.Field>
            <label>Title:</label>
            <Input type='text' placeholder='Title' name='title' value={this.state.title} onChange={this.changeTitleHandler} />
          </Form.Field>
          <Form.Field>
            <label>Message:</label>
            <Input type='text' placeholder='Message' name='message' value={this.state.message} onChange={this.changeMessageHandler} />
          </Form.Field>
          <Form.Field>
            <label>Evalution:</label>
            <Rating
              maxRating={5}
              onRate={(event, { rating }) => this.setState({ evalution: rating })}
              rating={this.state.evalution} // Установка текущего значения рейтинга
            />
          </Form.Field>
          <Button.Group>
            <Button onClick={this.cancel.bind(this)}>Cancel</Button>
            <Button.Or />
            <Button disabled={isFormEmpty} onClick={this.saveRecord} positive>Save</Button>
          </Button.Group>
        </Form>
      </Container>
    );
  }
}

export default UpdateRecordComponent;
