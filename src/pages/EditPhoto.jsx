import React, { useEffect, useRef } from 'react'

const EditPhoto = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let img = new Image();
    let fileName = "";

    const downloadBtn = document.getElementById("download-btn");
    const revertBtn = document.getElementById("revert-btn");

    // Filter & Effect Handlers
    document.addEventListener("click", e => {
      // Filter button clicks
      if (e.target.classList.contains("filter-btn")) {
        const filterType = e.target.getAttribute("data-filter");
        const value = parseInt(e.target.getAttribute("data-value"), 10);
        Caman("#canvas", function () {
          this[filterType](value).render();
        });
      }
    });

    // Revert Filters
    revertBtn.addEventListener("click", e => {
      Caman("#canvas", function () {
        this.revert();
      });
    });

    // Upload File
    fileInputRef.current.addEventListener("change", () => {
      const file = fileInputRef.current.files[0];
      const reader = new FileReader();

      if (file) {
        fileName = file.name;
        reader.readAsDataURL(file);
      }

      reader.addEventListener("load", () => {
        img = new Image();
        img.src = reader.result;

        img.onload = function () {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          canvas.removeAttribute("data-caman-id");
        };
      }, false);
    });

    // Download Event
    downloadBtn.addEventListener("click", () => {
      const fileExtension = fileName.slice(-4);
      let newFilename;

      if (fileExtension === ".jpg" || fileExtension === ".png") {
        newFilename = fileName.substring(0, fileName.length - 4) + "-edited.jpg";
      }

      download(canvas, newFilename);
    });

    // Download
    function download(canvas, filename) {
      const link = document.createElement("a");
      link.download = filename;
      link.href = canvas.toDataURL("image/jpeg", 0.8);

      const e = new MouseEvent("click");
      link.dispatchEvent(e);
    }
  }, []);

  return (
    <div>
      <nav className="flex justify-center items-center navbar rounded navbar-dark mb-5 mt-3 bg-slate-800">
      <div>
          <a className="navbar-brand">Edit your AI ART</a>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="custom-file mb-3 bg-white">
              <input type="file" className="custom-file-input mx-20 my-1" id="upload-file" ref={fileInputRef} />
              <label htmlFor="upload-file" className="custom-file-label mx-20">Choose Image</label>
            </div>
            <canvas id="canvas" ref={canvasRef}></canvas>

            <h4 className="text-center font-extrabold text-white text-32px my-3">Filters</h4>

            <div className="row my-4 text-center">
              <div className="col-md-3">
                <div className="btn-group btn-group-sm">
                  <button className="filter-btn brightness-remove btn btn-info" data-filter="brightness" data-value="-5">-</button>
                  <button className="btn btn-secondary btn-disabled" disabled>Brightness</button>
                  <button className="filter-btn brightness-add btn btn-info" data-filter="brightness" data-value="5">+</button>
                </div>
              </div>

              <div className="col-md-3">
                <div className="btn-group btn-group-sm">
                  <button className="filter-btn contrast-remove btn btn-info" data-filter="contrast" data-value="-5">-</button>
                  <button className="btn btn-secondary btn-disabled" disabled>Contrast</button>
                  <button className="filter-btn contrast-add btn btn-info" data-filter="contrast" data-value="5">+</button>
                </div>
              </div>

              <div className="col-md-3">
                <div className="btn-group btn-group-sm">
                  <button className="filter-btn saturation-remove btn btn-info" data-filter="saturation" data-value="-5">-</button>
                  <button className="btn btn-secondary btn-disabled" disabled>Saturation</button>
                  <button className="filter-btn saturation-add btn btn-info" data-filter="saturation" data-value="5">+</button>
                </div>
              </div>

              <div className="col-md-3">
                <div className="btn-group btn-group-sm">
                  <button className="filter-btn vibrance-remove btn btn-info" data-filter="vibrance" data-value="-5">-</button>
                  <button className="btn btn-secondary btn-disabled" disabled>Vibrance</button>
                  <button className="filter-btn vibrance-add btn btn-info" data-filter="vibrance" data-value="5">+</button>
                </div>
              </div>
            </div>


            <h4 className="text-center font-extrabold text-white text-32px my-3">Effects</h4>

            <div className="row mb-3">
              <div className="col-md-3">
                <button className="filter-btn vintage-add btn btn-dark btn-block" data-filter="vintage" data-value="null">
                  Vintage
                </button>
              </div>
              <div className="col-md-3">
                <button className="filter-btn lomo-add btn btn-dark btn-block" data-filter="lomo" data-value="null">
                  Lomo
                </button>
              </div>
              <div className="col-md-3">
                <button className="filter-btn clarity-add btn btn-dark btn-block" data-filter="clarity" data-value="null">
                  Clarity
                </button>
              </div>
              <div className="col-md-3">
                <button className="filter-btn sincity-add btn btn-dark btn-block" data-filter="sinCity" data-value="null">
                  Sin City
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <button className="filter-btn crossprocess-add btn btn-dark btn-block" data-filter="crossProcess" data-value="null">
                  Cross Process
                </button>
              </div>
              <div className="col-md-3">
                <button className="filter-btn pinhole-add btn btn-dark btn-block" data-filter="pinhole" data-value="null">
                  Pinhole
                </button>
              </div>
              <div className="col-md-3">
                <button className="filter-btn nostalgia-add btn btn-dark btn-block" data-filter="nostalgia" data-value="null">
                  Nostalgia
                </button>
              </div>
              <div className="col-md-3">
                <button className="filter-btn hermajesty-add btn btn-dark btn-block" data-filter="herMajesty" data-value="null">
                  Her Majesty
                </button>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-6">
                <button id="download-btn" className="btn btn-primary btn-block">Download Image</button>
              </div>
              <div className="col-md-6">
                <button id="revert-btn" className="btn btn-danger btn-block">Remove Filters</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPhoto;
