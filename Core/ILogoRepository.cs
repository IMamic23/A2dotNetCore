using System.Threading.Tasks;
using _mosh_A2.Core.Models;

namespace _mosh_A2.Core
{
    public interface ILogoRepository
    {
        Task<Logo> GetLogo(int makeId);
        void Remove(Logo logo);
        void Add(Logo logo);
    }
}