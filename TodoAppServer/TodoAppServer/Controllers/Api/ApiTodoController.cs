using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoAppServer.Models.DataModels;
using TodoAppServer.Models.Repositories;
using TodoAppServer.Models.ViewModels;

namespace TodoAppServer.Controllers.Api
{
    [Route("api/todoService")]
    public class ApiTodoController : Controller
    {
        private ITodoAppRepository _repository;
        private ILogger<ApiTodoController> _logger;

        public ApiTodoController(
            ITodoAppRepository todoRepository,
            ILogger<ApiTodoController> logger)
        {
            _repository = todoRepository;
            _logger = logger;
        }

        // ===============================================================================================
        // Private methods
        // ===============================================================================================
        private void setTodoEntity(TodoVM tdv, TodoEntity tde)
        {
            //wua.Id = pUserApp.Id.Value;
            tde.Description = tdv.Description;
            tde.DueDate = tdv.DueDate;
            tde.Priority = tdv.Priority;
            tde.IsCompleted = tdv.IsCompleted;
            tde.TdUserId = tdv.TdUserId;
        }

        private async Task<IActionResult> DeleteTodoItem(int? Id)
        {
            try
            {
                if (Id.HasValue && Id.Value > 0)
                {
                    // The user application exists
                    TodoEntity tde = _repository.GetTodoList().Where(ua => ua.Id == Id).FirstOrDefault<TodoEntity>();
                    bool save = await _repository.DeleteTodoEntity(tde);
                    // return OK
                    return Ok(new { Data = save, Status = "Success" });
                }
                else
                {
                    throw new Exception("The to-do entity doesn't exists");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(new { Status = "Error", Error = $"{ex.Message}" });
            }
        }

        // ===============================================================================================
        // Api methods
        // ===============================================================================================
        [HttpGet("todoListByUserId")]
        public List<TodoVM> GetTodoList(int userId, bool isCompleted)
        {
            List<TodoVM> todoList = _repository.GetTodoList().Where(td => td.TdUserId == userId && td.IsCompleted == isCompleted).Select(td => new TodoVM()
            {
                Id = td.Id,
                TdUserId = td.TdUserId,
                Description = td.Description,
                DueDate = td.DueDate,
                Priority = td.Priority,
                IsCompleted = td.IsCompleted
            }).ToList();

            return todoList;
        }

        [HttpPost("saveTodoEntity")]
        public async Task<IActionResult> SaveTodoEntity([FromBody] TodoVM pTodo)
        {
            try
            {
                if (pTodo.Id.HasValue && pTodo.Id.Value > 0)
                {
                    // The user application exists
                    TodoEntity tde = _repository.GetTodoList().Where(ua => ua.Id == pTodo.Id).FirstOrDefault<TodoEntity>();
                    setTodoEntity(pTodo, tde);

                    bool isSaved = await _repository.SaveChangesAsync();
                    // return OK
                    return Ok(new { Data = pTodo, Status = "Success" });
                }
                else
                {
                    //the user application doesn't exists
                    TodoEntity tde = new TodoEntity();
                    setTodoEntity(pTodo, tde);
                    tde = await _repository.InsertTodoEntity(tde);
                    pTodo.Id = tde.Id;

                    // return OK
                    return Ok(new { Data = pTodo, Status = "Success" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(new { Status = "Error", Error = $"{ex.Message}" });
            }
        }

        [HttpPut("updateTodoEntity")]
        public async Task<IActionResult> UpdateTodoEntity([FromBody] TodoVM pTodo)
        {
            try
            {
                // The user application exists
                TodoEntity tde = _repository.GetTodoList().Where(ua => ua.Id == pTodo.Id).FirstOrDefault<TodoEntity>();
                setTodoEntity(pTodo, tde);

                bool isSaved = await _repository.SaveChangesAsync();
                // return OK
                return Ok(new { Data = pTodo, Status = "Success" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(new { Status = "Error", Error = $"{ex.Message}" });
            }
        }


        [HttpPost("deleteTodoEntity")]
        public async Task<IActionResult> DeleteTodoEntity([FromBody] TodoVM pTodo)
        {
            return await DeleteTodoItem(pTodo.Id);
        }

        [HttpDelete("deleteTodoEnt/{id}")]
        public async Task<IActionResult> DeleteTodoEnt(int id)
        {
            return await DeleteTodoItem(id);
        }


    }
}
