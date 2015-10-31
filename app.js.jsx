window.App = React.createClass({

  render: function () {

    return (
      <div className="app">
        <div className="cards-container">
          {
            this.props.cards.playableDeck.map(function (card, idx) {
              return <CardComponent key={idx} card={card}/>
            })
          }
        </div>
        <div className="sets-found">
        </div>
      </div>
    );
  }
});
