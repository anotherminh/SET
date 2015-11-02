window.CardComponent = React.createClass({
  handleClick: function (e) {
    var cardValue = e.currentTarget.getAttribute('value');
    if (this.clickStatus() === "") {
      this.props.handleClick(cardValue);
    } else {
      this.props.handleUnclick(cardValue);
    }
  },

  clickStatus: function () {
    if (this.props.selectedCards.indexOf(this.props.card) !== -1) {
      return " on";
    } else {
      return "";
    }
  },

  render: function () {
    var card = this.props.card
    var symbolCount = card[3];
    var cardView = [];

    for (var i = 0; i < symbolCount; i++) {
      cardView.push(<Symbol key={i} card={this.props.card}/>);
    }

    var fillUrl = "./images/" + card[1] + ".jpg";
    var klass = "card-wrapper" + this.clickStatus();

    return (
      <div className={klass} onClick={this.handleClick} value={card}>
        <div className="card">
          {
            cardView.map(function (cardPortion) {
              return cardPortion;
            })
          }
          <img className="fill" src={fillUrl}/>
        </div>
      </div>
    );
  }
});
