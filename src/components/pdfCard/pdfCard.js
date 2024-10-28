import React, { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { getLocalUserdata } from "../../services/auth/localStorageData";
import userServices from "services/httpService/userAuth/userServices";
import { toast } from "react-toastify";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PdfCard = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [fileName, setFileName] = useState(props.fileName);
  const [title, setTitle] = useState("");
  const [scale, setScale] = useState(1);
  const data = getLocalUserdata();
  const inputval = useRef();

  const addToSchedule = () => {
    userServices
      .commonPostService("/SendSchedule", {
        studentId: data.id,
        task: `Temario: ${title}`,
        type: "pdf",
        folderId: props.pdf.folderId,
        sub_Id: props.pdf.fileId,
      })
      .then((response) => {
        if (response.status === 200 && response.data.status === "Successfull") {
          console.log("added to schedule");
        } else {
          console.log("Could not add to schedule");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    addToSchedule();
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
    inputval.current.value = "";
  };

  const nextPage = () => {
    changePage(1);
    inputval.current.value = "";
  };

  const userChange = (e) => {
    let temp = parseInt(e.target.value);
    if (temp > 0 && temp <= numPages) {
      setPageNumber(temp);
    }
  };

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScale(0.6);
      } else if (width < 1024) {
        setScale(0.8);
      } else {
        setScale(1);
      }
    };

    window.addEventListener("resize", updateScale);
    updateScale();

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    if (props.fileName !== "" && typeof props.pdf !== "undefined") {
      userServices
        .commonPostService(
          "/getDownloadPdfFiles",
          JSON.stringify({
            folderId: props.pdf.folderId,
            studentId: data.id,
          })
        )
        .then((resp) => {
          if (resp.data.message === "success") {
            resp.data.files.forEach((file) => {
              if (file.id === props.pdf.fileId) {
                setFileName(file.file);
                setTitle(file.title);
                inputval.current.value = "";
              }
            });
          } else {
            toast.error("Error downloading pdf.");
          }
        })
        .catch(() => {
          toast.error("Error downloading pdf.");
        });
    }
  }, [props.pdf]);

  const styles = {
    pdfContainer: {
      display: "flex",
      alignItems: "center", 
      flexDirection: "column",
      margin: "0 auto",
      maxWidth: "100%",
      padding: window.innerWidth < 768 ? "0.5rem" : "1rem",
      minHeight: "100vh",
    },
    pdfWrapper: {
      width: "100%",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center", 
    },
    pdfPage: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    pageInput: {
      width: window.innerWidth < 768 ? "40px" : "50px",
      border: "1px solid #111827",
      padding: "5px",
      textAlign: "center",
      margin: "0 10px",
    },
    buttonWrapper: {
      display: "flex",
      marginTop: "1rem",
    },
    navigationButton: {
      backgroundColor: "#808080",
      border: "none",
      padding: "0.8rem",
      borderRadius: "50%",
      color: "#fff",
      margin: "0 20px",
      cursor: "pointer",
      fontSize: "1.5rem",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      transition: "background-color 0.3s",
    },
    navigationButtonDisabled: {
      backgroundColor: "#d1d1d1",
      cursor: "not-allowed",
    },
  };

  return (
    <div style={styles.pdfContainer}>
      <div style={styles.pdfWrapper}>
        <Document
          file={fileName}
          onLoadSuccess={onDocumentLoadSuccess}
          onContextMenu={(e) => e.preventDefault()}
          loading="Cargando PDF..."
        >
          <div style={styles.pdfPage}>
            <Page renderMode="canvas" scale={scale} pageNumber={pageNumber} />
          </div>
        </Document>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p>
          Página{" "}
          <input
            type="text"
            placeholder={pageNumber || (numPages ? 1 : "--")}
            style={styles.pageInput}
            onChange={userChange}
            ref={inputval}
          />{" "}
          of {numPages || "--"}
        </p>
        <div style={styles.buttonWrapper}>
          <button
            style={styles.navigationButton}
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            <ArrowBackIcon fontSize="inherit" />
          </button>
          <button
            style={styles.navigationButton}
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
             <ArrowForwardIcon fontSize="inherit" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfCard;
