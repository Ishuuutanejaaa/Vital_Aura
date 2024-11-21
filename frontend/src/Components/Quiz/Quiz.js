import React, { useState, useEffect } from "react";
import "../Quiz/Quiz.css";

const Quiz = () => {
  const quizzes = [
    {
      id: 1,
      title: "Anxiety Test",
      link: "https://www.mind-diagnostics.org/anxiety-test",
      description: "Check your anxiety level.",
      className: "quiz-1",
    },
    {
      id: 2,
      title: "Depression Test",
      link: "https://www.mind-diagnostics.org/depression-test",
      description: "Check your depression level.",
      className: "quiz-2",
    },
    {
      id: 3,
      title: "Character Strengths",
      link: "https://www.viacharacter.org",
      description: "Discover your character strengths.",
      className: "quiz-3",
    },
    {
      id: 4,
      title: "Happiness Score",
      link: "https://www.authentichappiness.sas.upenn.edu/testcenter",
      description: "Find your happiness score.",
      className: "quiz-4",
    },
    {
      id: 5,
      title: "PCOS Symptoms",
      link: "https://ubiehealth.com/qa/start?slug=polycystic-ovarian-syndrome-pcos&name=Polycystic+Ovarian+Syndrome+%28PCOS%29&diseaseUuid=56d41276-0755-45b1-b0f8-d5954496ab13",
      description: "Check your PCOS symptoms (for women).",
      className: "quiz-5",
    },
  ];

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  // Preload background images
  useEffect(() => {
    const preloadImages = () => {
      quizzes.forEach((quiz) => {
        const img = new Image();
        img.src = getComputedStyle(document.documentElement).getPropertyValue(
          `--${quiz.className}-bg`
        );
      });
    };
    preloadImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuizIndex((prevIndex) => (prevIndex + 1) % quizzes.length);
    }, 10000); // Transition every 10 seconds

    return () => clearInterval(interval);
  }, [quizzes.length]);

  const currentQuiz = quizzes[currentQuizIndex];

  return (
    <div className={`quiz-container ${currentQuiz.className}`}>
      <div className="quiz-overlay"></div>
      <div className="quiz-content">
        <h1>{currentQuiz.title}</h1>
        <p>{currentQuiz.description}</p>
        <a href={currentQuiz.link} target="_blank" rel="noopener noreferrer">
          <button>Take the Test</button>
        </a>
      </div>
    </div>
  );
};

export default Quiz;
