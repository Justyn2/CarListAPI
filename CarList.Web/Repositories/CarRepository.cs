using System;
using System.Collections.Generic;
using System.Linq;
using CarList.Data.Contexts;
using CarList.Data.Domain;
using CarList.Web.Models;

namespace CarList.Web.Repositories
{
    public class CarRepository : ICarRepository
    {
        private static IContext<CarData> _context;
        CarRepository(IContext<CarData> context)
        {
            _context = context;
        }

        public Car GetCarById(string id)
        {
            var carData = _context.GetById(id);
            Car car = new Car()
            {
                Id = carData.Id,
                Make = carData.Make,
                Model = carData.Model,
                Trim = carData.Trim,
                Year = carData.Year
            };
            return car;
        }

        public IList<Car> GetAllCars(int length)
        {
            var cars = _context.GetAll().Select(carData =>
                    new Car()
                    {
                        Id = carData.Id,
                        Make = carData.Make,
                        Model = carData.Model,
                        Trim = carData.Trim,
                        Year = carData.Year
                    }
            );
            
            return cars.ToList();
        }

        public void AddCar(Car car)
        {
            var carData = new CarData()
            {
                    Id = car.Id,
                    Make = car.Make,
                    Model = car.Model,
                    Trim = car.Trim,
                    Year = car.Year
            };
            
            _context.Save(carData);
        }

        public void RemoveCar(string id)
        {
            _context.Delete(id);
        }

        public void UpdateCar(Car car)
        {
            var carData = new CarData()
            {
                Id = car.Id,
                Make = car.Make,
                Model = car.Model,
                Trim = car.Trim,
                Year = car.Year
            };
            
        }
    }
}