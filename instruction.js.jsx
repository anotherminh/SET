window.Instruction = React.createClass({
  render: function () {
    return (
      <div className="instruction-box">
        <div onClick={this.props.turnOffInstructions} className="close-box">X</div>
        <div className="blur"></div>
        <div className="instructions">
          The goal is to find all the sets in the card (how many there are varies from round to round). <br/>

          Each card has 4 distinct features:
          <ul>
            <li>Type of Pepper (chili, habanero, bell)</li>
            <li>Color of Pepper (red, yellow, green)</li>
            <li>Background Color (pink, blue, yellow)</li>
            <li>Number of Pepper (1, 2, 3)</li>
          </ul>
          A set contains 3 cards, where each of the features are either the same across three cards, or completely different.
          <div className="examples-wrapper">
            <div className="set example">
              <img src="./images/set.jpg"/>
              Example of a valid set. The type of pepper is the same (bell pepper),
              the color of the pepper is the same (green),
              while the other features (count, background) are different.
            </div>
            <div className="not-set example">
              <img src="./images/not-a-set.jpg"/>
              Example of an invalid set. We have different types of pepper,
              different counts, and different colors of pepper, but
              two of the backgrounds are the same color.
            </div>
          </div>
          </div>
      </div>
    );
  }
});
