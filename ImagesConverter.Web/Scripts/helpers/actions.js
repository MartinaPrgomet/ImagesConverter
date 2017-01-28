import "whatwg-fetch";

export function getAllConvertedImages() {
    return fetch('/api/images')
    .then(function(response) {
        return response.json()
    })
    .catch(function(error) {
        console.log('error', error)
    })
}

export function handleUploadImages(images) {
    let data = new FormData();

    images.map((image) => 
        data.append("file", image.file)
    )

    return fetch('/api/images', {
        method: 'POST',
        body: data
    })
    .then(function(response) {
        return response.json()
    })
    .catch(function(error) {
        console.log('error', error)
    })
}

export function  getPreview(url) {
    let path = "../../Content/Images/UploadedImages/";
    let ext = ".tiff";
    let image = path + url + ext
        
    Tiff.initialize({TOTAL_MEMORY: 16777216 * 10});

    return fetch(image)
    .then(function(response) {
        return response.arrayBuffer();
    })
    .then(function(buffer) {
        let tiff = new Tiff({buffer: buffer});
        for (let i = 0, len = tiff.countDirectory(); i < len; ++i) {
            tiff.setDirectory(i);
            let canvas = tiff.toCanvas();
            document.getElementById("tiffImagePreview").append(canvas)
        }
    })
    .catch(function(error) {
        console.log('error', error)
    })    
}