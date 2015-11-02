window.App = React.createClass({
  getInitialState: function () {
    return {
            setsCount: this.props.cards.setsCount,
            setsFound: [],
            buildingSet: [],
            showNotif: false,
            notif: "",
            gameWon: false
           }
  },

  gameWon: function () {
    if (this.state.setsFound.length == this.state.setsCount) {
      return true;
    } else {
      return false;
    }
  },

  checkCurrentSet: function () {
    var set = this.state.buildingSet;
    var card1 = set[0],
    card2 = set[1],
    card3 = set[2],
    isASet = true,
    duplicate: false;

    for (var i = 0; i < card1.length; i++) {
      if (
        !((card1[i] === card2[i]) && (card2[i] === card3[i])) &&
        !((card1[i] !== card2[i]) &&
        ((card2[i] !== card3[i]) && (card1[i] !== card3[i])))
      ) {
        isASet = false;
      }
    }

    this.state.setsFound.forEach(function (oldSet) {
      if (oldSet.sort().toString() === set.sort().toString()) {
        duplicate = true;
        isASet = false;
      }
    })

    console.log(set + " / " + isASet);
    this.handleCurrentSetStatus(isASet, duplicate);
  },

  handleCurrentSetStatus: function (status, dup) {
    if (status) {
      this.state.setsFound.push(this.state.buildingSet);
      var gameStatus = this.gameWon();
      this.setState({
        buildingSet: [],
        showNotif: true,
        notif: "Found a set!",
        gameWon: gameStatus
      });
    } else {
      var notif;
      if (dup) {
        notif = "You already found that set.";
      } else {
        notif = "That's not a set.";
      }

      this.setState({
        buildingSet: [],
        showNotif: true,
        notif: notif
      });
    }
  },

  handleClick: function (cardValue) {
    this.state.buildingSet.push(cardValue);
    if (this.state.buildingSet.length === 3) {
      this.checkCurrentSet();
    } else {
      this.state.showNotif = false;
      this.forceUpdate();
    }
  },

  handleUnclick: function (cardValue) {
    var idx = this.state.buildingSet.indexOf(cardValue);
    this.state.buildingSet.splice(idx, 1);
    this.forceUpdate();
  },

  renderModal: function () {
    if (this.state.gameWon) {
      return <Modal message="You won!"/>
    }
  },

  renderNotif: function () {
    var notifClass;
    if (this.state.showNotif) {
      notifClass = "notif show-notif";
    } else {
      notifClass = "notif hide-notif";
    }

    return notifClass;
  },

  showInstructions: function () {
    this.setState({ showInstructions: true });
  },

  turnOffInstructions: function () {
    this.setState({ showInstructions: false });
  },

  renderInstructions: function () {
    if (this.state.showInstructions) {
      return <Instruction turnOffInstructions={this.turnOffInstructions}/>
    }
  },

  render: function () {
    return (
      <div className="app">
        <div className="game-stats">
          Found <span className="sets-found">{this.state.setsFound.length}</span> set(s) out of {this.props.cards.setsCount}.
        </div>
        <div className={this.renderNotif()}>{this.state.notif}</div>
        {this.renderModal()}
        {this.renderInstructions()}
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
        <div className="how-to-play" onClick={this.showInstructions}>
          How To Play Set
        </div>
      </div>
    );
  }
});
