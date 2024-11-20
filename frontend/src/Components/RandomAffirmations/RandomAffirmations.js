import React, { useState } from 'react';
import '../RandomAffirmations/RandomAffirmations.css';

// Example image URLs, replace these with your preferred ones.
const images = [
  'https://wallpaperaccess.com/full/3153499.jpg',  // Motivational landscape
  'https://img.freepik.com/premium-photo/serene-scene-where-person-is-meditating-by-tranquil-lake-sunrise-with-gentle-mist-hovering_155027-5704.jpg',  // Calm and peaceful scene
  'https://diapogram.com/resized/1271-1920-1080.jpg',  // Vibrant nature
  'https://images.fineartamerica.com/images-medium-large-5/awe-inspiring-sunset-somerset-ollie-taylor.jpg',  // Inspiring sunset
  'https://th.bing.com/th/id/OIP.7lfuLGHHqrATWnzy3Hmg6gHaE7?rs=1&pid=ImgDetMain'   // Positive affirming quote on sky
];

const affirmations = [
  "My body is a temple of health and vitality.",
  "I lovingly care for my body and honor its needs",
  "I lovingly care for my body and honor its needs",
  "Your potential is endless.",
  "You are stronger than you think.",
  "You are capable of achieving greatness.",
  "You have the power to create change.",
  "Today is a fresh start.",
  "You are loved and appreciated.",
  "Every step you take brings you closer to your dreams."
];

const RandomAffirmations = () => {
  const [affirmation, setAffirmation] = useState(affirmations[0]);
  const [backgroundImage, setBackgroundImage] = useState(images[0]);

  const getRandomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    const randomImageIndex = Math.floor(Math.random() * images.length);
    setAffirmation(affirmations[randomIndex]);
    setBackgroundImage(images[randomImageIndex]);
  };

  console.log("Current Background Image:", backgroundImage); // Debugging line to check if image URL is correct

  return (
    <div className="affirmation-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="affirmation-box">
        <p className="affirmation-text">{affirmation}</p>
        <button className="refresh-button" onClick={getRandomAffirmation}>
          Get New Affirmation
        </button>
      </div>
    </div>
  );
};

export default RandomAffirmations;