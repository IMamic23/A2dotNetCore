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
  [Route("/api/features")]
    public class FeaturesController : Controller
  {
    private readonly VegaDbContext context;
    private readonly IMapper mapper;
    private readonly IFeatureRepository featureRepository;
    private readonly IUnitOfWork unitOfWork;
    public FeaturesController(VegaDbContext context, IMapper mapper, IFeatureRepository featureRepository, IUnitOfWork unitOfWork)
    {
      this.mapper = mapper;
      this.featureRepository = featureRepository;
      this.context = context;
      this.unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
    {
      //var features = await context.Features.ToListAsync();
      var features = await featureRepository.GetFeatures();

      return mapper.Map<List<Feature>, List<KeyValuePairResource>>(features); 
    }
    [HttpPost]
      public async Task<IActionResult> CreateFeatures([FromBody] KeyValuePairResource featureResource)
      {
          if (!ModelState.IsValid)
              return BadRequest(ModelState);
          
          var feature = mapper.Map<KeyValuePairResource, Feature>(featureResource);
          
          featureRepository.Add(feature);
          await unitOfWork.CompleteAsync();

          feature = await featureRepository.GetFeature(feature.Id);

          var result = mapper.Map<Feature, KeyValuePairResource>(feature);

          return Ok(result);
      }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFeature(int id)
    {
      var feature = await featureRepository.GetFeature(id, includeRelated: false);

      if (feature == null)
          return NotFound();

      featureRepository.Remove(feature);
      await unitOfWork.CompleteAsync();

      return Ok(id);
    }
  }
}