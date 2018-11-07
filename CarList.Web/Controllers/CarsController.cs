// using System;

using System;
using System.Collections.Generic;
using System.Linq;
// using System.Threading.Tasks;
using CarList.Web.Models;
using CarList.Web.Repositories;
using Microsoft.AspNetCore.Cors;
// using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarList.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {

        private const int PageSize = 50;
        private static ICarRepository _carRepository;

        public CarsController( ICarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        // GET api/cars
        [HttpGet]
        public ActionResult<IEnumerable<Car>> Get()
        {
            return _carRepository.GetAllCars(PageSize).ToList();
        }

        // GET api/cars/{GUID}
        [HttpGet("{id}")]
        public ActionResult<string> Get(string id)
        {
            var car = _carRepository.GetCarById(id);
            if (car == null)
            {
                return NotFound();
            }
            var result = new JsonResult(car);
            return result;
        }

        // POST api/cars
        [HttpPost]
        public void Post([FromBody] Car car)
        {
            // POST should only create a new item, so we give it a new unique id
            car.Id = Guid.NewGuid().ToString();
            _carRepository.Add(car);
        }

        // PUT api/cars/{GUID}
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] Car car)
        {
            _carRepository.Update(id, car);
        }

        // DELETE api/cars/{GUID}
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _carRepository.Remove(id);
        }
    }
}