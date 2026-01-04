using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace OrderService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IHttpClientFactory _http;

        public OrdersController(IHttpClientFactory http) => _http = http;

        //[HttpGet]
        //public async Task<IActionResult> Get()
        //{
        //    var client = _http.CreateClient("product-client");
        //    //var response = await client.GetAsync("/api/products");
        //    var response = await client.GetAsync("api/products");
        //    var products = await response.Content.ReadAsStringAsync();


        //    return Ok(new
        //    {
        //        OrderId = 101,
        //        Products = products
        //    });
        //}
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var client = _http.CreateClient("product-client");

            // Forward JWT token
            if (Request.Headers.ContainsKey("Authorization"))
            {
                client.DefaultRequestHeaders.Add("Authorization", Request.Headers["Authorization"].ToString());
            }

            var response = await client.GetAsync("api/products");

            var products = await response.Content.ReadAsStringAsync();

            return Ok(new
            {
                OrderId = 101,
                Products = products
            });
        }

    }
}
