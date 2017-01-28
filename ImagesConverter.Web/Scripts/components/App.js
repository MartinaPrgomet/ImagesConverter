import React, { Component } from "react"
import ImagesUpload from "./ImagesUpload"
import ConvertedImages from "./ConvertedImages"

class App extends Component {
    constructor() {
        super()
        
        this.showConvertedImagesList = this.showConvertedImagesList.bind(this)
        this.showConvertForm = this.showConvertForm.bind(this)
        this.state = { viewToLoad: null }
    }

    showConvertedImagesList() {
        this.setState({ viewToLoad: "imagesList" })
    }

    showConvertForm() {
        this.setState({ viewToLoad: "convertForm" })
    }

    render() {
        const { viewToLoad } = this.state

        return(
            <div className="base">
                <div className="form">
                    {viewToLoad !== "imagesList" &&
                        <button onClick={() => this.showConvertedImagesList()}>Show All Converted Images</button>}
                    {viewToLoad !== "convertForm" &&
                        <div className="buttonConvert">
                            <button onClick={() => this.showConvertForm()}>Convert image(s)</button>
                        </div>}
                </div>
                {viewToLoad === "imagesList" && <ConvertedImages />}
                {viewToLoad === "convertForm" && <ImagesUpload />}
            </div>
        )
    }
}

export default App