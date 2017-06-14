using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using _mosh_A2.Core.Models;

namespace _mosh_A2.Models
{
    public class Make
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public ICollection<Model> Models { get; set; }
        public Logo Logo { get; set; }
        public Make()
        {
            Models = new Collection<Model>();
        }
    }
}