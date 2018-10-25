using System;
using System.IO;
using System.Linq;
using CarList.Data.Contexts;
using CarList.Data.Domain;
using Xunit;


namespace CarList.Data.Test
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
           const string testFile = "test.json";
           File.Delete(testFile);
           var context =  new JsonContext<CarData>(testFile);
           var car1 = new CarData(){Id = Guid.NewGuid().ToString(), Make = "Ford", Model = "Taurus", Trim = "SHO", Year = "1998" };
           var car2 = new CarData(){Id = Guid.NewGuid().ToString(), Make = "Ford", Model = "Taurus", Trim = "SEL", Year = "1998" };
           context.Save(car1);
           var cars = context.GetAll();
           Assert.True( cars.Count == 1, "There is exactly one car");
           var savedCar = cars.First();
           Assert.True(savedCar.Id == car1.Id);
           Assert.False(savedCar.Id == car2.Id);
           Assert.True(savedCar.Equals(car1));
           Assert.False(savedCar.Equals(car2));
        }
    }
}