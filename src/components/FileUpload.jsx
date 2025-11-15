import { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import '../styles/globals.css';

export default function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const onFileChange = e => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const uploadFiles = () => {
    selectedFiles.forEach((file, idx) => {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', snapshot => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`${file.name}: ${percent.toFixed(0)}%`);
      }, error => console.error(error), () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => console.log('Uploaded:', url));
      });
    });
  };

  return (
    <div className="upload-container">
      <input type="file" multiple accept="image/*,application/pdf,video/*" onChange={onFileChange} />
      <button onClick={uploadFiles} disabled={selectedFiles.length === 0}>Upload Files</button>
      <div className="previews">
        {selectedFiles.map((file, idx) => (
          <div key={file.name} className="preview-item">
            {file.type.startsWith('image/') ? <img src={previews[idx]} alt={file.name} className="preview-thumb"/> :
             file.type.startsWith('video/') ? <video src={previews[idx]} controls className="preview-thumb"/> :
             <p>{file.name}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
