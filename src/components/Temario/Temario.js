import React, {useState} from 'react';
import PdfCard from 'components/pdfCard/pdfCard';
import FolderList from 'components/FolderList/FolderList';
import './styles.css'

const Temario = (props) => {
    const [pdf, setPdf] = useState({});
    const updatePdf = (val) => {
        setPdf(val);
    }

    return (
        <div className='stackStyle' >
            <FolderList folderToggle={props.folderToggle} setPdf={updatePdf}/>
            <PdfCard pdf={pdf} load={false}/>
        </div>
  )
}
export default Temario
