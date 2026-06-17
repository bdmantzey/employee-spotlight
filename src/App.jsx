import { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo.jpg";
import html2canvas from "html2canvas";

export default function App() {
  const [employeeImage, setEmployeeImage] = useState(null);
  const [employeeName, setEmployeeName] = useState("Employee Name");
  const [jobTitle, setJobTitle] = useState("Job Title");
  const [years, setYears] = useState("5 Years");
  const [favoritePart, setFavoritePart] = useState(
    "Helping customers every day."
  );
  const [funFact, setFunFact] = useState(
    "Loves fishing on weekends."
  );
  const [jobAccomplishments, setJobAccomplishments] = useState(
    "Always goes above and beyond for the team."
  );
  const [quote, setQuote] = useState(
    "MAX Electric feels like family."
  );
  const [imagePositionX, setImagePositionX] = useState(50);
  const [imagePositionY, setImagePositionY] = useState(50);

  const [previewMode, setPreviewMode] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Cleanup uploaded image URL
  useEffect(() => {
    return () => {
      if (employeeImage) {
        URL.revokeObjectURL(employeeImage);
      }
    };
  }, [employeeImage]);

  // Updated function to capture the card element and export as a crisp JPEG asset
  const downloadJPEG = async () => {
    const element = document.getElementById("spotlight-card");

    setIsDownloading(true);

    // Wait for state change to safely clear browser interaction outlines
    await new Promise((resolve) =>
      setTimeout(resolve, 120)
    );

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Keeps text rendering clear and readable
        useCORS: true, // Safeguards dynamic image sources
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `${employeeName.toLowerCase().replace(/\s+/g, "-")}-spotlight.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.98);
      link.click();
    } catch (error) {
      console.error("Image generation failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleImageUpload = (file) => {
    if (file) {
      setEmployeeImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleImageUpload(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="app-container">
      <div id="spotlight-card" className="card">

        {/* Header */}
        <header className="card-header">
          <img
            src={logo}
            alt="MAX Electric Logo"
            className="logo"
          />

          <div>
            <h1 className="main-title">
              Employee Spotlight
            </h1>
            <p className="subtitle">
              Celebrating the people who power Max Electric
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="card-content">

          {/* Left Column */}
          <section className="left-column">

            {/* Upload Area */}
            <div
              className="upload-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {employeeImage ? (
                <img
                  src={employeeImage}
                  alt={employeeName}
                  className="employee-image"
                  style={{
                    objectPosition: `${imagePositionX}% ${imagePositionY}%`
                  }}
                />
              ) : (
                <div className="image-placeholder">
                  Drag & Drop Employee Photo
                </div>
              )}

              {!previewMode && !isDownloading && (
                <>
                  <label className="upload-button">
                    Upload Picture

                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) =>
                        handleImageUpload(e.target.files[0])
                      }
                    />
                  </label>

                  <p className="helper-text">
                    Recommended size: 1000 x 1000 px
                  </p>
                </>
              )}
            </div>

            {/* Adjustment Sliders */}
            {employeeImage && !previewMode && !isDownloading && (
              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div>
                  <p>Move Image Left / Right</p>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={imagePositionX}
                    onChange={(e) =>
                      setImagePositionX(e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <p>Move Image Up / Down</p>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={imagePositionY}
                    onChange={(e) =>
                      setImagePositionY(e.target.value)
                    }
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            )}

            {/* Form Section */}
            {!previewMode && !isDownloading && employeeImage && (
              <div className="form-section">
                <input
                  type="text"
                  placeholder="Employee Name"
                  value={employeeName}
                  onChange={(e) =>
                    setEmployeeName(e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Job Title"
                  value={jobTitle}
                  onChange={(e) =>
                    setJobTitle(e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Years with Max Electric"
                  value={years}
                  onChange={(e) =>
                    setYears(e.target.value)
                  }
                />

                <textarea
                  placeholder="Favorite Part of the Job"
                  value={favoritePart}
                  onChange={(e) =>
                    setFavoritePart(e.target.value)
                  }
                />
                
                <textarea
                  placeholder="Job Accomplishments"
                  value={jobAccomplishments}
                  onChange={(e) =>
                    setJobAccomplishments(e.target.value)
                  }
                />

                <textarea
                  placeholder="Fun Fact"
                  value={funFact}
                  onChange={(e) =>
                    setFunFact(e.target.value)
                  }
                />

                <textarea
                  placeholder="Employee Quote"
                  value={quote}
                  onChange={(e) =>
                    setQuote(e.target.value)
                  }
                />
              </div>
            )}
          </section>

          {/* Right Column */}
          <section className="details-section">

            <p className="section-label">
              Meet Our Team Member
            </p>

            <h2 className="employee-name">
              {employeeName}
            </h2>

            <p className="job-title">
              {jobTitle}
            </p>

            <div className="details-list">
              <p>
                <strong>Years with Max Electric:</strong>{" "}
                {years}
              </p>

              <p>
                <strong>Favorite Part of the Job:</strong>{" "}
                {favoritePart}
              </p>
              
              <p>
                <strong>Job Accomplishments:</strong>{" "}
                {jobAccomplishments}
              </p>

              <p>
                <strong>Fun Fact:</strong>{" "}
                {funFact}
              </p>
            </div>

            <blockquote className="quote-box">
              “{quote}”
            </blockquote>

          </section>
        </main>

        {/* Action Controls Toolbar Block */}
        {!isDownloading && (
          <div className="button-section">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="preview-button"
            >
              {previewMode ? "Edit Mode" : "Preview Mode"}
            </button>

            <button
              onClick={downloadJPEG}
              className="download-button"
            >
              Download JPEG
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          Max Electric • Employee Recognition Program
        </footer>

      </div>
    </div>
  );
}