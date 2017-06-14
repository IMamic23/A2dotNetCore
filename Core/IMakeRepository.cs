using System.Collections.Generic;
using System.Threading.Tasks;
using _mosh_A2.Controllers.Resources;
using _mosh_A2.Core.Models;
using _mosh_A2.Models;

namespace _mosh_A2.Core
{
    public interface IMakeRepository
    {
        Task<Make> GetMake(int id, bool includeRelated = true);
        Task<List<Make>> GetMakes();
        void Remove(Make make);
        void Add(Make make);
        void Update(Make make);
    }
}