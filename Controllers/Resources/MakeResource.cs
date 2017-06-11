using System.Collections.Generic;
using System.Collections.ObjectModel;
using _mosh_A2.Core.Models;

namespace _mosh_A2.Controllers.Resources
{
    public class MakeResource : KeyValuePairResource
    {
        public ICollection<KeyValuePairResource> Models { get; set; } 
        public MakeResource()
        {
            Models = new Collection<KeyValuePairResource>();
        }
    }
}