using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using _mosh_A2.Controllers.Resources;
using _mosh_A2.Core;
using _mosh_A2.Core.Models;
using AutoMapper;
using ImageSharp;
using System.Drawing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace _mosh_A2.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment _host;
        private readonly IVehicleRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly PhotoSettings _photoSettings;
        private readonly IPhotoRepository _photoRepository;
        private readonly ILogoRepository _logoRepository;
        public PhotosController(IHostingEnvironment host, 
                                IVehicleRepository repository, 
                                IUnitOfWork unitOfWork,
                                IMapper mapper,
                                IOptionsSnapshot<PhotoSettings> options,
                                IPhotoRepository photoRepository,
                                ILogoRepository logoRepository)
        {
            _photoSettings = options.Value;
            _unitOfWork = unitOfWork;
            _repository = repository;
            _host = host;
            _mapper = mapper;
            _photoRepository = photoRepository;
            _logoRepository = logoRepository;
        }
        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await _repository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();           

            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > _photoSettings.MaxBytes) return BadRequest("Max file size exceeded");
            if (!_photoSettings.IsSupperted(file.FileName)) return BadRequest("This file type is not accepted");
                    
            var uploadsFolderPath = Path.Combine(_host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await _unitOfWork.CompleteAsync();

            using (Image<Rgba32> image = ImageSharp.Image.Load(filePath))
            {
                if(image.Width > 2400)
                    image.Resize(image.Width / 3, image.Height / 3)
                        .Quantize(Quantization.Palette, 512)
                        .Save(filePath);
                else if(image.Width > 1200)
                    image.Resize(image.Width / 2, image.Height / 2)
                        .Quantize(Quantization.Palette, 512)
                        .Save(filePath); // automatic encoder selected based on extension.
            }
            
            return Ok(_mapper.Map<Photo, PhotoResource>(photo));
        }
        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
        {
            var photos = await _photoRepository.GetPhotos(vehicleId);

            return _mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }

        [Route("/api/photos/{id}")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int id){            

             var photo = await _photoRepository.GetPhoto(id);

             if (photo == null)
                return NotFound();

             _photoRepository.Remove(photo);
             await _unitOfWork.CompleteAsync();

             var uploadsFolderPath = Path.Combine(_host.WebRootPath, "uploads");
             var filePath = Path.Combine(uploadsFolderPath, photo.FileName);

             System.IO.File.Delete(filePath);

             return Ok(id);
        }
    }
}