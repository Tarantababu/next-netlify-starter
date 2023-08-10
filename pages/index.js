import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './Home.module.css'; // Import your CSS module

export default function Home() {
  const [baseText, setBaseText] = useState("This is your base text");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [baseTextVisible, setBaseTextVisible] = useState(false);

  const handleSetBaseText = () => {
    setBaseText(document.getElementById('baseTextInput').value.trim());
    document.getElementById('baseTextInput').value = '';
    setBaseTextVisible(false);
  }

  const handleCheck = () => {
    // ... Rest of the handleCheck code ...
  }

  const findMistakes = (base, user) => {
    // ... Rest of the findMistakes code ...
  }

  const toggleBaseTextVisibility = () => {
    setBaseTextVisible(!baseTextVisible);
  }

  return (
    <div>
      <Head>
        <title>Dictation Practice App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="Dictation Practice" />

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <h2>Base Text</h2>
            <textarea id="baseTextInput" className="form-control mb-2" placeholder="Enter base text here"></textarea>
            <button onClick={handleSetBaseText} className="btn btn-primary mb-3">Set Base Text</button>

            <span className={styles['info-icon']} onClick={toggleBaseTextVisibility}>
              ℹ️ {/* Replace with an appropriate info icon */}
            </span>

            {baseTextVisible && (
              <p id="baseText" className="mt-2">{baseText}</p>
            )}
          </div>
          <div className="col-md-6">
            <h2>Dictation</h2>
            <textarea id="inputText" className="form-control mb-2" placeholder="Type your dictation here" onChange={e => setInputText(e.target.value)}></textarea>
            <button onClick={handleCheck} className="btn btn-success mb-3">Check</button>

            <div id="result" className="mb-3">{result}</div>
            <div id="history">
              <h2>History</h2>
              {history.map((attempt, index) => (
                // ... Rest of the history map code ...
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
