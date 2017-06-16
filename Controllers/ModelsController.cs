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
    [Route("/api/models")]
    public class ModelsController : Controller
    {
        private readonly IMapper mapper;
        private readonly IModelRepository modelRepository;
        private readonly IUnitOfWork unitOfWork;
        
        public ModelsController( IMapper mapper,
                                 IModelRepository modelRepository,
                                 IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.modelRepository = modelRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<ModelResource>> GetModels()
        {
           var models = await modelRepository.GetModels();
        
           return mapper.Map<List<Model>, List<ModelResource>>(models);
        }

        [HttpPost]
        public async Task<IActionResult> CreateModels([FromBody] SaveModelResource modelResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var model = mapper.Map<SaveModelResource, Model>(modelResource);
            
            modelRepository.Add(model);
            await unitOfWork.CompleteAsync();

            model = await modelRepository.GetModel(model.Id);

            var result = mapper.Map<Model, ModelResource>(model);

            return Ok(result);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateModel(int id, [FromBody] KeyValuePairResource modelResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var model = await modelRepository.GetModel(id);

            if (model == null)
                return NotFound();

            mapper.Map<KeyValuePairResource, Model>(modelResource, model);

            modelRepository.Update(model);
            await unitOfWork.CompleteAsync();

            model = await modelRepository.GetModel(model.Id);
            var result = mapper.Map<Model, ModelResource>(model);

            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModel(int id)
        {
            var model = await modelRepository.GetModel(id, includeRelated: false);

            if (model == null)
                return NotFound();

            modelRepository.Remove(model);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }
    }
}