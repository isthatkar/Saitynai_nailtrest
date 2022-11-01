using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NailtrestApi.Auth.Model;
using NailtrestApi.Data.Entities;

namespace NailtrestApi.Data
{
    public class NailtrestDbContext : IdentityDbContext<ForumRestUser>
    {
        public DbSet<Collection> Collections { get; set; }
        public DbSet<Idea> Ideas { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=(localDB)\\MSSQLLocalDB; Initial Catalog=NailtrestDb");
        }
    }
}
