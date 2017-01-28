import React, { Component } from "react"
import { getAllConvertedImages } from "../helpers/actions"
import { formatDate, downloadImage } from "../helpers/generic"

class ConvertedImages extends Component {
    constructor () {
        super()

        this.getConvertedImagesList = this.getConvertedImagesList.bind(this)
        this.state = { images: [] }
    }

    componentWillMount () {
        getAllConvertedImages()
        .then(function(response) {
            this.setState({ images: response })
        }.bind(this))
    }

    getConvertedImagesList() {
        const { images } = this.state

        return images.map((image, index) => {
            return (<tr key={index}>
                <td><a onClick={() => downloadImage(image.Name)}>{image.Name}</a></td>
                <td>{formatDate(image.CreatedAt)}</td>
                <td>{image.Width} px</td>
                <td>{image.Height} px</td>
            </tr>)
        })
    }

    render() {
        const { images } = this.state

        return(
            images ? 
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Width</th>
                            <th>Height</th>
                        </tr>
                    </thead>
                    <tbody>{this.getConvertedImagesList()}</tbody>
                </table> 
            : <div></div>
        )
    }
}

export default ConvertedImages