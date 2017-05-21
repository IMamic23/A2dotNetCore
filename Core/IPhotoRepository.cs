using System.Collections.Generic;
using System.Threading.Tasks;
using _mosh_A2.Controllers.Resources;
using _mosh_A2.Core.Models;

namespace _mosh_A2.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
        Task<Photo> GetPhoto(int id);
        void Remove(Photo photo);
    }
}