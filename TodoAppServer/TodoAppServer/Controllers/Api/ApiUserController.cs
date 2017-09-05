using Microsoft.AspNetCore.Identity;
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
    [Route("api/userService")]
    public class ApiUserController : Controller
    {
        private ITodoAppRepository _repository;
        private ILogger<ApiUserController> _logger;
        private UserManager<TodoUser> _userManager;

        public ApiUserController(
            ITodoAppRepository wamsapplicationrepository, 
            ILogger<ApiUserController> logger,
            UserManager<TodoUser> userManager
        )
        {
            _repository = wamsapplicationrepository;
            _logger = logger;
            _userManager = userManager;
        }

        // ===============================================================================================
        // Private methods
        // ===============================================================================================
        
        private async Task<IActionResult> updMainDataUserAsync(TodoUser objUser, UserVM updUser)
        {
            objUser.Name = updUser.Name;
            objUser.Email = updUser.Email;

            var resultUpd = await _userManager.UpdateAsync(objUser);

            if (resultUpd.Succeeded)
            {
                return Ok(new { Data = updUser, Status = "Success" });
            }
            else
            {
                var firstError = resultUpd.Errors.FirstOrDefault();
                _logger.LogError($"{firstError}");
                return BadRequest(new { Status = "Error", Error = firstError.Description, Errors = resultUpd.Errors });
            }
        }
        
        // ===============================================================================================
        // Api methods
        // ===============================================================================================

        [HttpPost("create")]
        public async Task<IActionResult> CreatingUser([FromBody] UserVM newUser)
        {
            try
            {
                if (await _userManager.FindByEmailAsync(newUser.Email) == null)
                {
                    TodoUser objUser = new TodoUser()
                    {
                        Name = newUser.Name,
                        UserName = newUser.Email,
                        Email = newUser.Email,
                    };
                    
                    IdentityResult objIdentRes = await _userManager.CreateAsync(objUser, newUser.Password);

                    if (objIdentRes.Succeeded)
                    {
                        string pwd = newUser.Password;
                        newUser.Id = objUser.Id;
                        newUser.Password = null;
                        
                        // return result
                        return Ok(new { Data = newUser, Status = "Success" });
                    }
                    else
                    {
                        return BadRequest(new { Status = "Error", Error = objIdentRes.Errors.FirstOrDefault().Description, Errors = objIdentRes.Errors });
                    }
                }
                else
                {
                    throw new Exception("The e-mail is registered");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(new { Status = "Error", Error = $"{ex.Message}" });
            }
        }

        [HttpGet("getUserById")]
        public async Task<IActionResult> UserById(int userId)
        {
            try
            {
                UserVM result = null;
                await Task.Run(() =>
                {
                    TodoUser tdUser = _repository.GetUsers().Where(u => u.Id == userId).FirstOrDefault<TodoUser>();
                    result = new UserVM()
                    {
                        Id = tdUser.Id,
                        Name = tdUser.Name,
                        Email = tdUser.Email
                    };
                });

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(new { Status = "Error", Error = $"{ex.Message}" });
            }
        }

        [HttpPost("updateUser")]
        public async Task<IActionResult> UpdateUser(UserVM updUser, string newPassword)
        {
            try
            {
                TodoUser objUser = _repository.GetUsers().Where(u => u.Id == updUser.Id).FirstOrDefault<TodoUser>();
                if (objUser == null) return BadRequest(new { Status = "Error", Error = "The user doesn't exists" });

                if (updUser.Password != null)
                {
                    var resultChangePsw = await _userManager.ChangePasswordAsync(objUser, updUser.Password, newPassword);

                    if (resultChangePsw.Succeeded)
                    {
                        updUser.Password = null;
                        return await updMainDataUserAsync(objUser, updUser);
                    }
                    else
                    {
                        var firstError = resultChangePsw.Errors.FirstOrDefault();
                        _logger.LogError($"{firstError}");
                        return BadRequest(new { Status = "Error", Error = firstError.Description, Errors = resultChangePsw.Errors });
                    }
                }
                else
                {
                    return await updMainDataUserAsync(objUser, updUser);
                }

            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(new { Status = "Error", Error = $"{ex.Message}" });
            }
        }

    }
}
