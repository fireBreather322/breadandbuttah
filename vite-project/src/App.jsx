import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [books, setBooks] = useState()

  function getBooks() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setBooks(data);
      });
  }

  function createBook() {
    let book_name = prompt('Enter book name');
    fetch('http://localhost:3001/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({book_name}),
    })
      .then(response => {
        console.log("book added")
        return response.text();
      })
      .then(data => {
        alert(data);
        getBooks();
      });
  }



  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <br />
      <button onClick={createBook}>Add book</button>
      <br />

      <br />
      <button onClick={getBooks}>Print out books </button>
      <p>{books}</p>
      <br />

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
