import "../css/Input.css"

const Input = () => {
  return (
    <div className="inputs">
      <div className="input-days">
        <label>day</label>
        <input type="text" placeholder="DD" id="day"></input>
      </div>
      <div className="input-months">
        <label>month</label>
        <input type="text" placeholder="MM" id="month"></input>
      </div>
      <div className="input-days">
        <label>year</label>
        <input type="text" placeholder="YYYY" id="year"></input>
      </div>
    </div>
  );
};

export default Input;