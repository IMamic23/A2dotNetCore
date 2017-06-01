using System.Threading.Tasks;
using _mosh_A2.Core;
using _mosh_A2.Core.Models;

namespace _mosh_A2.Persistence
{
    public class LogoRepository : ILogoRepository
    {
        private readonly VegaDbContext context;

        public LogoRepository(VegaDbContext context)
        {
            this.context = context;
        }

        public async Task<Logo> GetLogo(int vehicleId)
        {
            return await context.Logos.FindAsync(vehicleId);
        }

        public void Remove(Logo logo)
        {
            context.Logos.Remove(logo);
        }
    }
}