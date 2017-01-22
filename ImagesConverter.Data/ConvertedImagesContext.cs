using System.Data.Entity;

namespace ImagesConverter.Data
{
    public class ConvertedImagesContext : DbContext
    {
        public ConvertedImagesContext() : base()
        {
        }

        public DbSet<ConvertedImage> ConvertedImages { get; set; }
    }
}
