using System.Threading.Tasks;
using _mosh_A2.Core.Models;
using _mosh_A2.Models;
using Microsoft.AspNetCore.Http;

namespace _mosh_A2.Core
{
    public interface IPhotoService
    {
         Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadsFolderPath);
    }
}