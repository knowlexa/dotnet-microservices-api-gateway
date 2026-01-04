using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ProductService.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductsController : ControllerBase
    {

        [HttpGet]
     public IActionResult GetProducts() => Ok(new[] {
                       new { Id = 1, Name = "Laptop" },
                       new { Id = 2, Name = "Mouse" }
});

    }
}
