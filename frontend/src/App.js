import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Schedule from './components/Schedule';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentQuote, setCurrentQuote] = useState({});
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      const interval = setInterval(() => {
        setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [quotes]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/motivational-quotes');
      const data = await response.json();
      setQuotes(data);
      if (data.length > 0) {
        setCurrentQuote(data[0]);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
      // Frases por defecto si falla la API
      const defaultQuotes = [
        { text: "El éxito no es final, el fracaso no es fatal: lo que cuenta es el coraje para continuar.", author: "Winston Churchill" },
        { text: "Tu cuerpo puede hacerlo. Es tu mente la que necesitas convencer.", author: "Desconocido" },
        { text: "La diferencia entre lo imposible y lo posible está en la determinación.", author: "Tommy Lasorda" }
      ];
      setQuotes(defaultQuotes);
      setCurrentQuote(defaultQuotes[0]);
    }
  };

  return (
    <div className="App">
                    <Header />
              <Hero quote={currentQuote} />
              <About />
              <Schedule />
              <Location />
              <Contact />
              <Footer />
    </div>
  );
}

export default App;
