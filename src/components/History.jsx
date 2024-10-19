export default function History() {
  return (
    <>
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
    </>
  );
}
