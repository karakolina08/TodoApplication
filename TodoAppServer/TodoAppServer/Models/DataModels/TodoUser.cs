using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace TodoAppServer.Models.DataModels
{
    public class TodoUser : IdentityUser<int>
    {
        public string Name { get; set; }
    }
}
