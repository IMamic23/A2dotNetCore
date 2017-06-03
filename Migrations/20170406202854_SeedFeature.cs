using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MoshA2.Migrations
{
    public partial class SeedFeature : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Wi-Fi Hotspot')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Front and rear camera')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Automatic trunk open')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Built in vacuum')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Sports seats')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Automatic parking')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Power Drivers Seat')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Heated Front Seats')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Active Blind-Spot Detection System')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('USB Ports')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Built-In Navigation System')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Heated Windshield')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Backup Collision Intervention/Auto Stop')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Leather Seats')");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Features WHERE Name IN ('Wi-Fi Hotspot', 'Front and rear camera', 'Automatic trunk open')");
        }
    }
}
