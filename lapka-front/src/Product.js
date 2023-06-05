import { Modal, Image, Header } from 'semantic-ui-react';
import './App.css';
import React from 'react';
import axios from 'axios';

const host = "http://localhost:8089/lapka"
export default class Product extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {product: {id: this.props.productId
    }}    
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.setState({product: {id: this.props.productId}})
    }
  }
  
  render() {
    return (
      <Modal  
        trigger = {this.props.trigger}
        onOpen={() => this.getData()}
      >
      <Modal.Header>{this.state.product.name}</Modal.Header>
      <div className='info'> 
      <Modal.Content image>
        <Image className='photo' size='medium' src={this.state.product.photo}></Image>
        <Modal.Description>
          <Header className='conteiner'>{this.state.product.category}</Header>
          <Header className='conteiner'>{this.state.product.subcategories}</Header>
          <p>{this.state.product.description}</p>
          <p>Тип животного: {this.state.product.animals}</p>
          <p>Производитель: {this.state.product.brands}</p>
          <p>Материал: {this.state.product.materials}</p>
          <Header>{this.state.product.price} ₽</Header>
        </Modal.Description>
          <Button />
        </Modal.Content>
        </div>
      </Modal>
    );
  }

  getData() {
    console.log('getdata')
    axios.get(`${host}/product/${this.state.product.id}`) 
    .then (response => this.setState({product: response.data}))
  }

}

function Button() {
  return (
    <button className='button'>Добавить в корзину</button>
  )
}