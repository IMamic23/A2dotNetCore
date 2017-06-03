using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MoshA2.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Volkswagen')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Seat')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Renault')");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Golf', (SELECT ID FROM Makes WHERE Name='Volkswagen'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Polo', (SELECT ID FROM Makes WHERE Name='Volkswagen'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Passat', (SELECT ID FROM Makes WHERE Name='Volkswagen'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Touran', (SELECT ID FROM Makes WHERE Name='Volkswagen'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Touareg', (SELECT ID FROM Makes WHERE Name='Volkswagen'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Ibiza', (SELECT ID FROM Makes WHERE Name='Seat'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Leon', (SELECT ID FROM Makes WHERE Name='Seat'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Alhambra', (SELECT ID FROM Makes WHERE Name='Seat'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Ateca', (SELECT ID FROM Makes WHERE Name='Seat'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Clio', (SELECT ID FROM Makes WHERE Name='Renault'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Megane', (SELECT ID FROM Makes WHERE Name='Renault'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Kadjar', (SELECT ID FROM Makes WHERE Name='Renault'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Captur', (SELECT ID FROM Makes WHERE Name='Renault'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Makes WHERE Name IN ('Volkswagen','Seat','Renault')");
        }
    }
}
