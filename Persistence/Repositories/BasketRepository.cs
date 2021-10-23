using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace Persistence.Repositories
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database;

        public BasketRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await _database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            var data =await _database.StringGetAsync(basketId);

            return data.IsNullOrEmpty ? null :JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket model)
        {
            var create = await _database
            .StringSetAsync(model.Id,JsonSerializer.Serialize(model), System.TimeSpan.FromDays(30));

            if(!create) return null;

            return await GetBasketAsync(model.Id);

        }
    }
}