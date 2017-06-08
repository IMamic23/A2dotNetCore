using System.ComponentModel.DataAnnotations;

namespace _mosh_A2.Models
{
      public class Feature
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public double Price { get; set; }
    }
}