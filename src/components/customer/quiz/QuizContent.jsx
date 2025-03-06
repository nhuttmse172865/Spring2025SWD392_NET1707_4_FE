import React, { useState, useEffect, useRef } from "react";
import visa from "../../../assets/images/visa.png";
import skin1 from "../../../assets/images/skin1.jpg";
import skin2 from "../../../assets/images/skin2.jpg";
import skin3 from "../../../assets/images/skin3.jpg";
import other from "../../../assets/images/other.jpg";
import mastercard from "../../../assets/images/mastercard.jpg";
import banner_login from "../../../assets/images/banner_login.png";

import "./QuizContent.css";

const QuizContent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    "About how often did you feel tired out for no good reason?",
    "About how often did you feel nervous?",
    "About how often did you feel so nervous that nothing could calm you down?",
    "About how often did you feel hopeless?",
    "About how often did you feel restless or fidgety?",
    "About how often did you feel so restless you could not sit still?",
    "About how often did you feel depressed?",
    "About how often did you feel that everything was an effort?",
    "About how often did you feel so sad that nothing could cheer you up?",
    "About how often did you feel worthless?",
  ];

  const options = [
    "None of the time",
    "Some of the time",
    "Most of the time",
    "All of the time",
  ];

  const services = [
    {
      id: 1,
      name: "Deep Cleansing",
      category_id: 1,
      gap_day: 7,
      price: 500000,
      image: visa,
    },
    {
      id: 2,
      name: "Hydrating Facial",
      category_id: 1,
      gap_day: 10,
      price: 600000,
      image: skin1,
    },
    {
      id: 3,
      name: "Anti-Acne Facial",
      category_id: 1,
      gap_day: 14,
      price: 550000,
      image: skin2,
    },
    {
      id: 4,
      name: "Body Scrub",
      category_id: 2,
      gap_day: 7,
      price: 400000,
      image: skin3,
    },
    {
      id: 5,
      name: "Aromatherapy Massage",
      category_id: 2,
      gap_day: 14,
      price: 700000,
      image: other,
    },
    {
      id: 6,
      name: "Slimming Treatment",
      category_id: 2,
      gap_day: 21,
      price: 800000,
      image: mastercard,
    },
    {
      id: 7,
      name: "Hair Strengthening",
      category_id: 3,
      gap_day: 14,
      price: 650000,
      image: banner_login,
    },
    {
      id: 8,
      name: "Dandruff Treatment",
      category_id: 3,
      gap_day: 10,
      price: 450000,
      image: skin1,
    },
    {
      id: 9,
      name: "Scalp Detox",
      category_id: 3,
      gap_day: 7,
      price: 480000,
      image: skin1,
    },
  ];

  const handleAnswer = (selectedAnswerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setTimeout(() => {
        servicesRef.current.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isQuestionAnswered = (index) => {
    return answers[index] !== null;
  };

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [services.length]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const servicesRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 2; 

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCount >= services.length ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - visibleCount : prevIndex - 1
    );
  };

  return (
    <div className="app-container">
      <div className="content">
        <div className="questionnaire-container">
          <div className="breadcrumb">
            <span className="lesson-title">
              Take Quiz To Recommend Service For You
            </span>
          </div>

          <div className="progress-tracker">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`progress-step ${
                  isQuestionAnswered(index) ? "completed" : ""
                } ${
                  index === currentQuestion && !quizCompleted ? "current" : ""
                }`}
              >
                {isQuestionAnswered(index) ? "✓" : index + 1}
              </div>
            ))}
          </div>

          <div className="question-section">
            <div className="question-container">
              <div className="question-header">
                <span className="question-number">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <h3 className="question-text">
                  {questions[currentQuestion]}
                </h3>
              </div>

              <div className="answer-section">
                <p className="answer-instruction">
                  Choose one answer that most applies to you
                </p>

                <div className="options-container">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className={`option-item ${
                        answers[currentQuestion] === index ? "selected" : ""
                      }`}
                      onClick={() => handleAnswer(index)}
                    >
                      <span className="option-number">{index + 1}</span>
                      <span className="option-text">{option}</span>
                      <input
                        type="radio"
                        name={`question-${currentQuestion}`}
                        checked={answers[currentQuestion] === index}
                        onChange={() => handleAnswer(index)}
                        className="radio-input"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="navigation-buttons">
                {currentQuestion > 0 && (
                  <button className="prev-button" onClick={handlePrevious}>
                    Previous Question
                  </button>
                )}
                <button
                  className="next-button"
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === null}
                >
                  {currentQuestion < questions.length - 1
                    ? "Next Question →"
                    : "Finish Quiz →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {quizCompleted && (
        <div
          ref={servicesRef}
          className="service-carousel-container"
          style={{ transition: "transform 1s ease-in-out" }}
        >
          <h6 className="results-title">Recommended Services For You</h6>
          <div className="gallery-container">
            <div className="main-image-container">
              <img
                src={services[currentIndex].image}
                alt={services[currentIndex].name}
                className="main-image"
              />
              <div className="overlay" />

              <div className="title-container">
                <h1 className="gallery-title">{services[currentIndex].name}</h1>
                <p className="gallery-description">
                  Price: {services[currentIndex].price.toLocaleString()} VND
                </p>
                <button className="see-more-btn">See more</button>
              </div>

              <div className="thumbnails-container">
                {services
                  .slice(currentIndex, currentIndex + visibleCount)
                  .map((service, index) => (
                    <div
                      key={service.id}
                      className={`thumbnail-item ${
                        index === currentIndex ? "active" : ""
                      }`}
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className="thumbnail-image"
                        onClick={() => setCurrentIndex(index)}
                      />
                      <div className="thumbnail-overlay" />
                    </div>
                  ))}
              </div>
            </div>
            <div className="navigation-buttons1">
              <button onClick={prevImage} className="nav-button">
                <svg
                  className="nav-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button onClick={nextImage} className="nav-button">
                <svg
                  className="nav-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizContent;
