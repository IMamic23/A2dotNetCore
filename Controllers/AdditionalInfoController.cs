using System.Collections.Generic;
using System.Threading.Tasks;
using _mosh_A2.Controllers.Resources;
using _mosh_A2.Core;
using _mosh_A2.Core.Models;
using _mosh_A2.Models;
using _mosh_A2.Persistence;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _mosh_A2.Controllers
{
    [Route("/api/additionalInfo")]
    public class AdditionalInfoController : Controller
    {
        private readonly IMapper mapper;
        private readonly IAdditionalInfoRepository additionalInfoRepository;
        private readonly IUnitOfWork unitOfWork;
        
        public AdditionalInfoController(IMapper mapper,
                                        IAdditionalInfoRepository additionalInfoRepository,
                                        IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.additionalInfoRepository = additionalInfoRepository;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAdditionalInfo(int id)
        {
           var addInfo = await additionalInfoRepository.GetAdditionalInfo(id);

           if(addInfo == null)
                return NotFound();

           var addInfoResource = mapper.Map<AdditionalInfo, AdditionalInfoResource>(addInfo);

           return Ok(addInfoResource);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAdditionalInfo([FromBody] SaveAdditionalInfoResource addInfoResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var addInfo = mapper.Map<SaveAdditionalInfoResource, AdditionalInfo>(addInfoResource);
            
            additionalInfoRepository.Add(addInfo);
            await unitOfWork.CompleteAsync();

            addInfo = await additionalInfoRepository.GetAdditionalInfo(addInfo.VehicleId);

            var result = mapper.Map<AdditionalInfo, AdditionalInfoResource>(addInfo);

            return Ok(result);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdditionalInfo(int id, [FromBody] AdditionalInfoResource addInfoResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var addInfo = await additionalInfoRepository.GetAdditionalInfo(id);

            if (addInfo == null)
                return NotFound();

            mapper.Map<AdditionalInfoResource, AdditionalInfo>(addInfoResource, addInfo);

            additionalInfoRepository.Update(addInfo);
            await unitOfWork.CompleteAsync();

            addInfo = await additionalInfoRepository.GetAdditionalInfo(addInfo.VehicleId);
            var result = mapper.Map<AdditionalInfo, AdditionalInfoResource>(addInfo);

            return Ok(result);
        }
    }
}