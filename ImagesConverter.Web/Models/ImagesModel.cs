using ImagesConverter.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ImagesConverter.Web.Models
{
    public class ImagesModel
    {
        public List<ConvertedImage> GetAllImages()
        {
            var ConvertedImagesData = new List<ConvertedImage>();

            using (var db = new ConvertedImagesContext())
            {
                var dbConvertedImages = db.ConvertedImages.Select(x => x).ToList();
                ConvertedImagesData = dbConvertedImages;
            }

            return ConvertedImagesData;
        }

        public ConvertedImage GetOneImage(int id)
        {
            var ConvertedImageData = new ConvertedImage();

            using (var db = new ConvertedImagesContext())
            {
                var dbConvertedImage = db.ConvertedImages.First(x => x.Id == id);

                ConvertedImageData.Id = dbConvertedImage.Id;
                ConvertedImageData.Name = dbConvertedImage.Name;
                ConvertedImageData.Path = dbConvertedImage.Path;
                ConvertedImageData.Width = dbConvertedImage.Width;
                ConvertedImageData.Height = dbConvertedImage.Height;
                ConvertedImageData.CreatedAt = dbConvertedImage.CreatedAt;
            }

            return ConvertedImageData;
        }

        public ConvertedImage CreateImage(string path, string name, int width, int height)
        {
            var ConvertedImageData = new ConvertedImage();

            ConvertedImageData.Path = path;
            ConvertedImageData.Name = name;
            ConvertedImageData.CreatedAt = DateTime.Now;
            ConvertedImageData.Width = width;
            ConvertedImageData.Height = height;

            using (var db = new ConvertedImagesContext())
            {
                db.ConvertedImages.Add(ConvertedImageData);
                db.SaveChanges();
            }

            return ConvertedImageData;
        }
    }

}