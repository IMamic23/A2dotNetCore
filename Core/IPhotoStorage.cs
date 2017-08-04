using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace _mosh_A2.Core
{
    public interface IPhotoStorage
    {
         Task<string> StorePhoto(string uploadsFolderPath, IFormFile file);
    }
}