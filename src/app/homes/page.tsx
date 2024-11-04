"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaEnvelope } from 'react-icons/fa';
import ReactConfetti from 'react-confetti';
import { useRouter } from 'next/navigation';

type MyComponentProps = {
  name: string;
};

const MyComponent: React.FC<MyComponentProps> = ({ name }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.message}
    >
      {name}, you make my world brighter every day! 🌟
    </motion.div>
  );
};

const LoveMessage: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      style={styles.loveMessage}
    >
      <p>{message}</p>
      <button onClick={onClose} style={styles.closeButton}>Close</button>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const [loveCount, setLoveCount] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<boolean>(false);
  const router = useRouter();

  const images = [
    "/images/IMG1.jpg",
    "/images/IMG2.jpg",
    "/images/IMG3.jpg",
    "/images/IMG4.jpg",
    "/images/IMG5.jpg",
    "/images/IMG6.jpg"
  ];

  const loveMessages = [
    "Your love is the best thing that's ever happened to me.",
    "Every moment with you feels like a beautiful dream.",
    "You're the missing piece to my puzzle, Atipatsa.",
    "Your smile brightens even my darkest days.",
    "I fall in love with you more and more each day."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const incrementLove = () => {
    setLoveCount(prevCount => prevCount + 1);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  return (
    <div style={{...styles.container, backgroundImage: `url(${images[currentImage]})`}}>
      <div style={styles.overlay}>
        {confetti && <ReactConfetti />}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.5 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
          style={styles.title}
        >
          💖 For You, Atipatsa 💖
        </motion.h1>
        <motion.p 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          style={styles.paragraph}
        >
          You are the love of my life. Every moment with you is a treasure.
        </motion.p>
        <div style={styles.buttonContainer}>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            style={styles.button}
            onClick={incrementLove}
          >
            <FaHeart style={styles.icon} /> Send Love!
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            style={{...styles.button, backgroundColor: '#ff69b4'}}
            onClick={() => setShowMessage(true)}
          >
            <FaEnvelope style={styles.icon} /> Open Love Message
          </motion.button>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={styles.loveCounter}
        >
          Love sent to Brandon: {loveCount} 💕
        </motion.div>
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          style={styles.button}
          onClick={() => router.push('/final')}
        >
          I feel Loved
        </motion.button>
        <MyComponent name="Atipatsa" />
        <AnimatePresence>
          {showMessage && (
            <LoveMessage 
              message={loveMessages[Math.floor(Math.random() * loveMessages.length)]} 
              onClose={() => setShowMessage(false)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundPosition: 'center',
    transition: 'background-image 2s ease-in-out',
  },
  overlay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 240, 245, 0.8)',
    padding: '20px',
  },
  title: {
    fontSize: '3.5rem',
    marginBottom: '20px',
    color: '#ff1493',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },
  paragraph: {
    fontSize: '1.5rem',
    marginBottom: '40px',
    maxWidth: '600px',
    lineHeight: '1.6',
    color: '#333',
    textAlign:'center'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#ff69b4',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 24px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s ease',
  },
  icon: {
    marginRight: '10px',
  },
  loveCounter: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    color: '#333',
  },
  message: {
    fontSize: '1.3rem',
    fontStyle: 'italic',
    color: '#ff69b4',
    marginTop: '30px',
  },
  loveMessage: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'black',
    padding: '20px',
    borderRadius: '10px',
    zIndex: 1000,
    maxWidth: '80%',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#ff69b4',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Home;