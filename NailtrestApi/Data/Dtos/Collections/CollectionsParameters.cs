namespace NailtrestApi.Data.Dtos.Collections
{
    public class CollectionsParameters
    {
        private const int MaxPageSize = 20;
        private int pageSize = 2;

        public int PageNumber { get; set; } = 1;
        public int PageSize 
        { 
            get => pageSize; 
            set => pageSize = value > MaxPageSize ? MaxPageSize : value; 
        }
    }
}
