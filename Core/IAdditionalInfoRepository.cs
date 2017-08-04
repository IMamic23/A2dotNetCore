using System.Collections.Generic;
using System.Threading.Tasks;
using _mosh_A2.Core.Models;

namespace _mosh_A2.Core
{
    public interface IAdditionalInfoRepository
    {
        Task<AdditionalInfo> GetAdditionalInfo(int vehicleId);
        void Remove(AdditionalInfo model);
        void Add(AdditionalInfo model);
        void Update(AdditionalInfo model);
    }
}