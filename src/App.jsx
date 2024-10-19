import "./App.css";
import { useState } from "react";
import { v4 } from "uuid";

export default function App() {
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // update history
    let newHistory = {
      id: v4(),
      desc: e.target[0].value,
      amount: parseFloat(e.target[1].value),
    };

    setHistory([...history, newHistory]);

    if (newHistory.amount > 0) {
      setBalance(balance + newHistory.amount);
      setIncome(income + newHistory.amount);
    } else {
      setBalance(balance + newHistory.amount);
      setExpense(expense + newHistory.amount);
    }
  };

  const handleDelete = (id) => {
    // found list item
    let found = history.find((item) => item.id === id);
    console.log("found", found.amount);

    if (found.amount > 0) {
      setBalance(balance - found.amount);
      setIncome(income - found.amount);
    } else {
      setBalance(balance - found.amount);
      setExpense(expense - found.amount);
    }

    let updateHistory = history.filter((item) => item.id !== id);
    setHistory(updateHistory);
  };

  console.log(history);

  return (
    <main>
      <h2>Expense Tracker</h2>

      <div className="container">
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

        <h3>Add new transaction</h3>
        <form id="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input type="text" id="text" placeholder="Enter text..." />
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Amount <br />
              (negative - expense, positive - income)
            </label>
            <input type="number" id="amount" placeholder="Enter amount..." />
          </div>
          <button className="btn">Add transaction</button>
        </form>

        <h3>History</h3>
        <ul id="list" className="list">
          {history
            .slice()
            .reverse()
            .map((hist) => (
              <li className={hist.amount > 0 ? "plus" : "minus"} key={hist.id}>
                {hist.desc} <span>${hist.amount}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(hist.id)}
                >
                  x
                </button>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
