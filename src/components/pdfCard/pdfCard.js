import React, {useState, useEffect, useRef} from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import './styles.css';
import { getLocalUserdata } from '../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';

const PdfCard = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);
    const [fileName, setFileName] = useState(props.fileName);
    const [title, setTitle] = useState('');
    const data=getLocalUserdata();
    const inputval=useRef();

    const addToSchedule = () => {
        userServices.commonPostService('/SendSchedule',{"studentId":data.id, "task":`Temario: ${title}`, "type":'pdf','folderId':props.pdf.folderId,'sub_Id':props.pdf.fileId})
        .then((response) => {
            console.log(response);
          if(response.status===200) {
            if(response.data.status==='Successfull') {
              console.log('added to schedule');
            }
            else {
              console.log('Couldnt add to schedule');
            }
          }
          else {
            console.log('Could not add to user schedule');
          }
        }).catch((err) => {
            console.log(err);
        });
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
        addToSchedule();
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
        inputval.current.value='';
    }

    function nextPage() {
        changePage(1);
        inputval.current.value='';
    }

    function userChange(e) {
        let temp=parseInt(e.target.value);
        if(temp>0 && temp<=numPages){
            setPageNumber(temp)
        }
    }

    useEffect (() => {
        if(props.fileName!=='' && typeof props.pdf !== "undefined" ) {
            userServices.commonPostService('/getDownloadPdfFiles',JSON.stringify({"folderId":props.pdf.folderId,"studentId":data.id}))
            .then(resp => {
                if(resp.data.message==='success') { 
                    resp.data.files.forEach((file)=> {
                        if(file.id===props.pdf.fileId){
                            setFileName(file.file);
                            setTitle(file.title);
                            inputval.current.value='';
                        }
                    })
                }
                else{
                    toast.error("Error downloading pdf.");
                }
            })
            .catch((err) => {
                toast.error("Error downloading pdf.");
            })
        }
    },[props.pdf])

    if(typeof fileName !== "undefined") {
        return (
            <div className='flex flex-col justify-center'>
                <div style={{display:'flex', justifyContent:'center', overflow:'hidden'}}>
                    <div className="tc dib br3 pa1 ma1 bw2 shadow-5" style={{pointerEvents:'none'}}>
                        <Document file={fileName}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onContextMenu={e => e.preventDefault()}
                        loading="Cargando PDF..."
                        >
                            <Page renderMode="canvas" scale={1.5} pageNumber={pageNumber} size="A4" orientation="portrait" wrap/>
                        </Document>
                    </div>
                </div>
                <div style={{display:'flex',alignItems:'center', flexDirection:'column'}}>
                    <p style={{display:'flex', justifyContent:'center'}}>
                        Página <input type='text' placeholder={pageNumber || (numPages ? 1 : '--')} 
                        style={{width:'12%',
                        border: '1px solid #111827',
                        paddingLeft: '2%',
                        paddingRight: '1%',
                        marginBottom: '1%',
                        marginLeft: '2%',
                        marginRight: '2%'}}
                        onChange={userChange}
                        ref={inputval}/> of {numPages || '--'}
                    </p>
                    <div style={{display:'flex', marginLeft:'1%'}}>
                        <button
                        className="temarioButton"
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}>
                            <img src={require(`assets/img/images/atras.webp`).default} srcSet={require(`assets/img/images/atras.png`).default} alt="atras"/>
                        </button>
                        <button
                        className="temarioButton"
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}>
                            <img src={require(`assets/img/images/siguiente.webp`).default} srcSet={require(`assets/img/images/siguiente.png`).default} alt="atras"/>
                        </button>
                    </div>
                </div> 
            </div>   
          )
    }
    else {
        return (<div style={{paddingLeft:'3%'}} className='flex justify-center'>   
        </div>)
    }
 
}

export default PdfCard
