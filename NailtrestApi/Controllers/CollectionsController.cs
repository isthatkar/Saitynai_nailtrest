using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using NailtrestApi.Auth.Model;
using NailtrestApi.Data;
using NailtrestApi.Data.Dtos.Collections;
using NailtrestApi.Data.Entities;
using NailtrestApi.Data.Repositories;
using System.Security.Claims;
using System.Text.Json;

namespace NailtrestApi.Controllers
{
    [ApiController]
    [Authorize(Roles = ForumRoles.User)]
    [Route("api/collections")]
    public class CollectionsController : ControllerBase
    {
        private readonly ICollectionsRepository _collectionRepository;
        private readonly IAuthorizationService _authorizationService;

        public CollectionsController(ICollectionsRepository collectionRepository, IAuthorizationService authorizationService)
        {
           _collectionRepository = collectionRepository;
            _authorizationService = authorizationService;
        }

     /*//  [HttpGet]
        public async Task<IEnumerable<CollectionDto>> GetMany()
        {
            var collections = await _collectionRepository.GetManyAsync();
            return collections.Select(d => new CollectionDto(d.Id, d.Name, d.Description, d.CreatedDate));
        }*/

        // /collections/pages?pageNumber=1&pageSize=5
        [HttpGet(Name = "GetCollections")]
        public async Task<IEnumerable<CollectionDto>> GetManyPages([FromQuery] CollectionsParameters parameters)
        {
            var collections = await _collectionRepository.GetManyAsync(parameters);

            var previousPageLink = collections.HasPrevious ?
            CreateCollectionsResourceUri(parameters,
                ResourceUriType.PreviousPage) : null;

            var nextPageLink = collections.HasNext ?
                CreateCollectionsResourceUri(parameters,
                    ResourceUriType.NextPage) : null;

            var paginationMetadata = new
            {
                totalCount = collections.TotalCount,
                pageSize = collections.PageSize,
                currentPage = collections.CurrentPage,
                totalPages = collections.TotalPages,
                previousPageLink,
                nextPageLink
            };

            Response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationMetadata));

            return collections.Select(d => new CollectionDto(d.Id, d.Name, d.Description, d.CreatedDate));
        }

        [HttpGet]
        [Route("{collectionId}", Name = "GetCollection")]
        public async Task<ActionResult<CollectionDto>> Get(int collectionId)
        {
            var collection = await _collectionRepository.GetAsync(collectionId);

            if(collection == null)
            {
                return NotFound(); //404
            }

            return new CollectionDto(collection.Id, collection.Name, collection.Description, collection.CreatedDate);
        }

        [HttpPost]
        public async Task<ActionResult<CollectionDto>> Create(CreateCollectionDto createCollectionDto)
        {
            var collection = new Collection 
            { 
                Name = createCollectionDto.Name,
                Description = createCollectionDto.Description,
                CreatedDate = DateTime.UtcNow,
                UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            };

            await _collectionRepository.CreateAsync(collection);

            //201
            return Created("", new CollectionDto(collection.Id, collection.Name, collection.Description, collection.CreatedDate));

        }

        [HttpPut]
        [Route("{collectionId}")]
        public async Task<ActionResult<CollectionDto>> Update(int collectionId, UpdateCollectionDto updateCollectionDto)
        {
            var collection = await _collectionRepository.GetAsync(collectionId);

            if (collection == null)
            {
                return NotFound(); //404
            }

            var authResult = await _authorizationService.AuthorizeAsync(User, collection, PolicyNames.ResourceOwner);

            if (!authResult.Succeeded)
            {
                return Forbid(); //403
            }

            collection.Name = updateCollectionDto.Name is null ? collection.Name : updateCollectionDto.Name;
            collection.Description = updateCollectionDto.Description is null ? collection.Description : updateCollectionDto.Description;
            await _collectionRepository.UpdateAsync(collection);

            return Ok(new CollectionDto(collection.Id, collection.Name, collection.Description, collection.CreatedDate));
        }


        [HttpDelete]
        [Route("{collectionId}")]
        public async Task<ActionResult> Remove(int collectionId)
        {
            var collection = await _collectionRepository.GetAsync(collectionId);

            if (collection == null)
            {
                return NotFound(); //404
            }

            var authResult = await _authorizationService.AuthorizeAsync(User, collection, PolicyNames.ResourceOwner);

            if (!authResult.Succeeded)
            {
                return Forbid(); //403
            }

            await _collectionRepository.DeleteAsync(collection);

            //204
            return NoContent();
        }

        private string? CreateCollectionsResourceUri(
       CollectionsParameters parameters,
       ResourceUriType type)
        {
            return type switch
            {
                ResourceUriType.PreviousPage => Url.Link("GetCollections",
                    new
                    {
                        pageNumber = parameters.PageNumber - 1,
                        pageSize = parameters.PageSize,
                    }),
                ResourceUriType.NextPage => Url.Link("GetCollections",
                    new
                    {
                        pageNumber = parameters.PageNumber + 1,
                        pageSize = parameters.PageSize,
                    }),
                _ => Url.Link("GetCollections",
                    new
                    {
                        pageNumber = parameters.PageNumber,
                        pageSize = parameters.PageSize,
                    })
            };
        }
    }
}
