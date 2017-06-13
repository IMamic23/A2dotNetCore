using System.Collections.Generic;
using System.Threading.Tasks;
using _mosh_A2.Models;

namespace _mosh_A2.Core
{
    public interface IFeatureRepository
    {
        Task<Feature> GetFeature(int id, bool includeRelated = true);
        Task<List<Feature>> GetFeatures();
        void Remove(Feature feature);
        void Add(Feature feature);
        void Update(Feature feature);
    }
}