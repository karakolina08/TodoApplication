using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using TodoAppServer.Models.DataModels;
using TodoAppServer.Models.ViewModels;

namespace TodoAppServer.Controllers.Api
{
    [Route("api/authService")]
    public class ApiAuthController : Controller
    {
        private SignInManager<TodoUser> _signInManager;
        private UserManager<TodoUser> _userManager;
        private ILogger<ApiAuthController> _logger;
        
        public ApiAuthController(SignInManager<TodoUser> pSignInMng, UserManager<TodoUser> userManager, ILogger<ApiAuthController> logger)
        {
            _signInManager = pSignInMng;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginVM pLoginVm)
        {
            try
            {
                TodoUser objTdUser = await _userManager.FindByEmailAsync(pLoginVm.Email);
                if (objTdUser == null) throw new Exception("The Email doesn't regitered");
                var pbjSignInResult = await _signInManager.PasswordSignInAsync(objTdUser.UserName, pLoginVm.Password, false, false);

                if (pbjSignInResult.Succeeded)
                {
                    UserVM objUserRet = new UserVM()
                    {
                        Id = objTdUser.Id,
                        Email = objTdUser.Email,
                        Name = objTdUser.Name
                    };
                    
                    return Ok(new { Data = objUserRet, Status = "Success" });
                }
                else
                {
                    _logger.LogTrace($"End ApiAuthController.Login");
                    return BadRequest(new { Status = "Error", Error = "Username or password incorrect" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error ApiAuthController.Login --> {ex.Message}");
                return BadRequest(new { Status = "Error", Error = $"{ex.Message}" });
            }
        }

        [HttpPost("logout")]
        public async Task<ActionResult> LogOut()
        {
            try
            {
                if (User.Identity.IsAuthenticated)
                {
                    await _signInManager.SignOutAsync();
                }
                return Ok(new { Data = "", Status = "Success" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(new { Status = "Error", Error = $"{ex.Message}" });
            }
        }
    }
}
