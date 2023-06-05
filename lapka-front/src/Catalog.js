

import { Dropdown } from 'semantic-ui-react'
import './App.css';
import ProductsTable from './ProductsTable';
import React from 'react';
import axios from 'axios';



// const host = "http://lapka-catalog.svanisimov.keenetic.pro/lapka"
// const host = "http://192.168.1.98:8089/lapka"
const host = "http://localhost:8089/lapka"
let filter = {
  categories: [],
  animals: [],
  brands: [],
  materials: [],
  subcategories: []
}

export default class Catalog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { products: [] }
    this.getData();
    this.getDictionaries();
  }


  render() {
    return (
      <div>
        
        <div className='filter'>
          <Dropdown onChange={(_, data) => this.updateFilter('categories', data.value)} placeholder='Категория' fluid multiple selection options={this.state.categories} />
          <Dropdown onChange={(_, data) => this.updateFilter('subcategories', data.value)} placeholder='Подкатегория' fluid multiple selection options={this.state.subcategories} />
          <Dropdown onChange={(_, data) => this.updateFilter('animals', data.value)} placeholder='Тип животного' fluid multiple selection options={this.state.animals} />
          <Dropdown onChange={(_, data) => this.updateFilter('brands', data.value)} placeholder='Производитель' fluid multiple selection options={this.state.brands} />
          <Dropdown onChange={(_, data) => this.updateFilter('materials', data.value)} placeholder='Материал' fluid multiple selection options={this.state.materials} />
          </div>
        <h1 className='catalog-header'>Найденные товары:</h1>
        <div className='catalog'><ProductsTable products={this.state.products} /></div>

      </div>
    );
  }

  getData() {
    axios.post(`${host}/products`, filter)
      .then(response => {
        console.log(response);
        this.setState({ products: response.data.result });
      })
  }

  getDictionaries() {
    axios.get(`${host}/categories`)
      .then(response => {
        this.setState(prevState => 
          ({
             ...prevState, 
             categories: response.data.result.map(e => 
              ({ text: e.name, value: e.id })) 
            })
        )
    });
    axios.get(`${host}/subcategories`)
      .then(response => {
        this.setState(prevState => 
          ({
             ...prevState, 
             subcategories: response.data.result.map(e => 
              ({ text: e.name, value: e.id })) 
            })
        )
    });
    axios.get(`${host}/materials`)
      .then(response => {
        this.setState(prevState => 
          ({
             ...prevState, 
             materials: response.data.result.map(e => 
              ({ text: e.name, value: e.id })) 
            })
        )
    });
    axios.get(`${host}/brands`)
      .then(response => {
        this.setState(prevState => 
          ({
             ...prevState, 
             brands: response.data.result.map(e => 
              ({ text: e.name, value: e.id })) 
            })
        )
    });
    axios.get(`${host}/animals`)
      .then(response => {
        this.setState(prevState => 
          ({
             ...prevState, 
             animals: response.data.result.map(e => 
              ({ text: e.name, value: e.id })) 
            })
        )
    });
  }

  updateFilter(fieldName, value) {
    filter[fieldName] = value;
    this.getData();
  }
}











