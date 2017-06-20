using System;
using System.IO;
using System.Threading.Tasks;
using _mosh_A2.Core.Models;
using _mosh_A2.Models;
using ImageSharp;
using Microsoft.AspNetCore.Http;

namespace _mosh_A2.Core
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPhotoStorage _photoStorage;
        public PhotoService(IUnitOfWork unitOfWork, IPhotoStorage photoStorage)
        {
            _photoStorage = photoStorage;
            _unitOfWork = unitOfWork;
        }
        public async Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadsFolderPath)
        {
            var fileName = await _photoStorage.StorePhoto(uploadsFolderPath, file);

            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await _unitOfWork.CompleteAsync();

            ResizePhoto(uploadsFolderPath, fileName);

            return photo;
        }

        private void ResizePhoto(string uploadsFolderPath, string fileName)
        {
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (Image<Rgba32> image = ImageSharp.Image.Load(filePath))
            {
                if (image.Width > 2400)
                    image.Resize(image.Width / 3, image.Height / 3)
                        .Quantize(Quantization.Palette, 512)
                        .Save(filePath);
                else if (image.Width > 1200)
                    image.Resize(image.Width / 2, image.Height / 2)
                        .Quantize(Quantization.Palette, 512)
                        .Save(filePath); // automatic encoder selected based on extension.
            }
        }
    }
}