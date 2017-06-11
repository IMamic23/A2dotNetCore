using System.Collections.Generic;
using System.Threading.Tasks;
using _mosh_A2.Controllers.Resources;
using _mosh_A2.Core;
using _mosh_A2.Models;
using _mosh_A2.Persistence;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _mosh_A2.Controllers
{
    [Route("/api/makes")]
    public class MakesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IMakeRepository makeRepository;
        private readonly IUnitOfWork unitOfWork;
        
        public MakesController(VegaDbContext context, 
                               IMapper mapper,
                               IMakeRepository makeRepository,
                               IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.makeRepository = makeRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
           var makes = await makeRepository.GetMakes();

           return mapper.Map<List<Make>, List<MakeResource>>(makes);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateMakes([FromBody] SaveMakeResource makeResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var make = mapper.Map<SaveMakeResource, Make>(makeResource);
            
            makeRepository.Add(make);
            await unitOfWork.CompleteAsync();

            make = await makeRepository.GetMake(make.Id);

            var result = mapper.Map<Make, MakeResource>(make);

            return Ok(result);
        }
    }
}