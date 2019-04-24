import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';
const API_URL = 'https://deckofcardsapi.com/api/deck';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck_id: '',
      cardsRemaining: 52,
      drawnCards: []
    }

    this.getCard = this.getCard.bind(this)
  }

  async componentDidMount() {
    const deck = await axios.get(`${API_URL}/new/shuffle/`);
    const deck_data = deck.data;
    this.setState({deck_id: deck_data.deck_id})
  }

  async getCard() {
    const id = this.state.deck_id;
    const response = await axios.get(`${API_URL}/${id}/draw/`);
    const card = response.data.cards[0]
    this.setState(st => ({
      drawnCards: [
        ...st.drawnCards,
        {
          id: card.code,
          image: card.image,
          suit: card.suit,
          value: card.value
        }
      ]
    }))

    this.setState({cardsRemaining: response.data.remaining})
  }

  render() {
    let card = this.state.drawnCards.map(card => (
      <Card 
        key={card.id}
        image={card.image}
        suit={card.suit}
        value={card.value}
      />
    ))
    return (
      <div className="Deck">
        <h1 className="Deck-title"><span role="img" aria-label="spade">♠️</span>Card Dealer<span role="img" aria-label="clubs">♣️</span></h1>
        <h2 className="Deck-title subtitle"><span role="img" aria-label="hearts">♥️</span>A little demo made with React<span role="img" aria-label="diamonds">♦️</span></h2>
        <button className="Deck-btn" disabled={this.state.cardsRemaining === 0} onClick={this.getCard}>{this.state.cardsRemaining === 0 ? '0 cards left' : 'Hit me!'}</button>
        <div className="Deck-cardarea">
          {card}  
        </div>
      </div>
    )
  }
}

export default Deck;

