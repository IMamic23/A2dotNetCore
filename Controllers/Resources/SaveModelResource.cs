using _mosh_A2.Models;

namespace _mosh_A2.Controllers.Resources
{
    public class SaveModelResource : KeyValuePairResource
    {
        public int MakeId { get; set; }
        public Make Make { get; set; }
    }
}