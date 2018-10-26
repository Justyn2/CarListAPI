using System;
using CarList.Data.Contexts;
using CarList.Data.Domain;
using CarList.Web.Models;
using CarList.Web.Repositories;
using NSubstitute;
using Xunit;

namespace CarList.Web.Test
{
    public class CarRepositoryTests
    {
        private readonly IContext<CarData> _context = Substitute.For<IContext<CarData>>();
        
        [Fact]
        public void CarRepository_Test_Save()
        {
            var repository = new CarRepository(_context);
            var carData = new CarData(){Make = "Chevy", Model = "Camaro", Trim = "SS", Year = "1971"};
            var car = new Car(){Make = "Chevy", Model = "Camaro", Trim = "SS", Year = "1971"};
            repository.Add(car);
            _context.Received(1).Save(Arg.Is<CarData>(x => x.Equals(carData)));
        }
        
        [Fact]
        public void CarRepository_Test_Update()
        {
            var repository = new CarRepository(_context);
            var carData = new CarData(){Make = "Chevy", Model = "Camaro", Trim = "SS", Year = "1971"};
            var car = new Car(){Make = "Chevy", Model = "Camaro", Trim = "SS", Year = "1971"};
            repository.Update("id-of-car",car);
            _context.Received(1).Update("id-of-car",Arg.Is<CarData>(x=>x.Equals(carData)));
        }
    }
}