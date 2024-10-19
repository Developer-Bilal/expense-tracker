export default function Main({ balance, income, expense }) {
  return (
    <>
      <h4>Your Balance</h4>
      <h1 id="balance">${balance}</h1>

      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="money-plus" className="money plus">
            +${income}
          </p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className="money minus">
            -${expense}
          </p>
        </div>
      </div>
    </>
  );
}
