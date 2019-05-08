import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';

import Error from '../ErrorMessage';
import Form from '../styles/Form';
import formatMoney from '../../lib/formatMoney';

const TextArea = styled.textarea`
  resize: vertical;
`;

export const SINGLE_ITEM_QUERY = gql`
  query SIGNLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
    }
  }
`;

class UpdateItem extends Component {

  state = {}

  handleChange = (evt) => {
    const { name, type, value } = evt.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateItem = async(e, updateItemMutation) => {
    e.preventDefault();
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    });
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{
        id: this.props.id
      }}>
        {({data, loading}) => {
          if (loading) return <p>loading...</p>;

          if(!data.item) return <p>Not Found..</p>

          return (
        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
          {(updateItem, { loading, error }) => (
            <Form onSubmit={e => this.updateItem(e, updateItem)}>
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="title">
                  Title
                  <input 
                    type="text"
                    id="title"
                    name="title"
                    placeholder="title"
                    required
                    onChange={this.handleChange}
                    defaultValue={data.item.title} />
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
                    defaultValue={data.item.price} />
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
                    defaultValue={data.item.description}></TextArea>
                </label>

                <button type="submit">Save Changes</button>
              </fieldset>
            </Form>
          )}
        </Mutation>
        )
      }}
    </Query>
    );
  }
}

export default UpdateItem;