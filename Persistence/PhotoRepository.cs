using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _mosh_A2.Controllers.Resources;
using _mosh_A2.Core;
using _mosh_A2.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace _mosh_A2.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContext context;
        public PhotoRepository(VegaDbContext context)
        {
            this.context = context;
        }
        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            return await context.Photos
                .Where(p => p.VehicleId == vehicleId)
                .ToListAsync();
        }

        public async Task<Photo> GetPhoto(int id)
        {
            return await context.Photos.FindAsync(id);
        }

        public void Remove(Photo photo) 
        {
            context.Photos.Remove(photo);
        }
    }
}