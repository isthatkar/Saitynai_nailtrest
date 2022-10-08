namespace NailtrestApi.Data.Entities
{
    public class Idea
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ImageUrl { get; set; }
        public string Complexity { get; set; }
        public string RequiredMeans { get; set; }
        public string Instruction { get; set; }
        public bool IsVerified { get; set; }
        public Collection Collection { get; set; }
    }
}
