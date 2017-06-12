using System.ComponentModel.DataAnnotations;

namespace _mosh_A2.Core.Models
{
    public class Logo
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string FileName { get; set; }

        public int MakeId { get; set; }
    }
}