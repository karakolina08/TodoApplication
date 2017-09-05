using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoAppServer.Models.DataModels;

namespace TodoAppServer.Models.Repositories
{
    public interface ITodoAppRepository
    {
        IQueryable<TodoEntity> GetTodoList();
        IQueryable<TodoUser> GetUsers();
        Task<bool> SaveChangesAsync();
        Task<TodoEntity> InsertTodoEntity(TodoEntity tde);
        Task<bool> DeleteTodoEntity(TodoEntity tde);
    }
}
