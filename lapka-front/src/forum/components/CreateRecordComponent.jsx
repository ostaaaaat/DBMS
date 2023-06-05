import React, { Component } from "react";
import { Button, Container, Form, Input, Rating } from "semantic-ui-react";
import RecordService from "../services/RecordService";

class CreateRecordComponent extends Component {
  state = {
    topicId: this.props.match.params.id,
    title: "",
    message: "",
    evalution: ""
  };

  // updates state with the value of the input
  changeHandler = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  // saves record & redirects to topics page
  saveRecord = (e) => {
    e.preventDefault();
    let record = {
      topicId: this.props.match.params.id,
      message: this.state.message,
      evalution: this.state.evalution,
      title: this.state.title
    };
    console.log("record => " + JSON.stringify(record));
    RecordService.createRecord(record)
      .then((res) => {
        console.log("Record created successfully.");
        this.props.onRecordSave(); // Call the parent component function to close the modal
      })
      .catch((error) => {
        console.error("Error creating record:", error);
      });
  };

  // cancels adding a new record
  cancel = () => {
    this.props.onRecordSave(); // Call the parent component function to close the modal
  };

  isFormEmpty() {
    const { title, message, evalution } = this.state;
    return !title || !message || !evalution;
  }

  render() {
    const { title, message, evalution } = this.state;
    const isFormEmpty = this.isFormEmpty();
    return (
      <Container style={{ marginTop: "50px" }}>
        <Form>
          <h3 className="ui center aligned header">Add Record</h3>
          <Form.Field>
            <label>Title:</label>
            <Input
              placeholder="Title"
              name="title"
              value={title}
              onChange={this.changeHandler}
            />
          </Form.Field>
          <Form.Field>
            <label>Message:</label>
            <Input
              placeholder="Message"
              name="message"
              value={message}
              onChange={this.changeHandler}
            />
          </Form.Field>
          <Form.Field>
            <label>Evalution:</label>
            <Rating
              maxRating={5}
              rating={parseInt(evalution)}
              onRate={(event, { rating }) =>
                this.setState({ evalution: rating })
              }
            />
          </Form.Field>
          <Button.Group>
            <Button onClick={this.cancel}>Cancel</Button>
            <Button.Or />
            <Button
              disabled={isFormEmpty}
              onClick={this.saveRecord}
              positive
            >
              Save
            </Button>
          </Button.Group>
        </Form>
      </Container>
    );
  }
}

export default CreateRecordComponent;
