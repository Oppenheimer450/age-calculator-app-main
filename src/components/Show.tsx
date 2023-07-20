import "../css/Show.css";

const Show = () => {
  return (
    <div className="result">
      <div className="show-years">
        <span>--</span>
        <label>years</label>
      </div>
      <div className="show-months">
        <span>--</span>
        <label>months</label>
      </div>
      <div className="show-days">
        <span>--</span>
        <label>days</label>
      </div>
    </div>
  );
};

export default Show;
