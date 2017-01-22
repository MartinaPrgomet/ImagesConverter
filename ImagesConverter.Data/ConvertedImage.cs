using System;

namespace ImagesConverter.Data
{
    public class ConvertedImage
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
