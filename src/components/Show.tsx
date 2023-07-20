import "../css/Show.css";

const Show = () => {
  return (
    <div className="result">
      <div>
        <span id="show-years">--</span>
        <label>years</label>
      </div>
      <div>
        <span id="show-months">--</span>
        <label>months</label>
      </div>
      <div>
        <span id="show-days">--</span>
        <label>days</label>
      </div>
    </div>
  );
};

export default Show;
