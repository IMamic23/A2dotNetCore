using System;
using System.Threading.Tasks;
using _mosh_A2.Core;
using _mosh_A2.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace _mosh_A2.Persistence
{
    public class AdditionalInfoRepository : IAdditionalInfoRepository
    {
        private readonly VegaDbContext context;
        public AdditionalInfoRepository(VegaDbContext context)
        {
            this.context = context;
        }
        public async Task<AdditionalInfo> GetAdditionalInfo(int vehicleId)
        {
            return await context.AdditionalInfo.SingleOrDefaultAsync(a => a.VehicleId == vehicleId);
        }
        public void Add(AdditionalInfo additionalInfo)
        {
            context.AdditionalInfo.Add(additionalInfo);
        }

        public void Remove(AdditionalInfo additionalInfo)
        {
            context.AdditionalInfo.Remove(additionalInfo);
        }

        public void Update(AdditionalInfo additionalInfo)
        {
            context.AdditionalInfo.Update(additionalInfo);
        }
    }
}