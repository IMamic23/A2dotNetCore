using System.Collections.Generic;
using System.Collections.ObjectModel;
using _mosh_A2.Core.Models;
using _mosh_A2.Models;

namespace _mosh_A2.Controllers.Resources
{
    public class SaveMakeResource : KeyValuePairResource
    {
        public ICollection<Model> Models { get; set; }
        public int LogoId { get; set; }
        public Logo Logo { get; set; }

        public SaveMakeResource()
        {
            Models = new Collection<Model>();
        }
    }
}