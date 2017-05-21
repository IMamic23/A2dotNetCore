using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using _mosh_A2.Controllers.Resources;
using _mosh_A2.Core;
using _mosh_A2.Core.Models;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace _mosh_A2.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly PhotoSettings photoSettings;
        private readonly IPhotoRepository photoRepository;
        public PhotosController(IHostingEnvironment host, 
                                IVehicleRepository repository, 
                                IUnitOfWork unitOfWork,
                                IMapper mapper,
                                IOptionsSnapshot<PhotoSettings> options,
                                IPhotoRepository photoRepository)
        {
            this.photoSettings = options.Value;
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.host = host;
            this.mapper = mapper;
            this.photoRepository = photoRepository;
        }
        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file size exceeded");
            if (!photoSettings.IsSupperted(file.FileName)) return BadRequest("This file type is not accepted");

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
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
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }
        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
        {
            var photos = await photoRepository.GetPhotos(vehicleId);

            return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }

        [Route("/api/photos/{fileName}")]
        [HttpDelete("{fileName}")]
        public async Task<IActionResult> DeletePhoto(string fileName){
             
             if(fileName == "") 
                return BadRequest("No image provided.");

             var photo = photoRepository.GetPhoto(fileName);

             if (photo == null)
                return NotFound();

             photoRepository.Remove(photo);
             await unitOfWork.CompleteAsync();

             return Ok(fileName);
        }
    }
}