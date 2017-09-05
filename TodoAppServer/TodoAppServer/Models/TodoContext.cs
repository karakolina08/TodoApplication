using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TodoAppServer.Models.DataModels;

namespace TodoAppServer.Models
{
    public class TodoContext: IdentityDbContext<TodoUser, TodoRole, int>
    {
        private IConfigurationRoot _config;
        public TodoContext(IConfigurationRoot config, DbContextOptions options)
            :base(options)
        {
            _config = config;
        }

        public DbSet<TodoEntity> TodoEntity { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            //See 
            optionsBuilder.UseSqlServer(_config["ConnectionStrings:TodoAppContext"], opt => opt.UseRowNumberForPaging());
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //Renaming ASP.NET Core Identity Users table
            builder.Entity<TodoUser>(i =>
            {
                i.ToTable("Td_User");
                i.HasKey(x => x.Id);
            });

            //Renaming ASP.NET Core Identity Tokens table
            builder.Entity<IdentityUserToken<int>>(i => {
                i.ToTable("TdUserToken");
                i.HasKey(x => x.UserId);
            });

            //Renaming ASP.NET Core Identity Roles table
            builder.Entity<TodoRole>(i => {
                i.ToTable("TdRole");
                i.HasKey(x => x.Id);
            });

            //Renaming ASP.NET Core Identity User Roles table
            builder.Entity<IdentityUserRole<int>>(i => {
                i.ToTable("TdUserRole");
                i.HasKey(x => new { x.RoleId, x.UserId });
            });

            //Renaming ASP.NET Core Identity User Login table
            builder.Entity<IdentityUserLogin<int>>(i => {
                i.ToTable("TdUserLogin");
                i.HasKey(x => new { x.ProviderKey, x.LoginProvider });
            });

            //Renaming ASP.NET Core Identity Role Claims table
            builder.Entity<IdentityRoleClaim<int>>(i => {
                i.ToTable("TdRoleClaims");
                i.HasKey(x => x.Id);
            });

            //Renaming ASP.NET Core Identity User Claims table
            builder.Entity<IdentityUserClaim<int>>(i => {
                i.ToTable("TdUserClaims");
                i.HasKey(x => x.Id);
            });
        }
    }
}
