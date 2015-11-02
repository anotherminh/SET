window.App = React.createClass({
  getInitialState: function () {
    return {
            sets: this.props.cards.playableDeck.length,
            setsFound: 0,
            buildingSet: [],
            notif: ""
           }
  },

  checkCurrentSet: function () {
    var set = this.state.buildingSet;
    if (set.length === 3) {
      var card1 = set[0],
      card2 = set[1],
      card3 = set[2],
      isASet = true;

      for (var i = 0; i < card1.length; i++) {
        if (!(card1[i] === card2[i]) && (card2[i] === card3[i])) {
          isASet = false;
        } else if (!(card1[i] !== card2[i]) &&
                  ((card2[i] !== card3[i]) && (card1[i] !== card3[i]))) {
                    isASet = false;
                  }
      }

      if (isASet) {
        // alert or something instead of console log
        console.log("found set");
        //check also to see if the player has won!
        this.setState({ setsFound: this.state.setsFound + 1, buildingSet: [] });
      } else {
        console.log("not set");
        this.setState({ buildingSet: [] });
      }
    }
  },

  handleClick: function (cardValue) {
    this.state.buildingSet.push(cardValue);
    if (this.state.buildingSet.length === 3) {
      this.checkCurrentSet();
    } else {
      this.forceUpdate();
    }
  },

  handleUnclick: function (cardValue) {
    var idx = this.state.buildingSet.indexOf(cardValue);
    this.state.buildingSet.splice(idx, 1);
    this.forceUpdate();
  },

  render: function () {
    return (
      <div className="app">
        Found {this.state.setsFound} set(s) out of {this.props.cards.setsCount}.
        <div className="cards-container">
          {
            this.props.cards.playableDeck.map(function (card, idx) {
              return <CardComponent key={idx}
                                    card={card}
                                    selectedCards={this.state.buildingSet}
                                    handleClick={this.handleClick}
                                    handleUnclick={this.handleUnclick}/>
            }.bind(this))
          }
        </div>
        <div className="sets-found">
        </div>
      </div>
    );
  }
});
