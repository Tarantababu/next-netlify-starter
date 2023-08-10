import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import React, { useState } from 'react';

export default function Home() {
  const [baseText, setBaseText] = useState("This is your base text");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const handleSetBaseText = () => {
    setBaseText(document.getElementById('baseTextInput').value.trim());
    document.getElementById('baseTextInput').value = '';
  }

  const handleCheck = () => {
    const userText = inputText.trim();
    const mistakes = findMistakes(baseText, userText);
    const mistakeCount = mistakes.length;

    const currentAttempt = {
      userText: userText,
      mistakes: mistakes,
      mistakeCount: mistakeCount,
    };

    setHistory([currentAttempt, ...history.slice(0, 4)]);
    setResult(`Mistakes found: ${mistakeCount}`);
  }

  const findMistakes = (base, user) => {
    const baseWords = base.split(' ');
    const userWords = user.split(' ');
    const mistakes = [];

    for (let i = 0; i < baseWords.length; i++) {
      if (i >= userWords.length || baseWords[i] !== userWords[i]) {
        mistakes.push(baseWords[i]);
      }
    }

    if (userWords.length > baseWords.length) {
      for (let i = baseWords.length; i < userWords.length; i++) {
        mistakes.push(userWords[i]);
      }
    }

    return mistakes;
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

          <p id="baseText">{baseText}</p>

          <p>Dictate the text:</p>
          <textarea id="inputText" placeholder="Type your dictation here" onChange={e => setInputText(e.target.value)}></textarea>
          <button onClick={handleCheck}>Check</button>

          <div id="result">{result}</div>
          <div id="history">
            <h2>History</h2>
            {history.map((attempt, index) => (
              <div key={index} className="attempt">
                <p><strong>Attempt {index + 1}</strong> ({attempt.mistakeCount} mistake(s)):</p>
                <p><em>Input:</em> {attempt.userText}</p>
                <p><em>Mistakes:</em></p>
                {attempt.mistakes.map((mistake, mistakeIndex) => (
                  <p key={mistakeIndex}>{mistakeIndex + 1}. {mistake}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
