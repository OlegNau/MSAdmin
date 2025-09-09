using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace Nomium.MergeSensei.DbMigrator;

class Program
{
    static async Task Main(string[] args)
    {
        var configuration = GetConfiguration();

        Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(configuration)
            .CreateLogger();

        await CreateHostBuilder(configuration, args).RunConsoleAsync();
    }

    public static IHostBuilder CreateHostBuilder(IConfiguration configuration, string[] args) =>
        Host.CreateDefaultBuilder(args)
            .AddAppSettingsSecretsJson()
            .UseSerilog((_, logging) => logging.ReadFrom.Configuration(configuration))
            .ConfigureServices((_, services) =>
            {
                services.AddHostedService<DbMigratorHostedService>();
            });


    private static IConfiguration GetConfiguration()
    {
        var environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .AddJsonFile($"appsettings.{environmentName}.json", optional: true)
            .AddEnvironmentVariables();

        return builder.Build();
    }
}
