
using System;
using System.Linq;

namespace ImagesConverter.Data.TestData
{
    public class TestDataFactory
    {
        public static void Fill()
        {
            using (var db = new ConvertedImagesContext())
            {
                InsertConvertedImages(db);
                db.SaveChanges();
            }
        }

        private static void InsertConvertedImages(ConvertedImagesContext db)
        {
            new[]
            {
                new ConvertedImage
                {
                    Id          = 1,
                    Name        = "sample1",
                    Path        = @"/Content/Images/UploadedImages/sample1.tiff",
                    CreatedAt   = DateTime.Now,
                    Width       = 300,
                    Height      = 300
                },
                new ConvertedImage
                {
                    Id          = 2,
                    Name        = "sample1",
                    Path        = @"/Content/Images/UploadedImages/sample1.tiff",
                    CreatedAt   = DateTime.Now,
                    Width       = 500,
                    Height      = 500
                },
                new ConvertedImage
                {
                    Id          = 3,
                    Name        = "sample1",
                    Path        = @"/Content/Images/UploadedImages/sample1.tiff",
                    CreatedAt   = DateTime.Now,
                    Width       = 700,
                    Height      = 700
                }
            }.ToList().ForEach(x => db.ConvertedImages.Add(x));
        }
    }
}
