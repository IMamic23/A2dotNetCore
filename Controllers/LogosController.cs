using System;
using System.IO;
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
    [Route("/api/vehicles/{vehicleId}/logo")]
    public class LogosController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly PhotoSettings photoSettings;
        private readonly ILogoRepository logoRepository;
        public LogosController(IHostingEnvironment host, 
                                IVehicleRepository repository, 
                                IUnitOfWork unitOfWork,
                                IMapper mapper,
                                IOptionsSnapshot<PhotoSettings> options,
                                ILogoRepository logoRepository)
        {
            this.photoSettings = options.Value;
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.host = host;
            this.mapper = mapper;
            this.logoRepository = logoRepository;
        }


        [HttpGet]
        public async Task<IActionResult> GetLogo(int vehicleId){
           
           var logo = await logoRepository.GetLogo(vehicleId);
           
            // if (logo == null)
            //      return NotFound();

           var logoResource = mapper.Map<Logo, LogoResource>(logo);

           return Ok(logoResource);
        }

        [HttpPost]
        public async Task<IActionResult> UploadLogo(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file size exceeded");
            if (!photoSettings.IsSupperted(file.FileName)) return BadRequest("This file type is not accepted");

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "logos");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var logo = new Logo { FileName = fileName };
            vehicle.Logo = logo;
            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Logo, LogoResource>(logo));
        }
    }
}