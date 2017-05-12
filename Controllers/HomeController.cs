using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApplicationBasic.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
        /*[HttpGet("/api/makes")] 
          public IEnumerable<Make> GetMakes() {

          }*/
        /*[HttpGet("/api/features")] 
          public IEnumerable<Feature> GetFeatures() {

          }*/

    }
}
