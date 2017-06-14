using System.Collections.Generic;
using System.Threading.Tasks;
using _mosh_A2.Core;
using _mosh_A2.Models;
using Microsoft.EntityFrameworkCore;

namespace _mosh_A2.Persistence
{
    public class ModelRepository : IModelRepository
    {
         private readonly VegaDbContext context;

        public ModelRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Model>> GetModels()
        {
            return await context.Models
                .Include(m => m.Make).ToListAsync();
        }

        public void Remove(Model model)
        {
            context.Models.Remove(model);
        }
        public void Add(Model model) 
        {
            context.Models.Add(model);
        }
        public void Update(Model model)
        {
            context.Models.Update(model);
        }
        public async Task<Model> GetModel(int id, bool includeRelated = true)
        {
            if(!includeRelated)
                return await context.Models.FindAsync(id);
            
            return await context.Models.SingleOrDefaultAsync(m => m.Id == id);
        }
    }
}