import { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);  // State for image preview URL

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      // Create a URL for the selected image to preview it
      setImageUrl(URL.createObjectURL(selectedFile));
    } else {
      setImageUrl(null);  // Clear the image preview if it's not an image file
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log("Uploading file...");
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check server response
      if (response.data.status === 'success') {
        setStatus('success');
        setMessage(response.data.message);
      } else {
        setStatus('error');
        setMessage(response.data.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage("Failed to upload the file. Please try again.");
      console.error("Upload error:", error);  // Log the error for debugging
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">File Upload and Virus Scanning</h1>

      {/* Image Preview Container */}
      {imageUrl && (
        <div className="mb-4 text-center">
          <img
            src={imageUrl}
            alt="Preview"
            className="img-fluid rounded shadow"
            style={{ maxHeight: '300px', objectFit: 'contain' }}
          />
        </div>
      )}

      <div className="row">
        {/* Left Column - File Display */}
        <div className="col-md-6 mb-4">
          {file && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Uploaded File</h5>
                <p><strong>Name:</strong> {file.name}</p>
                <p><strong>Size:</strong> {Math.round(file.size / 1024)} KB</p>
                <p><strong>Type:</strong> {file.type}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Button, File Selection, and Message */}
        <div className="col-md-6">
          <div className="mb-4">
            <input type="file" onChange={handleFileChange} className="form-control" />
          </div>
          <button onClick={handleUpload} className="btn btn-primary w-100">
            Upload and Scan
          </button>

          {/* Display status and message */}
          {status && (
            <div className={`mt-3 alert ${status === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
