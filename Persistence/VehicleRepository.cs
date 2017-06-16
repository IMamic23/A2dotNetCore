using System.Threading.Tasks;
using _mosh_A2.Models;
using Microsoft.EntityFrameworkCore;
using _mosh_A2.Core;
using System.Collections.Generic;
using _mosh_A2.Core.Models;
using System.Linq;
using System.Linq.Expressions;
using System;
using _mosh_A2.Extensions;

namespace _mosh_A2.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;
        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;

        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if(!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
                .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle) 
        {
            context.Vehicles.Add(vehicle);
        }
         public void Remove(Vehicle vehicle) 
        {
            context.Vehicles.Remove(vehicle);
        }
         public void Update(Vehicle vehicle) 
        {
            context.Vehicles.Update(vehicle);
        }

        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj){
            
            var result = new QueryResult<Vehicle>();
            
            var query = context.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .AsQueryable();

            if(queryObj.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);

            if(queryObj.ModelId.HasValue)
                query = query.Where(v => v.ModelId == queryObj.ModelId.Value);

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName
            };
            
            query = query.ApplyOrdering(queryObj, columnsMap);
            
            result.TotalItems = await query.CountAsync();
            query = query.ApplyPaging(queryObj);

            result.Items = await query.ToListAsync();

            return result;
        }
    }
}