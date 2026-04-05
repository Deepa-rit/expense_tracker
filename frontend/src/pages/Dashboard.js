/*import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [expenses, setExpenses] = useState([]);

  const [editId, setEditId] = useState(null);

  // LOAD EXPENSES WHEN PAGE LOADS
  useEffect(() => {
    fetchExpenses();
  }, []);

  // GET EXPENSES
  const fetchExpenses = async () => {

    try {

      const res = await axios.get("https://expense-tracker-2-rv7v.onrender.com/expense/all");

      const data = res.data;

      const list = [];

      for (let key in data) {

        list.push({
          id: key,
          ...data[key]
        });

      }

      setExpenses(list);

    } catch (err) {
      console.log(err);
    }

  };

  // ADD OR UPDATE EXPENSE
  const addExpense = async () => {

    if (!name || !amount) {
      alert("Enter expense and amount");
      return;
    }

    try {

      if (editId) {

        await axios.put(`https://expense-tracker-2-rv7v.onrender.com/expense/update/${editId}`, {
          name,
          amount
        });

        alert("Expense Updated");

        setEditId(null);

      } else {

        await axios.post("https://expense-tracker-2-rv7v.onrender.com/expense/add", {
          name,
          amount
        });

        alert("Expense Added");

      }

      setName("");
      setAmount("");

      fetchExpenses();

    } catch (err) {
      console.log(err);
    }

  };

  // DELETE EXPENSE
  const deleteExpense = async (id) => {

    await axios.delete(`https://expense-tracker-2-rv7v.onrender.com/expense/delete/${id}`);

    fetchExpenses();

  };

  // EDIT EXPENSE
  const editExpense = (expense) => {

    setName(expense.name);
    setAmount(expense.amount);
    setEditId(expense.id);

  };

  // TOTAL EXPENSE
  const totalExpense = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  return (

    <div style={{ width: "500px", margin: "auto", marginTop: "40px" }}>

      <h2>Expense Dashboard</h2>

      <input
        placeholder="Expense Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <button onClick={addExpense}>
        {editId ? "Update Expense" : "Add Expense"}
      </button>

      <hr />

      <h3>Expense List</h3>

      {expenses.map((e) => (

        <div key={e.id} style={{ marginBottom: "10px" }}>

          {e.name} - ₹{e.amount}

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => editExpense(e)}
          >
            Edit
          </button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => deleteExpense(e.id)}
          >
            Delete
          </button>

        </div>

      ))}

      <hr />

      <h3>Total Expense: ₹{totalExpense}</h3>

    </div>

  );

}

export default Dashboard;*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {

  const [name,setName]=useState("");
  const [amount,setAmount]=useState("");
  const [expenses,setExpenses]=useState([]);
  const [editId,setEditId]=useState(null);

  useEffect(()=>{
    fetchExpenses();
  },[]);

  const fetchExpenses = async () => {

    const res = await axios.get("https://expense-tracker-2-rv7v.onrender.com/expense/all");

    const data = res.data;

    const list=[];

    for(let key in data){

      list.push({
        id:key,
        ...data[key]
      });

    }

    setExpenses(list);

  };

  const addExpense = async () => {

    if(!name || !amount){
      alert("Enter expense and amount");
      return;
    }

    if(editId){

      await axios.put(`https://expense-tracker-2-rv7v.onrender.com/expense/update/${editId}`, {
        name,
        amount
      });

      setEditId(null);

    }else{

      await axios.post("https://expense-tracker-2-rv7v.onrender.com/expense/add", {
        name,
        amount
      });

    }

    setName("");
    setAmount("");

    fetchExpenses();

  };

  const deleteExpense = async (id) => {

    await axios.delete(`https://expense-tracker-2-rv7v.onrender.com/expense/delete/${id}`);
    fetchExpenses();

  };

  const editExpense = (expense) => {

    setName(expense.name);
    setAmount(expense.amount);
    setEditId(expense.id);

  };

  const totalExpense = expenses.reduce(
    (sum,e)=>sum + Number(e.amount),0
  );

  return(

    <div className="dashboard-container">

      <h2 className="title">Expense Tracker</h2>

      <input
        className="input-box"
        placeholder="Expense Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        className="input-box"
        placeholder="Amount"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
      />

      <button className="add-btn" onClick={addExpense}>
        {editId ? "Update Expense" : "Add Expense"}
      </button>

      <table className="expense-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>

          {expenses.map((e)=>(
            <tr key={e.id}>

              <td>{e.name}</td>
              <td>₹{e.amount}</td>

              <td>
                <button
                className="edit-btn"
                onClick={()=>editExpense(e)}
                >
                Edit
                </button>
              </td>

              <td>
                <button
                className="delete-btn"
                onClick={()=>deleteExpense(e.id)}
                >
                Delete
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

      <div className="total-box">
        Total Expense: ₹{totalExpense}
      </div>

    </div>

  );

}

export default Dashboard;
