using CarList.Data.Contexts;

namespace CarList.Data.Domain
{
    public class CarData : DataStoreObject
    {
        public string Make { get; set; }
        public string Model { get; set; }
        public string Trim { get; set; }
        public string Year { get; set; }

        public bool Equals(CarData other)
        {
            return string.Equals(Make, other.Make) && string.Equals(Model, other.Model) && string.Equals(Trim, other.Trim) && string.Equals(Year, other.Year);
        }
    }
}