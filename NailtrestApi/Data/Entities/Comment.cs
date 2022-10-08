namespace NailtrestApi.Data.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }

        public Idea Idea { get; set; }
    }
}
