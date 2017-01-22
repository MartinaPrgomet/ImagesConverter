using ImagesConverter.Data;
using ImagesConverter.Web.Models;
using ImagesConverter.Web.Services;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace ImagesConverter.Web.Controllers
{
    public class ImagesApiController : ApiController
    {
        [HttpGet]
        public List<ConvertedImage> ImagesGetAll()
        {
            var model = new ImagesModel();
            return model.GetAllImages();
        }

        [HttpGet]
        public ConvertedImage ImagesGetById(int id)
        {
            var model = new ImagesModel();
            return model.GetOneImage(id);
        }

        [HttpPost]
        public async Task<ConvertedImage> ImagesConvert()
        {
            var model = new ImagesModel();
            var tiffPictureName = "Image-" + Guid.NewGuid().ToString();
            string tiffPictureFilePath = HttpContext.Current.Server.MapPath("~/Content/Images/UploadedImages/") + tiffPictureName + ".tiff";

            var result = await Request.Content.ReadAsMultipartAsync();
            var convertedTiffImage = await ImagesConverterService.ConvertToTiffAndSaveToFolder(result, tiffPictureFilePath);
            
            return model.CreateImage(tiffPictureFilePath, tiffPictureName, convertedTiffImage.Width, convertedTiffImage.Height);
        }
    }
}