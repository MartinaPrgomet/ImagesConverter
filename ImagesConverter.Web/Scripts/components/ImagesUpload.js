import React, { Component } from "react";
import { handleUploadImages, getPreview } from "../helpers/helpers"

class ImagesUpload extends Component {
    constructor() {
        super()
        
        this.handleUploadImages = this.handleUploadImages.bind(this)
        this.readAndPreview = this.readAndPreview.bind(this)
        this.downloadImage = this.downloadImage.bind(this)
        this.removePreviewAndShowForm = this.removePreviewAndShowForm.bind(this)
        this.removeImage = this.removeImage.bind(this)
        this.state = { images: [], tiffImageName: null }
    }

    handleUploadImages(e) {
        e.preventDefault(); 
        const { images } = this.state;

        handleUploadImages(images)
        .then(function(response) {
            this.setState({ images: [], tiffImageName: response.Name })
        }.bind(this))
    }

    readAndPreview(file) {
        if ( /\.(jpe?g|png|bmp|gif)$/i.test(file.name)) {
            let reader = new FileReader();
            let currentImages = this.state.images;

            reader.onloadend = () => {
                let newImage = {
                    file: file,
                    imagePreviewUrl: reader.result
                }
                currentImages.push(newImage)
                this.setState({ images: currentImages });
            }

            reader.readAsDataURL(file);
        }
    }

    onChange(e) {
        e.preventDefault();
        let files = e.target.files;

        if (files) {
            for(let i=0; i < files.length; i++) {
                this.readAndPreview(files[i])
            }
        }
    }

    downloadImage() {
        const { tiffImageName } = this.state

        if(!tiffImageName) return

        let path = "../../Content/Images/UploadedImages/";
        let ext = ".tiff";
        let tiffImageDownloadLink = path + tiffImageName + ext

        window.open(tiffImageDownloadLink)
    }

    removePreviewAndShowForm() {
        this.setState({ tiffImageName: null })
    }

    removeImage(index) {
        let currentImages = this.state.images;

        for(let i = 0; i < currentImages.length; i++) {
            if(Object.keys(currentImages)[i] === String(index)) {
                currentImages.splice(i, 1);
                this.setState({ images: currentImages })
            }
        }
    }

    render() {
        const { images, tiffImageName } = this.state;
        const preview = images.map((image, index) =>
            <div key={index} className="imagePreview">
                <img src={image.imagePreviewUrl} className="previewContainer" />
                <div><button onClick={() => this.removeImage(index)}>Remove</button></div>
            </div>
        );
        const tiffImagePreview =  tiffImageName ? getPreview(tiffImageName) : null

        return (
            <div className="base">
                {!tiffImageName 
                    ? <div>
                        <div className="form">
                            <form onSubmit={this.handleUploadImages}>
                                <input name="image" type="file" multiple onChange={(e) => this.onChange(e)} />
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                        {preview}
                      </div>
                    : <div>
                        <div className="form">
                            {tiffImageName && <button onClick={() => this.downloadImage()}>Download</button>}
                            <div className="buttonConvert">
                                <button onClick={() => this.removePreviewAndShowForm()}>Convert another image(s)</button>
                            </div>
                        </div>
                        <div id="tiffImagePreview" />
                     </div>}
             </div>
        );
    }
}

export default ImagesUpload;