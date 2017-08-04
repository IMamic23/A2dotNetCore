using System.Threading.Tasks;
using _mosh_A2.Core.Models;

namespace _mosh_A2.Core
{
    public interface ILogoRepository
    {
        Task<Logo> GetLogoByMake(int makeId);
        Task<Logo> GetLogoById(int id);
        void Remove(Logo logo);
        void Add(Logo logo);
    }
}