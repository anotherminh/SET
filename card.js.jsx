window.CardComponent = React.createClass({
  render: function () {
    var symbolCount = this.props.card[3];
    var cardView = [];

    for (var i = 0; i < symbolCount; i++) {
      cardView.push(<Symbol key={i} card={this.props.card}/>);
    }

    return (
      <div className="card">
        {
          cardView.map(function (cardPortion) {
            return cardPortion;
          })
        }
      </div>
    );
  }
});
