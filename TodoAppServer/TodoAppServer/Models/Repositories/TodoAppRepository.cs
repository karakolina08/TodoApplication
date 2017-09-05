using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoAppServer.Models.DataModels;

namespace TodoAppServer.Models.Repositories
{
    public class TodoAppRepository : ITodoAppRepository
    {
        private TodoContext _context;
        private ILogger<TodoAppRepository> _logger;

        public TodoAppRepository(TodoContext context, ILogger<TodoAppRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public IQueryable<TodoEntity> GetTodoList()
        {
            try
            {
                return _context.TodoEntity.AsQueryable<TodoEntity>();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to Load To-do List: { ex.Message}");
                throw new Exception("Failed to Load To-do List");
            }
        }

        public IQueryable<TodoUser> GetUsers()
        {
            try
            {
                return _context.Users.AsQueryable<TodoUser>();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to Load users: { ex.Message}");
                throw new Exception("Failed to Load users");
            }
        }

        public async Task<TodoEntity> InsertTodoEntity(TodoEntity tde)
        {
            try
            {
                EntityEntry<TodoEntity> result = _context.TodoEntity.Add(tde);
                bool save = await SaveChangesAsync();
                return result.Entity;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to add to-do entity: { ex.Message}");
                throw new Exception("Failed to add to-do entity");
            }
        }

        public async Task<bool> DeleteTodoEntity(TodoEntity tde)
        {
            try
            {
                EntityEntry<TodoEntity> result = _context.TodoEntity.Remove(tde);
                bool save = await SaveChangesAsync();
                return save;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to remove to-do entity: { ex.Message}");
                throw new Exception("Failed to remove to-do entity");
            }
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
