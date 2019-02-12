import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Color from './Color.jsx';

class ProductOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      variant: {},
      colors: [],
      sizes: []
    };

    this.getRandomProduct = this.getRandomProduct.bind(this);
  }

  componentDidMount() {
    this.getRandomProduct();
  }

  getRandomProduct() {
    axios.get('http://localhost:3001/products/random')
      .then((response) => {
        let randomProduct = response.data;
        let randomVariantIndex = Math.floor(Math.random() * randomProduct.variants.length);

        this.setState({
          product: randomProduct,
          variant: randomProduct.variants[randomVariantIndex],
          colors: randomProduct.variants.map(variant => <Color color={variant.color} />),
          sizes: randomProduct.variants.map(variant => variant.size)
        });
      });
  }

  render() {
    return (
      <div className="productOptions">
        <div className="brand"><a href="#">{this.state.product.brand}</a></div>
        <div className="title">{this.state.product.title}</div>
        <div className="itemId">Item #{this.state.product.itemId}</div>
        <div className="price">${this.state.variant.price}</div>
        <div className="freeShipping" style={{display: this.state.product.freeShipping ? 'block' : 'none'}}>
          <a href="#"><i className="fas fa-truck"></i>This item ships for FREE!</a>
        </div>
        <div className="colors">{this.state.colors}</div>
      </div>
    );
  }
}
export default ProductOptions;