import React, { Component } from "react";
import RecordService from "../services/RecordService";
import { Card, Grid, Icon, Rating, Button, Modal } from "semantic-ui-react";
import CreateRecordComponent from "./CreateRecordComponent";

class ListRecordComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicId: this.props.match.params.id,
      records: [],
      showModal: false
    };

    this.deleteRecord = this.deleteRecord.bind(this);
  }

  addRecord = () => {
    this.setState({ showModal: true });
  };

  editRecord(id) {
    this.props.history.push(`/add-record/${id}`);
  }

  deleteRecord(id) {
    RecordService.deleteRecord(id).then((res) => {
      this.setState({
        records: this.state.records.filter((record) => record.id !== id)
      });
    });
  }

  componentDidMount() {
    RecordService.getRecordsByTopic(this.state.topicId).then((res) => {
      this.setState({ records: res.data });
    });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  refreshRecords = () => {
    RecordService.getRecordsByTopic(this.state.topicId).then((res) => {
      this.setState({ records: res.data });
    });
  };

  render() {
    return (
      <div className="container1">
        <br />
        <h2 className="ui header">Records</h2>
        <Grid columns={1} divided fluid stretched>
          {this.state.records.map((record) => (
            <Grid.Column
              key={record.id}
              stretched
              style={{
                width: "100%",
                display: "inline-block",
                margin: "0"
              }}
            >
              <Card fluid>
                <Card.Content>
                  <Card.Description>
                    Тема: {record.name_topic}
                  </Card.Description>
                  <Card.Meta>
                    <span>{record.date}</span>
                  </Card.Meta>
                  <br></br>
                  <Card.Header>{record.title}</Card.Header>
                  <br></br>

                  <Card.Description>
                    <p>{record.message}</p>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  Оценка:
                  <Rating
                    icon="star"
                    rating={record.evalution}
                    maxRating={5}
                  />
                </Card.Content>
                <Card.Content extra>
                  <button
                    onClick={() => this.editRecord(record.id)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "100px" }}
                    onClick={() => this.deleteRecord(record.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
        <Modal
          open={this.state.showModal}
          onClose={this.closeModal}
          size="tiny"
        >
          <Modal.Content>
            <CreateRecordComponent
              onRecordSave={() => {
                this.closeModal();
                this.refreshRecords();
              }}
              match={this.props.match}
              history={this.props.history}
            />
          </Modal.Content>
        </Modal>
        <br></br>
        <Button
          onClick={this.addRecord}
          icon="plus"
          circular
          color="blue"
          className="add-button"
        />
      </div>
    );
  }
}

export default ListRecordComponent;
