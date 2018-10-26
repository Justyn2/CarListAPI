using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using CarList.Data.Contexts;
using CarList.Data.Domain;
using Newtonsoft.Json;
using Xunit;


namespace CarList.Data.Test
{
    public class JsonContextUnitTests
    {
        const string TestFile = "test.json";
        [Fact]
        public void JsonContextTest_Writing_and_Reading_Save_from_JSON()
        {
            
            File.Delete(TestFile);
            var context =  new JsonContext<CarData>(TestFile);
            // CarData with Id Set
            var car1 = new CarData(){Id = Guid.NewGuid().ToString(), Make = "Ford", Model = "Taurus", Trim = "SHO", Year = "1998" };
            // CarData with no Id set
            var car2 = new CarData(){ Make = "Ford", Model = "Taurus", Trim = "SEL", Year = "1998" };
            context.Save(car1);
            var cars = context.GetAll();
            Assert.True( cars.Count == 1, "There is exactly one car");
            var savedCar = cars.First();
            Assert.True(savedCar.Id == car1.Id);
            Assert.True(savedCar.Equals(car1));
            // check saving when no Id
            context.Save(car2);
            cars = context.GetAll();
            // we don't know wha t the new Id will be, so search by car
            savedCar = cars.FirstOrDefault(x=>x.Equals(car2) && !string.IsNullOrEmpty(x.Id));
            Assert.True( cars.Count == 2, "There are now 2 cars");
            Assert.True(savedCar.Id != car1.Id);
            Assert.True(savedCar.Equals(car2));
            var guid = new Guid();
            var idIsGuid = Guid.TryParse(savedCar.Id, out guid);
            Assert.True(idIsGuid);
            Assert.True(guid.ToString() != new Guid().ToString());

        }
        [Fact]
        public void JsonContextTest_Writing_and_Reading_Update_from_JSON()
        {

            File.Delete(TestFile);
            var context =  new JsonContext<CarData>(TestFile);
            var car1 = new CarData(){Id = Guid.NewGuid().ToString(), Make = "Ford", Model = "Taurus", Trim = "SHO", Year = "1998" };
            var car2 = new CarData(){Id = Guid.NewGuid().ToString(), Make = "Ford", Model = "Taurus", Trim = "SEL", Year = "1998" };
            context.Save(car1);
            context.Update(car1.Id, car2);
            var cars = context.GetAll();
            Assert.True( cars.Count == 1, "There is exactly one car");
            var savedCar = cars.First();
            Assert.True(savedCar.Id == car1.Id);
            Assert.False(savedCar.Id == car2.Id);
            Assert.False(savedCar.Equals(car1));
            Assert.True(savedCar.Equals(car2));
        }
        [Fact]
        public void JsonContextTest_Writing_and_Reading_Deletion_from_JSON()
        {

            File.Delete(TestFile);
            var context =  new JsonContext<CarData>(TestFile);
            var car1 = new CarData(){Id = Guid.NewGuid().ToString(), Make = "Ford", Model = "Taurus", Trim = "SHO", Year = "1998" };
            context.Save(car1);
            var cars = context.GetAll();
            Assert.True( cars.Count == 1, "There is exactly one car");
            context.Delete(car1.Id);
            cars = context.GetAll();
            Assert.True( cars.Count == 0, "There are no more cars");
            cars = JsonConvert.DeserializeObject<List<CarData>>(File.ReadAllText(TestFile));
            Assert.True(cars.Count == 1, "the car was deprecated, not fully deleted" );
        }
        [Fact]
        public void JsonContextTest_Writing_and_Reading_GetById_from_JSON()
        {
          
            File.Delete(TestFile);
            var context =  new JsonContext<CarData>(TestFile);
            var car1 = new CarData(){Id = Guid.NewGuid().ToString(), Make = "Ford", Model = "Taurus", Trim = "SHO", Year = "1998" };
            var car2 = new CarData(){Id = Guid.NewGuid().ToString(), Make = "Ford", Model = "Taurus", Trim = "SEL", Year = "1998" };
            context.Save(car1);
            context.Save(car2);
            var car1Get = context.GetById(car1.Id);
            var car2Get = context.GetById(car2.Id);
            Assert.True(car1Get.Id == car1.Id);
            Assert.True(car2Get.Id == car2.Id);
            Assert.True(car1Get.Equals(car1));
            Assert.True(car2Get.Equals(car2));
        }
    }
}