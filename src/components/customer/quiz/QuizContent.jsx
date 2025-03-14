import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../constants/localStorageName";
import "./QuizContent.css";

const Modal = ({ isOpen, onClose, skinTypeData, issueSkinData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content1">
        {skinTypeData && (
          <>
            <h2>{skinTypeData.name}</h2>
            <p>{skinTypeData.description}</p>
          </>
        )}
        {issueSkinData && issueSkinData.length > 0 && (
          <>
            <h2>Skin Issues</h2>
            {issueSkinData.map((issue, index) => (
              <div key={index} className="issue-item">
                <h3>{issue.name}</h3>
                <p>
                  <strong>Cause:</strong> {issue.cause}
                </p>
                <p>
                  <strong>Description:</strong> {issue.description}
                </p>
              </div>
            ))}
          </>
        )}
        <button className="modal-button" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
};

const QuizContent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountId, setAccountId] = useState(null);
  const [customerAnswers, setCustomerAnswers] = useState([]);
  const [apiResponses, setApiResponses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [skinTypeData, setSkinTypeData] = useState(null);
  const [issueSkinData, setIssueSkinData] = useState(null);
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [customer] = useLocalStorage(
    LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE,
    ""
  );
  const navigate = useNavigate();
  const servicesRef = useRef(null);

  useEffect(() => {
    if (customer) {
      try {
        const token = customer;
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join("")
        );

        const decodedData = JSON.parse(jsonPayload);
        setAccountId(decodedData.accountId);
      } catch (error) {
        console.error("Invalid JWT Token", error);
      }
    }
  }, [customer]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const typeResponse = await fetch(
          "http://localhost:8080/type-question/get-all"
        );
        const typeData = await typeResponse.json();
        const typeIds = typeData.data.map((type) => type.id);

        const quizPromises = typeIds.map((id) =>
          fetch(`http://localhost:8080/quiz/getQuizByTypeQuestion/${id}`).then(
            (res) => res.json()
          )
        );
        const quizResponses = await Promise.all(quizPromises);

        const allQuestions = quizResponses
          .flatMap((response, index) =>
            response.data.map((quiz) =>
              quiz.quizTestResponseDTOList.map((question) => ({
                ...question,
                typeId: typeIds[index],
                quizId: quiz.quizId,
              }))
            )
          )
          .flat();

        console.log("Fetched Questions:", allQuestions);
        setQuestions(allQuestions);
        setAnswers(Array(allQuestions.length).fill(null));
        setCustomerAnswers(Array(allQuestions.length).fill(null));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const handleAnswer = (selectedAnswerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswerIndex;
    setAnswers(newAnswers);

    const question = questions[currentQuestion];
    const customerAnswer = {
      questionId: question.questionId,
      question: question.question,
      answer: question.answers[selectedAnswerIndex].answer,
    };
    const newCustomerAnswers = [...customerAnswers];
    newCustomerAnswers[currentQuestion] = customerAnswer;
    setCustomerAnswers(newCustomerAnswers);

    console.log(
      `Customer selected for Question ${currentQuestion + 1}:`,
      customerAnswer
    );
  };

  const postQuizResults = async (typeId, startIndex, endIndex) => {
    const quizAnswerResult = questions
      .slice(startIndex, endIndex)
      .map((question, index) => ({
        questionId: question.questionId,
        answer: question.answers[answers[startIndex + index]].answer,
      }));

    const payload = {
      quizId: typeId,
      accountId: accountId,
      quiz_answer_result: quizAnswerResult,
    };

    console.log(
      `Payload sent to BE for type ${typeId}:`,
      JSON.stringify(payload, null, 2)
    );

    const url =
      typeId === 1
        ? "http://localhost:8080/skinType/getSkinTypeByAnswer"
        : "http://localhost:8080/issue-skin/getIssuesSkinByAnswer";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      console.log(`API response for type ${typeId}:`, result);
      setApiResponses((prev) => [
        ...prev,
        { typeId, payload, response: result },
      ]);

      if (result.status === 200 && result.data) {
        if (typeId === 1) {
          setSkinTypeData(result.data);
          setIssueSkinData(null);
        } else {
          setIssueSkinData(result.data);
          setSkinTypeData(null);
        }
        setShowModal(true);
      }
    } catch (error) {
      console.error(`Error posting quiz results for type ${typeId}:`, error);
    }
  };

  const fetchRecommendedServices = async () => {
    const quizResultDTOs = apiResponses.map((response) => ({
      quizId: response.typeId,
      accountId: accountId,
      quiz_answer_result: response.payload.quiz_answer_result,
    }));

    const payload = {
      quizResultDTOs,
    };

    console.log(
      "Payload sent to service API:",
      JSON.stringify(payload, null, 2)
    );

    try {
      const response = await fetch(
        "http://localhost:8080/service/getServiceByIssueSkinAndSkinType?page=0&size=10",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();

      console.log("Recommended Services:", result);
      if (result.status === 200 && result.data) {
        setRecommendedServices(result.data);
        console.log("Set Recommended Services:", result.data);
      }
    } catch (error) {
      console.error("Error fetching recommended services:", error);
    }
  };

  const handleNext = () => {
    const currentTypeId = questions[currentQuestion].typeId;
    const nextQuestionIndex = currentQuestion + 1;

    if (nextQuestionIndex < questions.length) {
      const nextTypeId = questions[nextQuestionIndex].typeId;

      if (currentTypeId !== nextTypeId) {
        const startIndex = questions
          .slice(0, currentQuestion + 1)
          .findIndex((q) => q.typeId === currentTypeId);
        postQuizResults(currentTypeId, startIndex, currentQuestion + 1);
      }
      setCurrentQuestion(nextQuestionIndex);
    } else {
      const startIndex = questions
        .slice(0, currentQuestion + 1)
        .findIndex((q) => q.typeId === currentTypeId);
      postQuizResults(currentTypeId, startIndex, currentQuestion + 1).then(
        () => {
          setQuizCompleted(true);
          fetchRecommendedServices();
          setTimeout(() => {
            servicesRef.current.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
      );
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 2;

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCount >= recommendedServices.length ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? recommendedServices.length - visibleCount
        : prevIndex - 1
    );
  };

  const closeModal = () => {
    setShowModal(false);
    setSkinTypeData(null);
    setIssueSkinData(null);
  };

  const handleSeeMore = (serviceId) => {
    console.log("Service ID clicked:", serviceId);
    if (!serviceId) {
      console.error("Service ID is undefined or null");
      return;
    }
    localStorage.setItem("selectedServiceId", serviceId);
    navigate("/customer-service/service-details");
  };

  if (loading) {
    return <div>Loading quiz data...</div>;
  }

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
                  {questions[currentQuestion].question}
                </h3>
              </div>

              <div className="answer-section">
                <p className="answer-instruction">
                  Choose one answer that most applies to you
                </p>

                <div className="options-container">
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <div
                      key={answer.id}
                      className={`option-item ${
                        answers[currentQuestion] === index ? "selected" : ""
                      }`}
                      onClick={() => handleAnswer(index)}
                    >
                      <span className="option-number">{index + 1}</span>
                      <span className="option-text">{answer.answer}</span>
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
        <div ref={servicesRef} className="service-carousel-container">
          <h6 className="results-title">Recommended Services For You</h6>
          {recommendedServices.length > 0 ? (
            <div className="gallery-container">
              <div className="main-image-container">
                <img
                  src={
                    recommendedServices[currentIndex]?.image?.length > 0
                      ? recommendedServices[currentIndex].image[0].url
                      : "https://via.placeholder.com/300"
                  }
                  alt={recommendedServices[currentIndex]?.name || "Service"}
                  className="main-image"
                />
                <div className="overlay" />

                <div className="title-container">
                  <h1 className="gallery-title">
                    {recommendedServices[currentIndex]?.name ||
                      "Unnamed Service"}
                  </h1>
                  <p className="gallery-description">
                    Price: $
                    {recommendedServices[currentIndex]?.total?.toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    ) || "N/A"}{" "}
                    <br />
                    {recommendedServices[currentIndex]?.description ||
                      "No description available"}
                  </p>
                  <button
                    className="see-more-btn"
                    onClick={() =>
                      handleSeeMore(recommendedServices[currentIndex]?.id)
                    }
                  >
                    See more
                  </button>
                </div>

                <div className="thumbnails-container">
                  {recommendedServices
                    .slice(currentIndex, currentIndex + visibleCount)
                    .map((service, index) => (
                      <div
                        key={service?.id || index}
                        className={`thumbnail-item ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        <img
                          src={
                            service?.image?.length > 0
                              ? service.image[0].url
                              : "https://via.placeholder.com/100"
                          }
                          alt={service?.name || "Thumbnail"}
                          className="thumbnail-image"
                          onClick={() => setCurrentIndex(currentIndex + index)}
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
          ) : (
            <p>Loading recommended services...</p>
          )}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        skinTypeData={skinTypeData}
        issueSkinData={issueSkinData}
      />
    </div>
  );
};

export default QuizContent;
