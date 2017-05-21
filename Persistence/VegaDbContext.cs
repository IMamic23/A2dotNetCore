using Microsoft.EntityFrameworkCore;
using _mosh_A2.Models;
using _mosh_A2.Core.Models;

namespace _mosh_A2.Persistence
{
    public class VegaDbContext : DbContext
    {
        public DbSet<Make> Makes { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public VegaDbContext(DbContextOptions<VegaDbContext> options) 
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<VehicleFeature>().HasKey(vf => 
                new { vf.VehicleId, vf.FeatureId});
        }
    }
}