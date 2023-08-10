import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
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
    const userText = inputText.trim();
    const mistakesIndexes = findMistakes(baseText, userText);
    const mistakeCount = mistakesIndexes.length;

    const currentAttempt = {
      userText: userText,
      mistakes: mistakeCount,
    };

    setHistory([currentAttempt, ...history.slice(0, 4)]);
    setResult(`Mistakes found: ${mistakeCount}`);

    const inputElements = document.querySelectorAll('#inputTextContainer input');

    inputElements.forEach((input, index) => {
      if (mistakesIndexes.includes(index)) {
        input.classList.add(styles['input-error']);
      } else {
        input.classList.remove(styles['input-error']);
      }
    });
  }

  const findMistakes = (base, user) => {
    const baseWords = base.split(/\s+/).filter(word => word !== ""); // Split by whitespace and filter empty strings
    const userWords = user.split(/\s+/).filter(word => word !== ""); // Split by whitespace and filter empty strings
    const mistakes = [];

    let i = 0;
    let j = 0;

    while (i < baseWords.length && j < userWords.length) {
      if (baseWords[i].toLowerCase() !== userWords[j].toLowerCase()) {
        mistakes.push(i); // Store the index of the mistake
        i++;
      } else {
        i++;
        j++;
      }
    }

    while (i < baseWords.length) {
      mistakes.push(i); // Store the index of the mistake
      i++;
    }

    return mistakes;
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
              <i className="fas fa-info-circle"></i>
            </span>

            {baseTextVisible && (
              <p id="baseText" className="mt-2">{baseText}</p>
            )}
          </div>
          <div className="col-md-6">
            <h2>Dictation</h2>
            <div id="inputTextContainer">
              <textarea id="inputText" className={`form-control mb-2 ${styles['input-text']}`} placeholder="Type your dictation here" onChange={e => setInputText(e.target.value)}></textarea>
              <button onClick={handleCheck} className="btn btn-success mb-3">Check</button>
            </div>

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
