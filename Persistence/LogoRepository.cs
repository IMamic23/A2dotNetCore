using System.Linq;
using System.Threading.Tasks;
using _mosh_A2.Core;
using _mosh_A2.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace _mosh_A2.Persistence
{
    public class LogoRepository : ILogoRepository
    {
        private readonly VegaDbContext context;

        public LogoRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<Logo> GetLogo(int makeId)
        {
            return await context.Logos.Where(l => l.MakeId == makeId).FirstOrDefaultAsync();
        }

        public void Remove(Logo logo)
        {
            context.Logos.Remove(logo);
        }

        public void Add(Logo logo)
        {
            context.Logos.Add(logo);
        }
    }
}