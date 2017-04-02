using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace _mosh_A2.Models
{
    public class VegaDbContext : DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options) {

        }
    }
}