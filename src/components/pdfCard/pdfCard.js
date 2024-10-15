import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { getLocalUserdata } from '../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';

const PdfCard = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);
    const [fileName, setFileName] = useState(props.fileName);
    const [title, setTitle] = useState('');
    const [scale, setScale] = useState(1);  // Add scale for dynamic scaling
    const data = getLocalUserdata();
    const inputval = useRef();

    const addToSchedule = () => {
        userServices.commonPostService('/SendSchedule', {
            "studentId": data.id,
            "task": `Temario: ${title}`,
            "type": 'pdf',
            'folderId': props.pdf.folderId,
            'sub_Id': props.pdf.fileId
        })
        .then((response) => {
            if (response.status === 200 && response.data.status === 'Successfull') {
                console.log('added to schedule');
            } else {
                console.log('Could not add to schedule');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
        addToSchedule();
    }

    const changePage = (offset) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    const previousPage = () => {
        changePage(-1);
        inputval.current.value = '';
    }

    const nextPage = () => {
        changePage(1);
        inputval.current.value = '';
    }

    const userChange = (e) => {
        let temp = parseInt(e.target.value);
        if (temp > 0 && temp <= numPages) {
            setPageNumber(temp);
        }
    }

    // Dynamically set the scale based on the window size
    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setScale(0.6);  // Adjust for small screens (mobile)
            } else if (width < 1024) {
                setScale(0.8);  // Adjust for tablets
            } else {
                setScale(1);    // Full size for larger screens
            }
        };

        window.addEventListener('resize', updateScale);
        updateScale();  // Set initial scale on mount

        return () => window.removeEventListener('resize', updateScale);
    }, []);

    useEffect(() => {
        if (props.fileName !== '' && typeof props.pdf !== "undefined") {
            userServices.commonPostService('/getDownloadPdfFiles', JSON.stringify({
                "folderId": props.pdf.folderId,
                "studentId": data.id
            }))
            .then(resp => {
                if (resp.data.message === 'success') {
                    resp.data.files.forEach((file) => {
                        if (file.id === props.pdf.fileId) {
                            setFileName(file.file);
                            setTitle(file.title);
                            inputval.current.value = '';
                        }
                    })
                } else {
                    toast.error("Error downloading pdf.");
                }
            })
            .catch(() => {
                toast.error("Error downloading pdf.");
            });
        }
    }, [props.pdf]);

    // Inline styles
    const styles = {
        pdfContainer: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: '0 auto',
            maxWidth: '100%',
            padding: '1rem',
        },
        pdfWrapper: {
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
            margin: '0 auto',
        },
        pdfPage: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
        },
        pageInput: {
            width: '50px',
            border: '1px solid #111827',
            padding: '5px',
            textAlign: 'center',
            margin: '0 10px',
        },
        buttonWrapper: {
            display: 'flex',
            marginTop: '1rem',
        },
        temarioButton: {
            backgroundColor: 'transparent',
            border: 'none',
            margin: '0 10px',
            width: '120px',  // Adjusted for mobile
            height: '90px',
            cursor: 'pointer',  // Change cursor on hover
        },
        buttonImage: {
            width: '100%',
            height: '100%',
        },
        // Mobile-specific adjustments using media queries
        '@media (max-width: 768px)': {
            pdfWrapper: {
                maxWidth: '100%',
                padding: '0.5rem',
            },
            temarioButton: {
                margin: '0 5px',
                width: '80px',  // Adjusted for mobile
                height: '80px',
            },
            pageInput: {
                width: '40px',
                margin: '0 5px',
            }
        },
     
      
    };

    if (typeof fileName !== "undefined") {
        return (
            <div style={styles.pdfContainer}>
                <div style={styles.pdfWrapper}>
                    <Document file={fileName}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onContextMenu={e => e.preventDefault()}
                        loading="Cargando PDF...">
                        <div style={styles.pdfPage}>
                            <Page renderMode="canvas" scale={scale} pageNumber={pageNumber} />
                        </div>
                    </Document>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p>
                        Página <input type="text"
                            placeholder={pageNumber || (numPages ? 1 : '--')}
                            style={styles.pageInput}
                            onChange={userChange}
                            ref={inputval}
                        /> of {numPages || '--'}
                    </p>
                    <div style={styles.buttonWrapper}>
                        <button
                            style={styles.temarioButton}
                            type="button"
                            disabled={pageNumber <= 1}
                            onClick={previousPage}>
                            <img style={styles.buttonImage} src={require('assets/img/images/atras.webp').default} alt="previous" />
                        </button>
                        <button
                            style={styles.temarioButton}
                            type="button"
                            disabled={pageNumber >= numPages}
                            onClick={nextPage}>
                            <img style={styles.buttonImage} src={require('assets/img/images/siguiente.webp').default} alt="next" />
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div style={styles.pdfContainer}>Loading...</div>;
    }
}

export default PdfCard;
