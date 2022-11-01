using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using NailtrestApi.Auth.Model;
using NailtrestApi.Data.Dtos.Ideas;
using NailtrestApi.Data.Entities;
using NailtrestApi.Data.Repositories;
using System.Data;
using System.Security.Claims;

namespace NailtrestApi.Controllers
{
    [ApiController]
    [Authorize(Roles = ForumRoles.User)]
    [Route("api/collections/{collectionId}/ideas")]
    public class IdeasController : ControllerBase
    {
        private readonly IIdeasRepository _ideasRepository;
        private readonly IAuthorizationService _authorizationService;
        private readonly ICollectionsRepository _collectionRepository;

        public IdeasController(IIdeasRepository ideasRepository, 
            ICollectionsRepository collectionsRepository,
            IAuthorizationService authorizationService)
        {
            _ideasRepository = ideasRepository;
            _authorizationService = authorizationService;
            _collectionRepository = collectionsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<CollectionsIdeaDto>> GetMany(int collectionId)
        {
            var collections = await _ideasRepository.GetManyAsync(collectionId);
            return collections.Select(d => GetCollectionIdeaDto(d));
        }

        [HttpGet]
        [Route("{ideaId}")]
        public async Task<ActionResult<IdeaDto>> Get(int collectionId, int ideaId)
        {
            if (!(await CollectionAndIdeaExists(collectionId, ideaId)))
            {
                return NotFound(); //404
            }

            var idea = await _ideasRepository.GetAsync(ideaId);

            return GetIdeaDto(idea!);
        }

        [HttpPost]
        public async Task<ActionResult<IdeaDto>> Create(int collectionId, CreateIdeaDto createIdeaDto)
        {
            var collection = await _collectionRepository.GetAsync(collectionId);
            if (collection == null)
            {
                return NotFound();
            }

            if (createIdeaDto.ImageUrl != null)
            {
                if (!Uri.IsWellFormedUriString(createIdeaDto.ImageUrl, UriKind.Absolute))
                {
                    return BadRequest("Image URL is not valid! >:(");
                }
            }

            var idea = new Idea
            {
                Name = createIdeaDto.Name,
                Description = createIdeaDto.Description,
                CreatedDate = DateTime.UtcNow,
                ImageUrl = createIdeaDto.ImageUrl,
                Complexity = createIdeaDto.Complexity,
                RequiredMeans = createIdeaDto.RequiredMeans,
                Instruction = createIdeaDto.Instruction,
                IsVerified = false,
                Collection = collection,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };

            await _ideasRepository.CreateAsync(idea);

            //201
            return Created("", GetIdeaDto(idea));

        }

        [HttpPut]
        [Route("{ideaId}")]
        public async Task<ActionResult<IdeaDto>> Update(int collectionId, int ideaId, UpdateIdeaDto updateIdeaDto)
        {
            if (! (await CollectionAndIdeaExists(collectionId, ideaId)))
            {
                return NotFound(); //404
            }

            var idea = await _ideasRepository.GetAsync(ideaId);

            if(updateIdeaDto!.ImageUrl != null)
            {
                if (!Uri.IsWellFormedUriString(updateIdeaDto.ImageUrl, UriKind.Absolute))
                {
                    return BadRequest("Image URL is not valid! >:(");
                }
            }

            var authResult = await _authorizationService.AuthorizeAsync(User, idea, PolicyNames.ResourceOwner);

            if (!authResult.Succeeded)
            {
                return Forbid(); //403
            }

            idea!.Name = updateIdeaDto.Name is null ? idea!.Name : updateIdeaDto.Name;
            idea.Description = updateIdeaDto.Description is null ? idea!.Description : updateIdeaDto.Description;
            idea.RequiredMeans = updateIdeaDto.RequiredMeans is null ? idea!.RequiredMeans : updateIdeaDto.RequiredMeans;
            idea.Instruction = updateIdeaDto.Instruction is null ? idea!.Instruction : updateIdeaDto.Instruction;
            idea.Complexity = updateIdeaDto.Complexity is null ? idea!.Complexity : updateIdeaDto.Complexity;
            idea.ImageUrl = updateIdeaDto.ImageUrl is null ? idea!.ImageUrl : updateIdeaDto.ImageUrl;

            await _ideasRepository.UpdateAsync(idea);

            return Ok(GetIdeaDto(idea));
        }

        [HttpDelete]
        [Route("{ideaId}")]
        public async Task<ActionResult> Remove(int collectionId, int ideaId)
        {
            if (!(await CollectionAndIdeaExists(collectionId, ideaId)))
            {
                return NotFound(); //404
            }

            var idea = await _ideasRepository.GetAsync(ideaId);

            var authResult = await _authorizationService.AuthorizeAsync(User, idea, PolicyNames.ResourceOwner);

            if (!authResult.Succeeded)
            {
                return Forbid(); //403
            }

            await _ideasRepository.DeleteAsync(idea!);

            //204
            return NoContent();
        }

        private async Task<bool> CollectionAndIdeaExists(int collectionId, int ideaId)
        {
            var collection = await _collectionRepository.GetAsync(collectionId);

            if (collection == null)
            {
                return false; //404
            }

            var idea = await _ideasRepository.GetAsync(ideaId);

            if (idea == null)
            {
                return false; //404
            }

            return true;
        }
        private IdeaDto GetIdeaDto(Idea d)
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

        private CollectionsIdeaDto GetCollectionIdeaDto(Idea d)
        {
            return new CollectionsIdeaDto(
                d.Id,
                d.Name,
                d.Description,
                d.CreatedDate,
                d.ImageUrl,
                d.Complexity,
                d.RequiredMeans,
                d.Instruction,
                d.IsVerified);
        }
    }
}
