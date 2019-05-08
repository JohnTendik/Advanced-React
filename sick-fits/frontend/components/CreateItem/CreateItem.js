import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';

import Error from '../ErrorMessage';
import Form from '../styles/Form';
import formatMoney from '../../lib/formatMoney';

const TextArea = styled.textarea`
  resize: vertical;
`;

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {

  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  }

  handleChange = (evt) => {
    const { name, type, value } = evt.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async(evt) => {
    const files = evt.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sick-fits');

    const response = await fetch('https://api.cloudinary.com/v1_1/ig-jt/image/upload', {
      method: 'POST',
      body: data
    });

    const file = await response.json();
    console.log(file);

    this.setState({
      image: file.url,
      largeImage: file.eager[0].secure_url
    });

  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={async(e) => {
            e.preventDefault();
            const res = await createItem(this.state);
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id }
            })
          }}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input 
                  type="file"
                  id="file"
                  name="file"
                  placeholder="upload an image"
                  required
                  onChange={this.uploadFile}/>
                {this.state.image && <img src={this.state.image} />}
              </label>
              <label htmlFor="title">
                Title
                <input 
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
                  required
                  onChange={this.handleChange}
                  value={this.state.title} />
              </label>
  
              <label htmlFor="price">
                Price
                <input 
                  type="number"
                  id="price"
                  name="price"
                  placeholder="price"
                  required
                  onChange={this.handleChange}
                  value={this.state.price} />
              </label>
  
              <label htmlFor="description">
                Description
                <TextArea 
                  type="text"
                  id="description"
                  name="description"
                  placeholder="description"
                  required
                  resize="false"
                  onChange={this.handleChange}
                  value={this.state.description}></TextArea>
              </label>

              <input type="submit"/>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;