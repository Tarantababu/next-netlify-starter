import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import React, { useState } from 'react';

export default function Home() {
  const [baseText, setBaseText] = useState("This is your base text");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [baseTextVisible, setBaseTextVisible] = useState(false); // Updated initial state

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
    <div className="container">
      <Head>
        <title>Dictation Practice App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Dictation Practice" />

        <div>
          <p>Enter your base text:</p>
          <textarea id="baseTextInput" placeholder="Enter base text here"></textarea>
          <button onClick={handleSetBaseText}>Set Base Text</button>

          <span className="info-icon" onClick={toggleBaseTextVisibility}>
            ℹ️ {/* Replace with an appropriate info icon */}
          </span>

          {baseTextVisible && (
            <p id="baseText">{baseText}</p>
          )}

          <p>Dictate the text:</p>
          <textarea id="inputText" placeholder="Type your dictation here" onChange={e => setInputText(e.target.value)}></textarea>
          <button onClick={handleCheck}>Check</button>

          <div id="result">{result}</div>
          <div id="history">
            <h2>History</h2>
            {history.map((attempt, index) => (
              // ... Rest of the history map code ...
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
