using System.Collections.Generic;
using System.Threading.Tasks;
using _mosh_A2.Controllers.Resources;
using _mosh_A2.Core;
using _mosh_A2.Core.Models;
using _mosh_A2.Models;
using Microsoft.EntityFrameworkCore;

namespace _mosh_A2.Persistence
{
    public class MakeRepository : IMakeRepository
    {
        private readonly VegaDbContext context;

        public MakeRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<List<Make>> GetMakes()
        {
            return await context.Makes
                .Include(m => m.Models)
                .Include(m => m.Logo)
                .ToListAsync();
        }

        public void Remove(Make make)
        {
            context.Makes.Remove(make);
        }
        public void Add(Make make) 
        {
            context.Makes.Add(make);
        }
        public void Update(Make make)
        {
            context.Makes.Update(make);
        }
        public async Task<Make> GetMake(int id, bool includeRelated = true)
        {
            if(!includeRelated)
                return await context.Makes.FindAsync(id);
            
            return await context.Makes
                .Include(m => m.Models)
                .SingleOrDefaultAsync(m => m.Id == id);
        }
    }
}