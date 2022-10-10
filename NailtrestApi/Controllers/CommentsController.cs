using Microsoft.AspNetCore.Mvc;
using NailtrestApi.Data.Dtos.Comments;
using NailtrestApi.Data.Entities;
using NailtrestApi.Data.Repositories;

namespace NailtrestApi.Controllers
{
    [ApiController]
    [Route("api/ideas/{ideaId}/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly IIdeasRepository _ideasRepository;
        private readonly ICollectionsRepository _collectionRepository;
        private readonly ICommentsRepository _commentsRepository;

        public CommentsController(
            IIdeasRepository ideasRepository,
            ICollectionsRepository collectionsRepository, 
            ICommentsRepository commentsRepository)
        {
            _ideasRepository = ideasRepository;
            _collectionRepository = collectionsRepository;
            _commentsRepository = commentsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<IdeaCommentDto>> GetMany(int ideaId)
        {
            var collections = await _commentsRepository.GetManyAsync(ideaId);
            return collections.Select(d => new IdeaCommentDto(d.Id, d.Content, d.CreatedDate));
        }

        [HttpGet]
        [Route("{commentId}")]
        public async Task<ActionResult<CommentDto>> Get(int ideaId, int commentId)
        {
            if (!(await CollectionAndIdeaAndCommentExists(ideaId, commentId)))
            {
                return NotFound(); //404
            }

            var comment = await _commentsRepository.GetAsync(commentId);

            return GetCommentDto(comment!);

        }

        [HttpPost]
        public async Task<ActionResult<CommentDto>> Create(int ideaId, CreateCommentDto createCommentDto)
        {
            
            var idea = await _ideasRepository.GetAsync(ideaId);
            if (idea == null)
            {
                return NotFound();
            }

            var comment = new Comment
            {
                Content = createCommentDto.Content,
                CreatedDate = DateTime.Now,
                Idea = idea,
            };

            await _commentsRepository.CreateAsync(comment);

            //201
            return Created("", GetCommentDto(comment));

        }

        [HttpPut]
        [Route("{commentId}")]
        public async Task<ActionResult<CommentDto>> Update(int ideaId, int commentId, UpdateCommentDto updateCommentDto)
        {
            if (!(await CollectionAndIdeaAndCommentExists(ideaId, commentId)))
            {
                return NotFound(); //404
            }

            var comment = await _commentsRepository.GetAsync(commentId);

            comment!.Content = updateCommentDto.Content;

            await _commentsRepository.UpdateAsync(comment);

            return Ok(GetCommentDto(comment));
        }

        [HttpDelete]
        [Route("{commentId}")]
        public async Task<ActionResult> Remove( int ideaId, int commentId)
        {
            if (!(await CollectionAndIdeaAndCommentExists(ideaId, commentId)))
            {
                return NotFound(); //404
            }

            var comment = await _commentsRepository.GetAsync(commentId);

            await _commentsRepository.DeleteAsync(comment!);

            //204
            return NoContent();
        }

        private async Task<bool> CollectionAndIdeaAndCommentExists(int ideaId, int commentId)
        {
           
            var idea = await _ideasRepository.GetAsync(ideaId);

            if (idea == null)
            {
                return false; //404
            }

            var comment = await _commentsRepository.GetAsync(commentId);

            if (comment == null)
            {
                return false; //404
            }

            return true;
        }
        private CommentDto GetCommentDto(Comment comment)
        {
            return new CommentDto
            (
               comment.Id,
               comment.Content,
               comment.CreatedDate, 
               comment.Idea
            );
        }
    }
}
