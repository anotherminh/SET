// points deducted for each bad guess
var BAD_SET_PENALTY = 50;
// will be divided by average solve time in seconds
//
var TOP_SCORE = 60000;

window.App = React.createClass({
  getInitialState: function () {
    return {
            setsFound: [],
            buildingSet: [],
            showNotif: false,
            notif: "",
            gameWon: false,
            score: 0
          };
  },

  componentDidMount: function() {
    this.startTime = Date.now();
    this.highScore = 0;
    this.badSets = 0;
  },

  gameWon: function (setsFound) {
    if (setsFound.length == this.props.cards.solution.length) {
      return true;
    } else {
      return false;
    }
  },

  checkCurrentSet: function () {
    var set = this.state.buildingSet,
    duplicate = false,
    isASet = window.Deck.isASet(set);

    this.state.setsFound.forEach(function (oldSet) {
      if (oldSet.sort().toString() === set.sort().toString()) {
        duplicate = true;
        isASet = false;
      }
    });

    this.handleCurrentSetStatus(isASet, duplicate);
  },

  handleCurrentSetStatus: function (status, dup) {
    var notif;
    var setsFound = this.state.setsFound;
    var gameStatus = this.state.gameStatus;
    if (status) {
      setsFound.push(this.state.buildingSet);
      gameStatus = this.gameWon(setsFound);
      notif = "Found a set!";
    } else {
      if (dup) {
        notif = "You already found that set.";
      } else {
        this.badSets ++;
        notif = "That's not a set. -50 points";
      }
    }
    this.setState({
      buildingSet: [],
      showNotif: true,
      notif: notif,
      setsFound: setsFound,
      gameWon: gameStatus
    });
    this.updateScore();
  },

  updateScore: function() {
    this.setState({score: this.calculateScore()});
  },

  handleClick: function (cardValue) {
    // this.setState({gameWon: true});
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

  calculateScore: function() {
    var score = this.finishTimeInSeconds() / this.state.setsFound.length;  // avg ms per currently discovered set
    score = parseInt(TOP_SCORE / score);
    if (score > this.highScore) {this.highScore = score;}
    return score - (this.badSets * BAD_SET_PENALTY);
  },

  finishTimeInSeconds: function() {
    return (Date.now() - this.startTime) / 1000;
  },

  renderModal: function () {
    if (this.state.gameWon) {
      startParade();
      var winMessage =
      <div className="won-modal">
        <h1>You won!</h1><br></br>
        Your Score: {this.calculateScore()}<br></br>
        High Score: {this.highScore}
      </div>;
      return <Modal message={winMessage}/>
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

  totalSets: function(){
    return this.props.cards.solution.length;
  },

  render: function () {
    return (
      <div className="app">
        <div className="game-stats">
          Found <span className="sets-found">{this.state.setsFound.length}</span> set(s) out of {this.totalSets()}.<br></br>
        Score: {this.state.score}
        </div>
        <div className={this.renderNotif()}>{this.state.notif}</div>
        {this.renderModal()}
        {this.renderInstructions()}
        <div className="cards-container">
          {
            this.props.cards.playableCards.map(function (card, idx) {
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
