window.Symbol = React.createClass ({
  render: function () {
    // each of the feature is a css class

    // var _SHAPES = ["A", "B", "C"]
    // var _COLORS = ["X", "Y", "Z"]

    var card = this.props.card,
    coloredShapeUrl = "./images/" + card[0] + card[2] + ".png";

    return (
      <div className="symbol">
        <img src={coloredShapeUrl}/>
      </div>
    );
  }
});
