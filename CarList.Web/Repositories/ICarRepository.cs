using System;
using System.Collections.Generic;
using CarList.Web.Models;

namespace CarList.Web.Repositories
{
    public interface ICarRepository
    {
       IList<Car> GetAllCars(int count = 0 );
       Car GetCarById(string id);
       void AddCar(Car car);
    }
    
}