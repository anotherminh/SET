window.Symbol = React.createClass ({
  render: function () {
    // each of the feature is a css class

    // var _SHAPES = ["A", "B", "C"]
    // var _FILLS = ["M", "L", "N"]
    // var _COLORS = ["X", "Y", "Z"]
    // var _COUNTS = [1, 2, 3]

    var klass = "symbol",
    card = this.props.card,
    shape = card[0],
    fill = card[1],
    color = card[2],
    style = {};

    switch (shape) {
      case "A":
        klass += " square";
        break;
      case "B":
        klass += " triangle";
        break;
      case "C":
        klass += " hexagon";
    }

    switch (fill) {
      case "M":
        klass += " stripes";
        break;
      case "L":
        klass += " blank";
        break;
      case "N":
        klass += " solid";
        break;
    }

    switch (color) {
      case "X":
        klass += " tomato";
        break;
      case "Y":
        klass += " yellow";
      break;
      case "Z":
        klass += " blue";
      break;
    }

    return (
      <div className={klass}></div>
    );
  }
});
