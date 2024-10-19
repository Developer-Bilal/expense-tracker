import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid

export default function App() {
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new transaction with a unique id using uuid
    const newTransaction = {
      id: uuidv4(), // Generate a unique ID
      desc: e.target[0].value,
      amount: parseFloat(e.target[1].value),
    };

    // Update history immutably
    const updatedHistory = [...history, newTransaction];

    let val = newTransaction.amount;
    let newIncome = income;
    let newExpense = expense;
    let newBalance = balance;

    if (val > 0) {
      newIncome += val;
      newBalance += val;
    } else {
      newExpense -= val; // subtracting a negative value
      newBalance += val;
    }

    setHistory(updatedHistory);
    setIncome(newIncome);
    setExpense(newExpense);
    setBalance(newBalance);
  };

  const handleDelete = (id) => {
    // Filter out the item with the given id
    const updatedHistory = history.filter((item) => item.id !== id);

    // Recalculate income, expense, and balance
    const newIncome = updatedHistory
      .filter((item) => item.amount > 0)
      .reduce((acc, item) => acc + item.amount, 0);
    const newExpense = updatedHistory
      .filter((item) => item.amount < 0)
      .reduce((acc, item) => acc - item.amount, 0);
    const newBalance = newIncome - newExpense;

    // Update state
    setHistory(updatedHistory);
    setIncome(newIncome);
    setExpense(newExpense);
    setBalance(newBalance);
  };

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
            <input type="text" id="text" placeholder="Enter text..." required />
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Amount <br />
              (negative - expense, positive - income)
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount..."
              required
            />
          </div>
          <button className="btn">Add transaction</button>
        </form>

        <h3>History</h3>
        <ul id="list" className="list">
          {history.map((hist) => (
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
