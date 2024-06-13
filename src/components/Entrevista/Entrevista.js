import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import noBtnImg from "../../assets/img/images/noBtn.webp";
import siBtnImg from "../../assets/img/images/SiBtn.webp";
import correctAnswerImg from "../../assets/img/images/correctAnswer.webp";
import ansSelectImg from "../../assets/img/images/Flecha.webp";
import Revisar from "../../assets/img/images/revisar.webp";
import Salir from "../../assets/img/images/salirExamenes.webp";
import Progressbar from "../ExamenesHelpers/Progressbar";
import correctImg from "../../assets/img/images/green.webp";
import wrongImg from "../../assets/img/images/red.webp";
import nullImg from "../../assets/img/images/grey.webp";
import answerImg1 from "../../assets/img/images/blue.webp";
import noSelect from "../../assets/img/images/transparent.webp";
import golden from "../../assets/img/images/golden.webp";
import pauseImg from "../../assets/img/images/pause.webp";
import stopImg from "../../assets/img/images/stop.webp";
import RepasoNotDone from "../../assets/img/images/Iconorepaso.webp";
import RepasoDone from "../../assets/img/images/repasouncompleted.webp";
import { getLocalUserdata } from "../../services/auth/localStorageData";
import { Markup } from "interweave";
import Modal from "@mui/material/Modal";
import tick from "../../assets/img/images/tick.webp";
import cross from "../../assets/img/images/cross.webp";
import TextField from '@mui/material/TextField';
import useStyles from "./style";
import "./style.css";
import rejectIcon from "../../assets/img/images/rejectIcon.webp";
import iosRejectIcon from "../../assets/img/images/rejectIcon.png";
import iosAnsSelectImg from "../../assets/img/images/Flecha.png";
import iosRevisar from "../../assets/img/images/revisar.png";
import iosSalir from "../../assets/img/images/salirExamenes.png";
import iosNoBtnImg from "../../assets/img/images/noBtn.png";
import iosSiBtnImg from "../../assets/img/images/SiBtn.png";
import iosCorrectImg from "../../assets/img/images/green.png";
import iosWrongImg from "../../assets/img/images/red.png";
import iosNullImg from "../../assets/img/images/grey.png";
import iosAnswerImg1 from "../../assets/img/images/blue.png";
import iosNoSelect from "../../assets/img/images/transparent.png";
import iosGolden from "../../assets/img/images/golden.png";
import iosPauseImg from "../../assets/img/images/pause.png";
import iosCorrectAnswerImg from "../../assets/img/images/correctAnswer.png";
import iosStopImg from "../../assets/img/images/stop.png";
import iosTick from "../../assets/img/images/tick.png";
import iosCross from "../../assets/img/images/cross.png";
import iosRepasoNotDone from "../../assets/img/images/Iconorepaso.png";
import iosRepasoDone from "../../assets/img/images/repasouncompleted.png";

function Entrevista(props) {
  const Styles = useStyles();
  const [reason, setReason] = useState('');
  const [rejectQuestion, setRejectQuestion] = useState(false);
  const [rejectionData, setRejectionData] = useState([]);
  const [rejectionOption, setRejectionOption] = useState("");
  const [submission, setSubmission] = useState(false);
  const [showScreen, setShowScreen] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const [folderData, setFolderData] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [examData, setExamData] = useState([]);
  const [endExam, setEndExam] = useState([]);
  const [pauseExam, setPauseExam] = useState([]);
  const [examReviewData, setExamReviewData] = useState([]);
  const [showResultScreen, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [ansCheck, setAnsCheck] = useState(0);
  const [examStatusCheck, setExamStatusCheck] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ansArry, setAnsArry] = useState([]);
  const [totalLoading, setTotalLoading] = useState(0);
  const [stateRend, setStateRend] = useState(0);
  const [studentExamRecId, setStudentExamRecId] = useState(0);
  const [folderId, setFolderId] = useState(0);
  const [resetExam, setResetExam] = useState(false);

  const handleModalClose = () => setResetExam(false);
  let triggerTime;

  const data = getLocalUserdata();
  const student_type = data.type;
  const student_id = data.id;

  const getExamData = {
    studentId: student_id,
    studentType: student_type,
  };

  useEffect(() => {
    if (props.showExam === "true") {
      if (props.item.type === "repaso") {
        const data = {
          id: props.item.examId,
          studentExamRecordId: props.item.examRecordId,
          examDuration: props.item.examDuration,
          timeFrom: props.item.timeFrom,
        };
        const e = {
          id: data.id,
        };
        if (props.item.examStatus === "end") {
          reviewExam("", data);
        } else {
          startExams(e, data);
        }
      }
    }

    rejectOptions();
  }, []);

  // GET ALL EXAM FOLDERS API

  useEffect(() => {
    axios
      .post(`https://neoestudio.net/api/getAllPersonalityExams`, getExamData)
      .then((response) => {
        setFolderData(response.data.data);
        setShowScreen(true);
        setLoading(false);
        setFilesData(response.data.data);
        setListLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert("Exams List Not Available, Please Refresh The Page");
      });
  }, [stateRend]);

  const resetRepasoExam = () => {
    setListLoading(true);
    const resetExamData = {
      studentId: student_id,
      studentType: student_type,
      folderId: folderId,
      examId: studentExamRecId,
      isRestart: true,
    };
    setCurrentQuestion(0);
    setAnsCheck(0);
    axios
      .post(`https://neoestudio.net/api/getReviewFolderExams`, resetExamData)
      .then((response) => {
        setFilesData(response.data.data);
        setStateRend((prev) => prev + 1);
        setExamStatusCheck(true);
        setListLoading(false);
        setResetExam(false);
      })
      .catch((error) => {
        setListLoading(false);
        console.log(error, "Error Loading Reset Api, Please Try Again !");
      });
  };

  const [expanded, setExpanded] = useState();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // START EXAM API CALL

  const startExams = (e, Conocimientos, Inglés, Ortografía, Psicotécnicos) => {
    const ExamNO = e?.target?.id ? e.target.id : e.id;
    localStorage.setItem("examID", ExamNO);
    setLoading(true);
    const startData = {
      studentId: data.id,
      studentType: student_type,
      studentAnswered: null,
      studentAttemptId: null,
      tab: null,
      isRestart: examStatusCheck ? "yes" : "no",
      examId: localStorage.getItem("examID"),
      studentExamRecordId: Conocimientos
        ? Conocimientos.studentExamRecordId
        : Inglés
        ? Inglés.studentExamRecordId
        : Ortografía
        ? Ortografía.studentExamRecordId
        : Psicotécnicos.studentExamRecordId,
    };
    if (examStatusCheck === true) {
      setSecondsRemaining(
        Conocimientos
          ? Conocimientos.timeFrom
          : Inglés.timeFrom
          ? Ortografía.timeFrom
          : Psicotécnicos.timeFrom
      );
    } else {
      setSecondsRemaining(
        Conocimientos
          ? Conocimientos.examDuration
          : Inglés.examDuration
          ? Ortografía.examDuration
          : Psicotécnicos.examDuration
      );
    }
    setTotalLoading(
      Conocimientos
        ? Number(Conocimientos.timeFrom)
        : Number(Inglés.timeFrom)
        ? Number(Ortografía.timeFrom)
        : Number(Psicotécnicos.timeFrom)
    );
    axios
      .post(`https://neoestudio.net/api/startExam`, startData)
      .then((response) => {
        setAnsArry([]);
        for (let i = 0; i < response.data.data.length; i++) {
          setAnsArry((prevState) => [
            ...prevState,
            {
              answer: response.data.data[i].studentAnswered,
            },
          ]);
        }
        setExamData(response.data.data);
        setLoading(false);
        setStatus(true);
        setCurrentQuestion(0);
        setShowScreen(false);
        setShowExam(true);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error, "Error Loading, Please Try Again !");
      });
  };

  // END EXAM API CALL
  const ResultPage = () => {
    const endData = {
      studentExamRecordId: examData[currentQuestion].studentExamRecordId,
      time: secondsRemaining,
    };
    axios
      .post(`https://neoestudio.net/api/endExam`, endData)
      .then((response) => {
        setEndExam(response.data);
        setShowScore(true);
        axios
          .post(`https://neoestudio.net/api/SendSchedule`,{"studentId":data.id,"task":`Entrevista: ${response.data.examName}`,"type":"Entrevista"})
          .then((response) => {
            if(response.data.status==='Successfull') {
              console.log('added to schedule');
            }
            else {
              console.log('Could not add to schedule');
            }
          }).catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error, "Error Loading, Please Try Again !");
      });
  };

  // Pause EXAM API CALL
  const pauseAnswer = () => {
    const pauseData = {
      studentExamRecordId: examData[currentQuestion].studentExamRecordId,
      time: secondsRemaining,
    };
    axios
      .post(`https://neoestudio.net/api/pauseAnswer`, pauseData)
      .then((response) => {
        setPauseExam(response.data);
        if (response.data.data.canPause == "yes") {
          setExamStatusCheck(false);
          setStatus(false);
          if (props.showScreen === "false") {
            props.updateView();
          } else {
            setShowScreen(true);
          }
        } else {
          alert("You Cannot Pause This Exam");
        }
      })
      .catch((error) => {
        console.log(error, "Error Loading, Please Try Again !");
      });
  };

  // REVIEW EXAM API

  const reviewExam = (e, Conocimientos, Inglés, Ortografía, Psicotécnicos) => {
    setLoading(true);
    const reviewData = {
      studentExamRecordId: Conocimientos
        ? Conocimientos.studentExamRecordId
        : Inglés
        ? Inglés.studentExamRecordId
        : Ortografía
        ? Ortografía.studentExamRecordId
        : Psicotécnicos
        ? Psicotécnicos.studentExamRecordId
        : examData[currentQuestion].studentExamRecordId,
    };
    axios
      .post(`https://neoestudio.net/api/reviewExam`, reviewData)
      .then((response) => {
        setExamReviewData(response.data.data);
        setShowScreen(false);
        setShowExam(false);
        setShowScore(false);
        setShowResult(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "Not Loading Review Exam Data !");
      });
  };

  // SALIR BTN

  const SalirBtn = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setExpanded(false);
    setExamStatusCheck(false);
    setStateRend((prev) => prev + 1);
    if (props.showExam === "true") {
      props.updateView();
    } else {
      setShowScreen(true);
    }
    return SalirBtn;
  };

  // END QUIZ Icon

  const endQuiz = () => {
    setStatus(false);
    ResultPage();
    return endQuiz;
  };

  // TIMER
  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const twoDigits = (num) => String(num).padStart(2, "0");
  const [status, setStatus] = useState(false);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  const handleStart = () => {
    return pauseAnswer();
  };
  useInterval(
    () => {
      if (status == true && secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        endQuiz();
      }
    },
    status == true ? 1000 : null
  );

  useInterval(
    () => {
      if (status == true) {
        setProgress((secondsRemaining / totalLoading) * -100 + 100);
      } else {
        setProgress(0);
      }
    },
    status == true ? 1000 : null
  );

  let answerClicked;

  // NEXT QUESTION BUTTON

  const handleSetAnswer = (id) => {
    const startData = {
      studentId: data.id,
      studentType: student_type,
      studentAnswered: answerClicked,
      studentAttemptId: examData[currentQuestion].id,
      tab: null,
      Restart: "no",
      studentType: student_type,
      examId: localStorage.getItem("examID"),
      studentExamRecordId: parseInt(
        examData[currentQuestion].studentExamRecordId
      ),
    };
    setSecondsRemaining(secondsRemaining);
    axios
      .post(`https://neoestudio.net/api/startExam`, startData)
      .then((response) => {
        if (currentQuestion + 1 >= examData.length) {
          endQuiz();
        } else {
          setExamData(response.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error, "Error Loading, Please Try Again !");
      });
  };

  const sendRejection = (currentQuestion, rejectionOption) => {
    if(rejectionOption==="") {
      setSubmission(true);
    }
    else {
      const rejectionData = {
        description:reason,
        studentId:data.id,
        qaId:currentQuestion.qaId,
        selectedoption:rejectionOption,
      }
      axios
        .post(`https://neoestudio.net/api/questionqueries`, rejectionData)
        .then((response) => {
          toast.success("La impugnación ha sido enviada con éxito. Muchas gracias por tu colabración.");
        })
        .catch((error) => {
          console.log(error, "Error sending rejection");
          toast.error('Error al enviar en este momento, inténtalo de nuevo más tarde.');
        });
        closeRejectionForm();
    }
  }

  const closeRejectionForm = () => {
    setRejectQuestion(false);
    setRejectionOption('');
    setSubmission(false);
  }

  const rejectOptions = () => {
    axios.get(`https://neoestudio.net/api/rejectionoptions`)
      .then(res => {
        setRejectionData(res.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      {showScreen ? (
        <div>
          <main className={Styles.courseWrapper}>
            <Container maxWidth="lg">
              {/*<Grid container spacing={2}>
                <Grid item xs={3} md={3} className={Styles.topImgHeadWrapper}>
                  <img src={Conocimientos} srcSet={iosConocimientos} alt="" height={150} />
                  <div className={Styles.headingText}>Conocimientos</div>
                </Grid>
                <Grid item xs={3} md={3} className={Styles.topImgHeadWrapper}>
                  <img src={inglesImg} srcSet={iosInglesImg} alt="" height={150} />
                  <div className={Styles.headingText}>Ingles</div>
                </Grid>
                <Grid item xs={3} md={3} className={Styles.topImgHeadWrapper}>
                  <img src={psicoImg} srcSet={iosPsicoImg} alt="" height={150} />
                  <div className={Styles.headingText}>Psicotecnicos</div>
                </Grid>
                <Grid item xs={3} md={3} className={Styles.topImgHeadWrapper}>
                  <img src={ortoImg} srcSet={iosOrtoImg} alt="" height={150} />
                  <div className={Styles.headingText}>Ortografia</div>
                </Grid>
      </Grid>*/}
              <Modal
                open={resetExam}
                onClose={handleModalClose}
                aria-labelledby="reset-exam-modal"
                aria-describedby="reset-modal-description"
              >
                <Box className={Styles.modalStyle}>
                  <Typography
                    id="reset-exam-modal"
                    variant="h6"
                    component="h2"
                    sx={{ textAlign: "center" }}
                  >
                    ¿Quieres resetear este examen?
                  </Typography>
                  <div className="flex justify-between w-full">
                    <Button
                      size="medium"
                      onClick={() => {
                        resetRepasoExam();
                      }}
                    >
                      <img src={siBtnImg} srcSet={iosSiBtnImg} alt="" height={50} />
                    </Button>
                    <Button
                      size="medium"
                      onClick={() => {
                        setResetExam(false);
                      }}
                    >
                      <img src={noBtnImg} srcSet={iosNoBtnImg} alt="" height={50} />
                    </Button>
                  </div>
                </Box>
              </Modal>
              {loading ? (
                <div className="w-100 text-center">
                  <CircularProgress
                    style={{
                      width: "50px",
                      height: "50px",
                      margin: "90px",
                    }}
                  />
                  <h2>Cargando Exámenes Por favor, espera.</h2>
                </div>
              ) : (
                <>
                  {folderData.map((data, index) => {
                    const panel = data.name;
                    return (
                      <div className={Styles.folderWrapper}>
                            {listLoading ? (
                              <div className="w-100 text-center">
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    margin: "10px",
                                  }}
                                />
                              </div>
                            ) : (
                              <>
                                {filesData.map((data) => {
                                  return (
                                    <div className={Styles.dataWrapper}>
                                      <div>
                                        <div className={Styles.examLinks}>
                                          {data.studentExamStatus ===
                                          ("notAttempted"||"started") ? (
                                            <>
                                              <img
                                                src={RepasoNotDone}
                                                srcSet={iosRepasoNotDone}
                                                alt=""
                                                className={Styles.headingImg}
                                              />
                                              <button
                                                id={data.id}
                                                onClick={(e) =>
                                                  startExams(e, data)
                                                }
                                                style={{
                                                  fontFamily:
                                                    "ProximaSoft-regular",
                                                }}
                                              >
                                                {data.name}
                                              </button>
                                            </>
                                          ) : data.studentExamStatus ===
                                            "end" ? (
                                            <>
                                              <img
                                                src={RepasoDone}
                                                srcSet={iosRepasoDone}
                                                alt=""
                                                className={Styles.headingImg}
                                              />
                                              <button
                                                style={{
                                                  fontFamily:
                                                    "ProximaSoft-bold",
                                                }}
                                                onClick={(e) => {
                                                    reviewExam(e, data);
                                                }}
                                                onMouseDown={() => {
                                                  triggerTime = setTimeout(() => {
                                                      setStudentExamRecId(data.studentExamRecordId);
                                                      setFolderId(data.folderId);
                                                      setResetExam(true);
                                                  }, 1000); //Change 1000 to number of milliseconds required for mouse hold
                                                }}
                                                onMouseUp={() => {
                                                  clearTimeout(triggerTime);
                                                }}
                                              >
                                                {data.name}
                                              </button>
                                            </>
                                          ) : data.studentExamStatus === "paused" ?(
                                            <>
                                              <img
                                                src={RepasoNotDone}
                                                srcSet={iosRepasoNotDone}
                                                alt=""
                                                className={Styles.headingImg}
                                              />
                                              <button
                                                id={data.id}
                                                onClick={(e) =>
                                                  startExams(e, data)
                                                }
                                                style={{
                                                  fontFamily:
                                                    "ProximaSoft-regular",
                                                  color: "#0A52CB",
                                                  display: "flex",
                                                }}
                                              >
                                                {data.name}
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              <img
                                                src={RepasoNotDone}
                                                srcSet={iosRepasoNotDone}
                                                alt=""
                                                className={Styles.headingImg}
                                              />
                                              <button
                                                id={data.id}
                                                onClick={(e) =>
                                                  startExams(e, data)
                                                }
                                                style={{
                                                  fontFamily:
                                                    "ProximaSoft-regular",
                                                  display: "flex",
                                                }}
                                              >
                                                {data.name}
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </>
                            )}
                      </div>
                    );
                  })}
                </>
              )}
            </Container>
          </main>
        </div>
      ) : showResultScreen == true ? (
        <>
          <main className="flex">
            <Container maxWidth="xlg">
              <div className={Styles.quizEndWrapperInner}>
                <div className={Styles.timerWrapper}>
                  <div className="flex">
                    <img
                      alt=""
                      src={rejectIcon}
                      srcSet={iosRejectIcon}
                      className={Styles.timerIcons}
                      onClick={() => {setRejectQuestion(true)}}
                    />
                  </div>
                </div>
                <div>
                  <Modal
                    open={rejectQuestion}
                    onClose={closeRejectionForm}
                    aria-labelledby="reject-question-modal"
                    aria-describedby="reject-question-description"
                  >
                    <Box className={Styles.modalStyle} style={{width:'auto',height:'auto'}}>
                        <div>
                          <div style={{ fontFamily: "ProximaSoft-bold" }}>
                            <Markup content={rejectionData.Description} />
                          </div>
                          <div className={Styles.Options}>
                          {
                            rejectionData.Option1!==null?
                            <button
                              id="a"
                              value="a"
                              onClick={(e) => {
                                setRejectionOption("option1");
                              }}
                              className={Styles.answerLinks}
                            >
                              <div className={Styles.answerLinksInner1}>
                                {rejectionOption === "option1" ? (
                                  <img src={ansSelectImg} srcSet={iosAnsSelectImg} alt="" width={"80%"} />
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className={Styles.answerLinksInner2}>
                                <Markup
                                  content={rejectionData.Option1}
                                  width="90%"
                                />
                              </div>
                            </button>:<></>
                          }
                          {
                            rejectionData.Option2!==null?
                              <button
                                onClick={(e) => {
                                  setRejectionOption("option2");
                                }}
                                className={Styles.answerLinks}
                              >
                                <div className={Styles.answerLinksInner1}>
                                  {rejectionOption === "option2" ? (
                                    <img src={ansSelectImg} srcSet={iosAnsSelectImg} alt='' width={"80%"} />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className={Styles.answerLinksInner2}>
                                  <Markup content={rejectionData.Option2} />
                                </div>
                              </button>:<></>
                          }
                          {
                            rejectionData.Option3!==null?
                              <button
                                onClick={(e) => {
                                  setRejectionOption("option3")
                                }}
                                className={Styles.answerLinks}
                              >
                                <div className={Styles.answerLinksInner1}>
                                  {rejectionOption === "option3" ? (
                                    <img src={ansSelectImg} srcSet={iosAnsSelectImg} alt='' width={"80%"} />
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className={Styles.answerLinksInner2}>
                                  <Markup content={rejectionData.Option3} />
                                </div>
                              </button>:<></>
                          }
                          {
                            rejectionData.Option4!==null?
                              <button
                                onClick={(e) => {
                                  setRejectionOption("option4");
                                }}
                                className={Styles.answerLinks}
                              >
                                <div className={Styles.answerLinksInner1}>
                                  { rejectionOption === "option4" ? (
                                    <img src={ansSelectImg} srcSet={iosAnsSelectImg} alt="" width={"80%"} />
                                  )  : (
                                    ""
                                  )}
                                </div>
                                <div className={Styles.answerLinksInner2}>
                                  <Markup content={rejectionData.Option4} />
                                </div>
                              </button>:<></>
                          }
                          </div>
                          <div className='text-red-600 text-xs'>
                            {submission&&rejectionOption===""?"¡Por favor selecciona una opcion!":""}
                          </div>
                          <div className="flex justify-center">
                            <TextField
                              id="outlined-multiline-static"
                              multiline
                              rows={4}
                              label="Explica con detalle qué es lo que se debe corregir."
                              className={Styles.answerLinksInner2}
                              onChange={(event) => {setReason(event.target.value)}} //whenever the text field change, you save the value in state
                            />
                          </div>
                        </div>
                        <br/>
                        <div className="flex justify-between w-full">
                          <Button variant="contained" size="medium" onClick={closeRejectionForm}>
                            Cancelar
                          </Button>
                          <Button variant="contained" size="medium" onClick={() => sendRejection(examReviewData[currentQuestion],rejectionOption)}>
                            Enviar
                          </Button>
                        </div>
                    </Box>
                  </Modal>
                  <div style={{ fontFamily: "ProximaSoft-bold" }}>
                    <Markup
                      content={examReviewData[currentQuestion].question}
                    />
                  </div>
                  <div>
                    <img
                      src={examReviewData[currentQuestion].image}
                      alt=""
                      width="50%"
                    />
                  </div>
                  <div className={Styles.Options}>
                    <button className={Styles.answerLinks}>
                      <div className={Styles.answerLinksInner3}>
                        {examReviewData[currentQuestion].status == "correct" &&
                        examReviewData[currentQuestion].correct.includes("a") ? (
                          <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].correct.includes("a") ? (
                          <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "a" ? (
                          <img src={cross} srcSet={iosCross} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status ==
                            "notAttempted" &&
                          examReviewData[currentQuestion].correct.includes("a") ? (
                          <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "answer1" ? (
                          <img src={cross} srcSet={iosCross} alt="" style={{ width: "40px" }} />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={Styles.answerLinksInner2}>
                        <Markup
                          content={examReviewData[currentQuestion].answer1}
                          width="90%"
                        />
                      </div>
                    </button>
                    <button className={Styles.answerLinks}>
                      <div className={Styles.answerLinksInner3}>
                        {examReviewData[currentQuestion].status == "correct" &&
                        examReviewData[currentQuestion].correct.includes("b") ? (
                          <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].correct.includes("b") ? (
                          <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "b" ? (
                          <img src={cross} srcSet={iosCross} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status ==
                            "notAttempted" &&
                          examReviewData[currentQuestion].correct.includes("b") ? (
                          <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "answer2" ? (
                          <img src={cross} srcSet={iosCross} alt="" style={{ width: "40px" }} />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={Styles.answerLinksInner2}>
                        <Markup
                          content={examReviewData[currentQuestion].answer2}
                        />
                      </div>
                    </button>
                    <button className={Styles.answerLinks}>
                      <div className={Styles.answerLinksInner3}>
                        {examReviewData[currentQuestion].status == "correct" &&
                        examReviewData[currentQuestion].correct.includes("c") ? (
                          <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].correct.includes("c") ? (
                          <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "c" ? (
                          <img src={cross} srcSet={iosCross} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status ==
                            "notAttempted" &&
                          examReviewData[currentQuestion].correct.includes("c") ? (
                          <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "answer3" ? (
                          <img src={cross} srcSet={iosCross} alt="" style={{ width: "40px" }} />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={Styles.answerLinksInner2}>
                        <Markup
                          content={examReviewData[currentQuestion].answer3}
                        />
                      </div>
                    </button>
                    <button className={Styles.answerLinks}>
                      <div className={Styles.answerLinksInner3}>
                        {examReviewData[currentQuestion].status == "correct" &&
                        examReviewData[currentQuestion].correct.includes("d") ? (
                          <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].correct.includes("d") ? (
                          <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "d" ? (
                          <img src={cross} srcSet={iosCross} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status ==
                            "notAttempted" &&
                          examReviewData[currentQuestion].correct.includes("d") ? (
                          <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "answer4" ? (
                          <img src={cross} srcSet={iosCross} alt="" style={{ width: "40px" }} />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={Styles.answerLinksInner2}>
                        <Markup
                          content={examReviewData[currentQuestion].answer4}
                        />
                      </div>
                    </button>
                  </div>
                  <div
                    className="m-4"
                    style={{
                      fontFamily: "ProximaSoft-regular",
                    }}
                  >
                    <Markup
                      content={examReviewData[currentQuestion].description}
                    />
                  </div>
                  <div className="w-50 text-center m-auto">
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (props.showExam === "true") {
                          props.updateView();
                        } else {
                          setShowScreen(true);
                        }
                        setShowResult(false);
                        setShowScore(false);
                        setExamStatusCheck(false);
                      }}
                    >
                      Volver a Exámenes
                    </Button>
                  </div>
                </div>
                <div className={Styles.resultBtnWrapper}>
                  {examReviewData.map((data, index) => {
                    return (
                      <div
                        style={{
                          margin: "3px",
                        }}
                      >
                        <button
                          className={Styles.resultBtn}
                          onClick={() => {
                            setCurrentQuestion(index);
                          }}
                          style={{
                            backgroundImage:
                              currentQuestion == index
                                ? `url(${golden}),url(${iosGolden})`
                                : data.status == "notAttempted"
                                ? `url(${nullImg}), url(${iosNullImg})`
                                : data.status == "wrong"
                                ? `url(${wrongImg}),url(${iosWrongImg})`
                                : `url(${correctImg}),url(${iosCorrectImg})`,
                          }}
                        >
                          {index + 1}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Container>
          </main>
        </>
      ) : showScore == true ? (
        <main className={Styles.wrapperMain}>
          <Container maxWidth="xlg">
            <h1 className={Styles.examenesHeading3}>{endExam.examName}</h1>
            <Grid container spacing={1} marginTop={10}>
              <Grid item xs={12} md={4} className={Styles.ResultWrappers}>
                <div className={Styles.innerResultWrapper}>
                  <p className={Styles.resultData}>
                    Tiempo:
                    <span className={Styles.resultDataBold}>
                      {endExam.examDuration} / {endExam.totalTime}
                    </span>
                  </p>
                  <p className={Styles.resultData}>
                    Aciertos:
                    <span className={Styles.resultDataBold}>
                      {endExam.correctCount}
                    </span>
                  </p>
                  <p className={Styles.resultData}>
                    Fallos:
                    <span className={Styles.resultDataBold}>
                      {endExam.wrongCount}
                    </span>
                  </p>
                  <p className={Styles.resultData}>
                    Nulos:
                    <span className={Styles.resultDataBold}>
                      {endExam.nonAttemptedCount}
                    </span>
                  </p>
                  <p
                    className={Styles.resultData}
                    style={{ marginTop: "30px" }}
                  >
                    Puntos:
                    <span className={Styles.resultDataBold}>
                      {endExam.score}
                    </span>
                  </p>
                  <p
                    style={{
                      marginTop: "10px",
                      textAlign: "center",
                      fontWeight: 600,
                      fontSize: "25px",
                    }}
                  >
                    {endExam.result}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12} md={4} className={Styles.ResultWrappers}>
                <div className={Styles.progressBarWrapper}>
                  <Progressbar
                    bgcolor={`linear-gradient(to bottom, rgba(17,148,47,1), rgba(106,170,101,1))`}
                    progress={endExam.correctPercentage.toFixed(1)}
                  />
                  <img src={tick} srcSet={iosTick} alt='' style={{ width: "40px" }} />
                </div>
                <div className={Styles.progressBarWrapper}>
                  <Progressbar
                    bgcolor={`linear-gradient(to bottom, rgba(206,8,17,1), rgba(222,110,81,1))`}
                    progress={endExam.wrongPercentage.toFixed(1)}
                  />
                  <img src={cross} srcSet={iosCross} alt='' style={{ width: "40px" }} />
                </div>
                <div className={Styles.progressBarWrapper}>
                  <Progressbar
                    bgcolor={`linear-gradient(to top, rgba(47,49,47,1), rgba(119,118,119,1))`}
                    progress={endExam.nullPercentage.toFixed(1)}
                  />
                  <h3 style={{ fontSize: "25px" }}>Nulos</h3>
                </div>
              </Grid>
              <Grid item xs={12} md={4} className={Styles.ResultWrappers}>
                <div className={Styles.resultBtnMain}>
                  <button className={Styles.revisarBtn} onClick={reviewExam}>
                    <img src={Revisar} srcSet={iosRevisar} alt="Revisar Button" width={"350px"} />
                  </button>
                  <button className={Styles.salirBtn} onClick={SalirBtn}>
                    <img src={Salir} srcSet={iosSalir} alt="Salir Button" width={"350px"} />
                  </button>
                </div>
              </Grid>
            </Grid>

            <div className={Styles.resultBtnWrapper}>
              {endExam.answersArray.map((data, index) => {
                return (
                  <div
                    style={{
                      margin: "3px",
                    }}
                  >
                    <button
                      className={Styles.resultBtn}
                      style={{
                        backgroundImage:
                          data == "notAttempted"
                            ? `url(${nullImg}),url(${iosNullImg})`
                            : data == "correct"
                            ? `url(${correctImg}),url(${iosCorrectImg})`
                            : `url(${wrongImg}),url(${iosWrongImg})`,
                      }}
                    >
                      {index + 1}
                    </button>
                  </div>
                );
              })}
            </div>
          </Container>
        </main>
      ) : showExam == true ? (
        <>
          <div>
            <main className={Styles.wrapperMain1}>
              <Container maxWidth="xlg">
                <div className={Styles.quizWrapperInner}>
                  <div className={Styles.timerWrapper}>
                    {/* Timer STARTS HERE                      */}
                    <div className={Styles.timerWrapper}>
                      <div className="flex">
                        <img
                          src={pauseImg}
                          srcSet={iosPauseImg}
                          className={Styles.timerIcons}
                          onClick={handleStart}
                          alt=''
                        />
                        <img
                          src={stopImg}
                          srcSet={iosStopImg}
                          alt=''
                          className={Styles.timerIcons}
                          onClick={endQuiz}
                        />
                        <img
                          src={correctAnswerImg}
                          srcSet={iosCorrectAnswerImg}
                          alt=''
                          className={Styles.timerIcons}
                          onClick={() => {
                            ansArry.splice(ansCheck, 1, {
                              answer:
                                examData[currentQuestion].correct.includes("a")
                                  ? "answer1"
                                  : examData[currentQuestion].correct.includes("b")
                                  ? "answer2"
                                  : examData[currentQuestion].correct.includes("c")
                                  ? "answer3"
                                  : examData[currentQuestion].correct.includes("d")
                                  ? "answer4"
                                  : answerClicked,
                              showDescript: true,
                            });
                            return handleSetAnswer();
                          }}
                        />
                      </div>
                      <div className="flex text-xl timer-text">
                        Tiempo:
                        <h2
                          className={Styles.timerHeading}
                          style={{ fontFamily: "ProximaSoft-bold" }}
                        >
                          {twoDigits(minutesToDisplay)}:
                          {twoDigits(secondsToDisplay)}
                        </h2>
                        min
                      </div>
                    </div>
                    {/* Timer Ends Here                      */}
                  </div>
                  <div>
                    <div style={{ fontFamily: "ProximaSoft-bold" }}>
                      <Markup content={examData[currentQuestion].question} />
                    </div>
                    <div>
                      <img
                        src={
                          currentQuestion == ansCheck
                            ? examData[currentQuestion].image
                            : ""
                        }
                        alt=""
                        width="50%"
                      />
                    </div>
                    <div className={Styles.Options}>
                      <button
                        id="a"
                        value="a"
                        onClick={(e) => {
                          setLoading(true);
                          if (
                            (currentQuestion == ansCheck &&
                              ansArry[currentQuestion].answer == "answer1") ||
                            examData[currentQuestion].studentAnswered ==
                              "answer1"
                          ) {
                            answerClicked = null;
                            handleSetAnswer("null");
                          } else {
                            answerClicked = "answer1";
                            handleSetAnswer("answer1");
                          }
                          ansArry.splice(ansCheck, 1, {
                            answer: answerClicked,
                            showDescript: false,
                          });
                        }}
                        className={Styles.answerLinks}
                      >
                        <div className={Styles.answerLinksInner1}>
                          {ansArry[currentQuestion].answer == "answer1" &&
                          currentQuestion == ansCheck &&
                          ansArry[currentQuestion].showDescript != true ? (
                            <img src={ansSelectImg} srcSet={iosAnsSelectImg} alt='' width={"80%"} />
                          ) : ansArry[currentQuestion].showDescript === true &&
                            examData[currentQuestion].correct.includes("a") ? (
                            <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                          ) : ansArry[currentQuestion].showDescript === true &&
                            examData[currentQuestion].studentAnswered ==
                              "answer1" &&
                            !examData[currentQuestion].correct.includes("a") ? (
                            <img src={cross} srcSet={iosCross} alt="" style={{ width: "40px" }} />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className={Styles.answerLinksInner2}>
                          <Markup
                            content={examData[currentQuestion].answer1}
                            width="90%"
                          />
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          setLoading(true);
                          if (
                            (ansArry[currentQuestion].answer == "answer2" &&
                              currentQuestion == ansCheck) ||
                            examData[currentQuestion].studentAnswered ==
                              "answer2"
                          ) {
                            answerClicked = null;
                            handleSetAnswer("null");
                          } else {
                            answerClicked = "answer2";
                            handleSetAnswer("answer2");
                          }
                          ansArry.splice(ansCheck, 1, {
                            answer: answerClicked,
                            showDescript: false,
                          });
                        }}
                        className={Styles.answerLinks}
                      >
                        <div className={Styles.answerLinksInner1}>
                          {ansArry[currentQuestion].answer == "answer2" &&
                          currentQuestion == ansCheck &&
                          ansArry[currentQuestion].showDescript != true ? (
                            <img src={ansSelectImg} srcSet={iosAnsSelectImg} alt='' width={"80%"} />
                          ) : ansArry[currentQuestion].showDescript === true &&
                            examData[currentQuestion].correct.includes("b") ? (
                            <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                          ) : ansArry[currentQuestion].showDescript === true &&
                            examData[currentQuestion].studentAnswered ==
                              "answer2" &&
                            !examData[currentQuestion].correct.includes("b") ? (
                            <img src={cross} srcSet={iosCross} alt="" style={{ width: "40px" }} />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className={Styles.answerLinksInner2}>
                          <Markup content={examData[currentQuestion].answer2} />
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          setLoading(true);
                          if (
                            (ansArry[currentQuestion].answer == "answer3" &&
                              currentQuestion == ansCheck) ||
                            examData[currentQuestion].studentAnswered ==
                              "answer3"
                          ) {
                            answerClicked = null;
                            handleSetAnswer("null");
                          } else {
                            answerClicked = "answer3";
                            handleSetAnswer("answer3");
                          }
                          ansArry.splice(ansCheck, 1, {
                            answer: answerClicked,
                            showDescript: false,
                          });
                        }}
                        className={Styles.answerLinks}
                      >
                        <div className={Styles.answerLinksInner1}>
                          {ansArry[currentQuestion].answer == "answer3" &&
                          currentQuestion == ansCheck &&
                          ansArry[currentQuestion].showDescript != true ? (
                            <img src={ansSelectImg} srcSet={iosAnsSelectImg} alt="" width={"80%"} />
                          ) : ansArry[currentQuestion].showDescript === true &&
                            examData[currentQuestion].correct.includes("c") ? (
                            <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                          ) : ansArry[currentQuestion].showDescript === true &&
                            examData[currentQuestion].studentAnswered ==
                              "answer3" &&
                            !examData[currentQuestion].correct.includes("c") ? (
                            <img src={cross} srcSet={iosCross} alt="" style={{ width: "40px" }} />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className={Styles.answerLinksInner2}>
                          <Markup content={examData[currentQuestion].answer3} />
                        </div>
                      </button>
                      <button
                        onClick={(e) => {
                          setLoading(true);
                          if (
                            (ansArry[currentQuestion].answer == "answer4" &&
                              currentQuestion == ansCheck) ||
                            examData[currentQuestion].studentAnswered ==
                              "answer4"
                          ) {
                            answerClicked = null;
                            handleSetAnswer("null");
                          } else {
                            answerClicked = "answer4";
                            handleSetAnswer("answer4");
                          }
                          ansArry.splice(ansCheck, 1, {
                            answer: answerClicked,
                            showDescript: false,
                          });
                        }}
                        className={Styles.answerLinks}
                      >
                        <div className={Styles.answerLinksInner1}>
                          {ansArry[currentQuestion].answer == "answer4" &&
                          currentQuestion == ansCheck &&
                          ansArry[currentQuestion].showDescript != true ? (
                            <img src={ansSelectImg} srcSet={iosAnsSelectImg} alt='' width={"80%"} />
                          ) : ansArry[currentQuestion].showDescript === true &&
                            examData[currentQuestion].correct.includes("d") ? (
                            <img src={tick} srcSet={iosTick} alt="" style={{ width: "40px" }} />
                          ) : ansArry[currentQuestion].showDescript === true &&
                            examData[currentQuestion].studentAnswered ==
                              "answer4" &&
                            !examData[currentQuestion].correct.includes("d") ? (
                            <img src={cross} srcSet={iosCross} alt="" style={{ width: "40px" }} />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className={Styles.answerLinksInner2}>
                          <Markup content={examData[currentQuestion].answer4} />
                        </div>
                      </button>
                    </div>
                  </div>
                  {ansArry[currentQuestion].showDescript === true ? (
                    <div
                      className="m-8"
                      style={{
                        fontFamily: "ProximaSoft-regular",
                      }}
                    >
                      <Markup content={examData[currentQuestion].description} />
                    </div>
                  ) : (
                    ""
                  )}
                  <div>
                    <div className={Styles.resultBtnWrapper}>
                      {ansArry.map((data, index) => {
                        return (
                          <div
                            style={{
                              margin: "3px",
                            }}
                          >
                            <button
                              onClick={() => {
                                setCurrentQuestion(index);
                                setAnsCheck(index);
                              }}
                              className={`${Styles.resultBtn} noAnswer`}
                              style={{
                                backgroundImage:
                                  currentQuestion == index
                                    ? `url(${golden}),url(${iosGolden})`
                                    : data.answer == null || data.answer == "null"
                                    ? `url(${noSelect}),url(${iosNoSelect})`
                                    : `url(${answerImg1}),url(${iosAnswerImg1})`,
                              }}
                            >
                              {index + 1}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      style={{
                        transition: "transform .04s ease",
                      }}
                    />
                  </div>
                </div>
                {loading ? (
                  <div className="w-100 text-center">
                    <CircularProgress
                      style={{
                        width: "60px",
                        height: "60px",
                        margin: "10px",
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </Container>
            </main>
          </div>
        </>
      ) : (
        <>
          <h2>Internet Connection Error - Please Reload The Page !</h2>
        </>
      )}
    </>
  );
}
export default Entrevista;
