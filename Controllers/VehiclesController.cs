using System.Threading.Tasks;
using _mosh_A2.Controllers.Resources;
using _mosh_A2.Models;
using _mosh_A2.Persistence;
using _mosh_A2.Core;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Collections;
using _mosh_A2.Core.Models;
using Microsoft.AspNetCore.Authorization;

namespace _mosh_A2.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IVehicleRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        public VehiclesController(IMapper mapper,
                                  IVehicleRepository repository,
                                  IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost]
        //[Authorize(Policies.RequireAdminRole)]
        //[Authorize]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = _mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            _repository.Add(vehicle);
            await _unitOfWork.CompleteAsync();

            vehicle = await _repository.GetVehicle(vehicle.Id);

            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpPut("{id}")]
        //[Authorize]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            //var vehicle = await _repository.GetVehicle(id);

            //if (vehicle == null)
            //    return NotFound();
            var vehicle = new Vehicle();
            _mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;
            vehicle.Id = id;
            
            var entity = await _repository.GetVehicle(id);
            _repository.GetContext().Entry(entity).CurrentValues.SetValues(vehicle);

            //repository.Update(vehicle);
            vehicle = await _repository.GetVehicle(vehicle.Id);
            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);
            //var result = _repository.Update(id, vehicle);
            
            if(result == null)
                return NotFound("Vehicle not found after update");
            
            await _unitOfWork.CompleteAsync();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _repository.GetVehicle(id, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            _repository.Remove(vehicle);
            await _unitOfWork.CompleteAsync();

            return Ok(id);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await _repository.GetVehicle(id);

            if (vehicle == null)
                return NotFound();

            var vehicleResource = _mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }

        [HttpGet]
        public async Task<QueryResultResource<VehicleResource>> GetVehicles(VehicleQueryResource filterResource)
        {
            var filter = _mapper.Map<VehicleQueryResource, VehicleQuery>(filterResource);
            var queryResult = await _repository.GetVehicles(filter);

            return _mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult);
        }

    }
}