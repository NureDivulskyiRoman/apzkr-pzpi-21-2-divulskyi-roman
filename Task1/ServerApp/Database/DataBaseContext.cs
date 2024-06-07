using Microsoft.EntityFrameworkCore;
using ServerApp.Models;
using static System.Collections.Specialized.BitVector32;

namespace ServerApp.Database
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext()
        {
            // Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<FarmPlot> FarmPlots { get; set; }
        public DbSet<IrrigationDevice> IrrigationDevices { get; set; }
        public DbSet<IrrigationSchedule> IrrigationSchedules { get; set; }
        public DbSet<Sensor> Sensors { get; set; }
        public DbSet<WaterResource> WaterResources { get; set; }
        public DbSet<WeatherCondition> WeatherConditions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=AgriFlow;Trusted_Connection=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
