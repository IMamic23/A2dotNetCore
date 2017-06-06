using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MoshA2.Migrations
{
    public partial class AdditionalInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Features",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "AdditionalInfo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CarColor = table.Column<string>(nullable: true),
                    CarCurrentLocation = table.Column<string>(nullable: true),
                    CarDescription = table.Column<string>(nullable: true),
                    CarState = table.Column<string>(nullable: true),
                    FirstRegistratioYear = table.Column<int>(nullable: false),
                    FuelConsumption = table.Column<double>(nullable: false),
                    GeatType = table.Column<string>(nullable: true),
                    Mileage = table.Column<double>(nullable: false),
                    ModelEnginePower = table.Column<int>(nullable: false),
                    ModelEngineType = table.Column<string>(nullable: true),
                    ModelType = table.Column<string>(maxLength: 255, nullable: false),
                    NoOfGears = table.Column<int>(nullable: false),
                    OwnerNo = table.Column<int>(nullable: false),
                    VehicleId = table.Column<int>(nullable: false),
                    YearOfManafacture = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdditionalInfo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdditionalInfo_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalInfo_VehicleId",
                table: "AdditionalInfo",
                column: "VehicleId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdditionalInfo");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Features");
        }
    }
}
