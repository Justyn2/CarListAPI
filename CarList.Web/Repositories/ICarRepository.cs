using System;
using System.Collections.Generic;
using CarList.Web.Models;

namespace CarList.Web.Repositories
{
    public interface ICarRepository
    {
        IList<Car> GetAllCars(int count = 0 );
        Car GetCarById(string id);
        void Add(Car car);
        void Update(string id, Car car);
        void Remove(string id);
    }
    
}