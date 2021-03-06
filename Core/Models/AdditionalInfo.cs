using System.ComponentModel.DataAnnotations;

namespace _mosh_A2.Core.Models
{
    public class AdditionalInfo
    {
        public int VehicleId { get; set; }
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string ModelType { get; set; }
        public int YearOfManafacture { get; set; }
        public int FirstRegistrationYear { get; set; }
        public double Mileage { get; set; }
        public string ModelEngineType { get; set; }
        public int ModelEnginePower { get; set; }
        public string GearType { get; set; }
        public int NoOfGears { get; set; }
        public double FuelConsumption { get; set; }
        public string CarState { get; set; }
        public int OwnerNo { get; set; }
        public string CarCurrentLocation { get; set; }
        public string CarDescription { get; set; }
        public string CarColor { get; set; }
    }
}