import React, { Component } from "react"
import { Table, Rating} from "semantic-ui-react"
import TopicService from "../services/TopicService"



class ListTopicComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      topics: []
    }
    this.deleteTopic = this.deleteTopic.bind(this)
    this.addTopic = this.addTopic.bind(this)
    this.editTopic = this.editTopic.bind(this)
    this.addRecord = this.addRecord.bind(this)
  }

  editTopic(id) {
    this.props.history.push(`/add-topic/${id}`)
  }

  addRecord(id) {
    this.props.history.push(`/add-record/${id}`)
  }

  addTopic() {
    this.props.history.push('/add-topic/_add')
  }

  addRecord(id) {
    this.props.history.push(`/topics${id}/add_record`)
  }

  viewRecords(id) {
    this.props.history.push(`/topics${id}`)
  }

  deleteTopic(id) {
    TopicService.deleteTopic(id).then(res => {
      this.setState({ topics: this.state.topics.
      filter(topic => topic.id !== id) });
    });
  }

  componentDidMount() {
    TopicService.getTopics().then((res) => {
      this.setState({topics:res.data})
    })
  }

  renderTableData() {
    return this.state.topics.map(topic => {
      const { id, name, count_messages, avg_evalution } = topic
      return (
        <Table.Row key={id}>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{count_messages}</Table.Cell>
          <Table.Cell><Rating icon='star' rating={avg_evalution} maxRating={5}  /></Table.Cell>
          <Table.Cell>
            <button 
              onClick={() => this.editTopic(id)} 
              className="ui blue basic button"
            >
              Update
            </button>
            <button 
              style={{marginLeft: "10px"}} 
              onClick={() => this.deleteTopic(id)} 
              className="ui red basic button"
            >
              Delete
            </button>
            <button 
              style={{marginLeft: "10px"}} 
              onClick={() => this.viewRecords(id)} 
              className="ui blue basic button"
            >
              View Records
            </button>
            <button 
              style={{marginLeft: "10px"}} 
              onClick={() => this.addRecord(id)} 
              className="ui red basic button"
            >
              Add Record
            </button>
          </Table.Cell>
        </Table.Row>
      )
    })
  }

  render() {
    return (
      <div><br></br>
        <h2 className="ui header">Topics List</h2>
        <div className="ui segment">
          <button 
            onClick={this.addTopic} 
            className="ui green basic button"
          >
            Add Topic
          </button>
        </div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name Topic</Table.HeaderCell>
              <Table.HeaderCell>Count Records</Table.HeaderCell>
              <Table.HeaderCell>Average Evalution</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderTableData()}
          </Table.Body>
        </Table>
      </div>
    )
  }
}


export default ListTopicComponent