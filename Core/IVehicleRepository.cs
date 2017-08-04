using System.Collections.Generic;
using System.Threading.Tasks;
using _mosh_A2.Core.Models;
using _mosh_A2.Models;

namespace _mosh_A2.Core
{
    public interface IVehicleRepository
    {
        Persistence.VegaDbContext GetContext();

         Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);
         Task<Vehicle> Update(int id, Vehicle vehicle); 
         Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery filter);
    }
}