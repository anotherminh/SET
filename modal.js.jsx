window.Modal = React.createClass({
  render: function () {
    return (
      <div className="modal-box">
        <div className="blur"></div>
        <div className="modal-message">
          {this.props.message}
        </div>
        <div onClick={window.restartGame} className="play-again">Play Again</div>
      </div>
    );
  }
});
