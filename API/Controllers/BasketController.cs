using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController:BaseApiController
    {
        private readonly IBasketRepository _baskeRepository;
        public BasketController(IBasketRepository baskeRepository)
        {
            _baskeRepository = baskeRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string basketId){
            var basket = await _baskeRepository.GetBasketAsync(basketId);

            return Ok(basket ?? new CustomerBasket(basketId));
        }


        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket){
            var updateBasket = await _baskeRepository.UpdateBasketAsync(basket);

            return Ok(updateBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketById(string basketId){
            await _baskeRepository.DeleteBasketAsync(basketId);
        }

    }
}