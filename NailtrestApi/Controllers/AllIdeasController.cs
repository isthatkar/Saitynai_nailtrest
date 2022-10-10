using Microsoft.AspNetCore.Mvc;
using NailtrestApi.Data.Dtos.Ideas;
using NailtrestApi.Data.Entities;
using NailtrestApi.Data.Repositories;

namespace NailtrestApi.Controllers
{
    [Route("api/ideas")]
    public class AllIdeasController : ControllerBase
    {
        private readonly IIdeasRepository _ideasRepository;

        public AllIdeasController(IIdeasRepository ideasRepository)
        {
            _ideasRepository = ideasRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<IdeaDto>> GetMany()
        {
            var collections = await _ideasRepository.GetAllAsync();
            return collections.Select(d => GetCollectionIdeaDto(d));
        }

        private IdeaDto GetCollectionIdeaDto(Idea d)
        {
            return new IdeaDto(
                d.Id,
                d.Name,
                d.Description,
                d.CreatedDate,
                d.ImageUrl,
                d.Complexity,
                d.RequiredMeans,
                d.Instruction,
                d.IsVerified,
                d.Collection);
        }
    }
}
