using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using _mosh_A2.Core.Models;
using _mosh_A2.Models;

namespace _mosh_A2.Controllers.Resources
{

    public class SaveVehicleResource
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public Model Model { get; set; }
        public bool IsRegistered { get; set; }
        [Required]
        public ContactResource Contact { get; set; }
        public ICollection<int> Features { get; set; }
        public AdditionalInfo AdditionalInfo { get; set; }
        public SaveVehicleResource()
        {
            Features = new Collection<int>();
        }
    }
}