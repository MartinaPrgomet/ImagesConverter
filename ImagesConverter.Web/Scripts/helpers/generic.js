export function formatDate(date) {
    let newDate = new Date(date)

    return newDate.toLocaleDateString()
}

export function downloadImage(tiffImageName) {
    let path = "../../Content/Images/UploadedImages/"
    let ext = ".tiff"
    let tiffImageDownloadLink = path + tiffImageName + ext

    window.open(tiffImageDownloadLink)
}