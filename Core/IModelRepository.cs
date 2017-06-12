using System.Collections.Generic;
using System.Threading.Tasks;
using _mosh_A2.Controllers.Resources;
using _mosh_A2.Core.Models;
using _mosh_A2.Models;

namespace _mosh_A2.Core
{
    public interface IModelRepository
    {
        Task<Model> GetModel(int id, bool includeRelated = true);
        Task<List<Model>> GetModels();
        void Remove(Model model);
        void Add(Model model);
        void Update(Model model);
    }
}