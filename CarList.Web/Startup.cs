 using System.Linq;
 using CarList.Data.Contexts;
using CarList.Data.Domain;
using CarList.Web.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
 using Microsoft.CodeAnalysis;
 using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace CarList.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json") 
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional:true);
            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddScoped<IContext<CarData>>(c => new JsonContext<CarData>("store.json"));
            services.AddScoped<ICarRepository, CarRepository>();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            var corsOrigins = Configuration.GetSection("Config")?.Get<Config>()?.CorsOrigins;
            var corsMethods = Configuration.GetSection("Config")?.Get<Config>()?.CorsMethods;
            


            app.UseCors(builder =>
                builder.WithOrigins(corsOrigins?.Split(','))
                    .WithMethods(corsMethods?.Split(','))
                    .AllowAnyHeader()
            );
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}