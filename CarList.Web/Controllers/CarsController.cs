using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarList.Web.Models;
using CarList.Web.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarList.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {

        private const int pageSize = 50;
        private static ICarRepository _carRepository;

        public CarsController( ICarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Car>> Get()
        {
            return _carRepository.GetAllCars(pageSize).ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(string id)
        {
            var car = _carRepository.GetCarById(id);
            return new JsonResult(car);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            // For more information on protecting this API from Cross Site Request Forgery (CSRF) attacks, see https://go.microsoft.com/fwlink/?LinkID=717803
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            // For more information on protecting this API from Cross Site Request Forgery (CSRF) attacks, see https://go.microsoft.com/fwlink/?LinkID=717803
        }
    }
}