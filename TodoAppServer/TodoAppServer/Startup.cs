using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using TodoAppServer.Models;
using TodoAppServer.Models.DataModels;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using TodoAppServer.Models.Repositories;

namespace TodoAppServer
{
    public class Startup
    {
        private IHostingEnvironment _env;
        private IConfigurationRoot _config;

        public Startup(IHostingEnvironment env)
        {
            _env = env;

            var builder = new ConfigurationBuilder()
              .SetBasePath(_env.ContentRootPath)
              .AddJsonFile("config.json")
              .AddEnvironmentVariables();

            _config = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(_config);

            //Add My DataAccess EF Context
            services.AddDbContext<TodoContext>();

            //Add Identity 
            services.AddIdentity<TodoUser, TodoRole>(config =>
            {
                config.User.RequireUniqueEmail = true;
                // Password configuration
                config.Password.RequireDigit = false;
                config.Password.RequireNonAlphanumeric = false;
                config.Password.RequireUppercase = false;

                config.Cookies.ApplicationCookie.LoginPath = "/authMvc/startLogin";
                config.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = async ctx =>
                    {
                        //It is an API and the status code is 200 (ok) 
                        if (ctx.Request.Path.StartsWithSegments("/api") &&
                          ctx.Response.StatusCode == 200)
                        {
                            ctx.Response.StatusCode = 401;
                        }
                        else
                        {
                            ctx.Response.Redirect(ctx.RedirectUri);
                        }
                        await Task.Yield();
                    }
                };
            })
            .AddEntityFrameworkStores<TodoContext, int>()
            .AddDefaultTokenProviders();

            // Adding scopes
            services.AddScoped<ITodoAppRepository, TodoAppRepository>();

            //Add Logging Middleware
            services.AddLogging();

            services.AddMvc(config =>
            {
                /*if (_env.IsProduction())
                {
                    config.Filters.Add(new RequireHttpsAttribute());
                }*/
            });

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile("Log/TodoApp-{Date}.txt");
            //loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //Use Static Files Middleware
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Use Cors Middleware
            app.UseCors(builder => builder.AllowAnyOrigin().AllowCredentials().AllowAnyHeader().AllowAnyMethod());

            app.UseExceptionHandler(
                  builder =>
                  {
                      builder.Run(
                        async context =>
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                            context.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

                            var error = context.Features.Get<IExceptionHandlerFeature>();
                            if (error != null)
                            {
                                //context.Response.AddApplicationError(error.Error.Message);
                                await context.Response.WriteAsync(error.Error.Message).ConfigureAwait(false);
                            }
                        });
                  });

            app.UseIdentity();

            //Use MVC Middleware
            app.UseMvc(config =>
            {
                //Define app MVC default Routes
                config.MapRoute(
                    name: "Default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "AuthMvc", action = "Login" }
                );
            });

            app.Run(async context =>
            {
                context.Response.StatusCode = 200;
                context.Response.ContentType = "text/html";
                await context.Response.SendFileAsync("./wwwroot/index.html");
            });
        }
    }
}
