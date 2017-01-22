using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ImagesConverter.Web.Services
{
     public class ImagesConverterService
    {
        public static async Task<Image> ConvertToTiffAndSaveToFolder(MultipartMemoryStreamProvider request, string saveImagePath)
        {
            EncoderParameters encoderParams = new EncoderParameters(1);
            ImageCodecInfo tiffCodecInfo = ImageCodecInfo.GetImageEncoders().First(x => x.MimeType == "image/tiff");

            Image tiffImage = null;

            for (int i = 0; i < request.Contents.Count; i++)
            {
                if (i == 0)
                {
                    tiffImage = Image.FromStream(await request.Contents[i].ReadAsStreamAsync());

                    encoderParams.Param[0] = new EncoderParameter(Encoder.SaveFlag, (long)EncoderValue.MultiFrame);
                    tiffImage.Save(saveImagePath, tiffCodecInfo, encoderParams);
                }
                else
                {
                    encoderParams.Param[0] = new EncoderParameter(Encoder.SaveFlag, (long)EncoderValue.FrameDimensionPage);
                    using (Image frame = Image.FromStream(await request.Contents[i].ReadAsStreamAsync()))
                    {
                        tiffImage.SaveAdd(frame, encoderParams);
                    }
                }

                if (i == request.Contents.Count - 1)
                {
                    encoderParams.Param[0] = new EncoderParameter(Encoder.SaveFlag, (long)EncoderValue.Flush);
                    tiffImage.SaveAdd(encoderParams);
                }
            }

            return tiffImage;
        }
    }
}