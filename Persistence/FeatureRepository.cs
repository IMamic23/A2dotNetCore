using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using _mosh_A2.Controllers.Resources;
using _mosh_A2.Core;
using _mosh_A2.Models;
using Microsoft.EntityFrameworkCore;

namespace _mosh_A2.Persistence
{
    public class FeatureRepository : IFeatureRepository
    {
        private readonly VegaDbContext context;

        public FeatureRepository(VegaDbContext context)
        {
            this.context = context;
        }
        public void Add(Feature feature)
        {
            context.Features.Add(feature);
        }

        public async Task<Feature> GetFeature(int id, bool includeRelated)
        {
            if(!includeRelated)
                return await context.Features.FindAsync(id);

            return await context.Features.SingleOrDefaultAsync(f => f.Id == id);
        }

        public async Task<List<Feature>> GetFeatures()
        {
            return await context.Features.ToListAsync();
        }

        public void Remove(Feature feature)
        {
            context.Features.Remove(feature);
        }

        public void Update(Feature feature)
        {
            context.Features.Update(feature);
        }
    }
}