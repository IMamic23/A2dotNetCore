using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using _mosh_A2.Persistence;

namespace MoshA2.Migrations
{
    [DbContext(typeof(VegaDbContext))]
    [Migration("20170605214142_AdditionalInfo")]
    partial class AdditionalInfo
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("_mosh_A2.Core.Models.AdditionalInfo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CarColor");

                    b.Property<string>("CarCurrentLocation");

                    b.Property<string>("CarDescription");

                    b.Property<string>("CarState");

                    b.Property<int>("FirstRegistrationYear");

                    b.Property<double>("FuelConsumption");

                    b.Property<string>("GearType");

                    b.Property<double>("Mileage");

                    b.Property<int>("ModelEnginePower");

                    b.Property<string>("ModelEngineType");

                    b.Property<string>("ModelType")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<int>("NoOfGears");

                    b.Property<int>("OwnerNo");

                    b.Property<int>("VehicleId");

                    b.Property<int>("YearOfManafacture");

                    b.HasKey("Id");

                    b.HasIndex("VehicleId")
                        .IsUnique();

                    b.ToTable("AdditionalInfo");
                });

            modelBuilder.Entity("_mosh_A2.Core.Models.Logo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<int>("VehicleId");

                    b.HasKey("Id");

                    b.HasIndex("VehicleId")
                        .IsUnique();

                    b.ToTable("Logos");
                });

            modelBuilder.Entity("_mosh_A2.Core.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<int>("VehicleId");

                    b.HasKey("Id");

                    b.HasIndex("VehicleId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("_mosh_A2.Models.Feature", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<double>("Price");

                    b.HasKey("Id");

                    b.ToTable("Features");
                });

            modelBuilder.Entity("_mosh_A2.Models.Make", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Makes");
                });

            modelBuilder.Entity("_mosh_A2.Models.Model", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("MakeId");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.HasIndex("MakeId");

                    b.ToTable("Models");
                });

            modelBuilder.Entity("_mosh_A2.Models.Vehicle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ContactEmail")
                        .HasMaxLength(255);

                    b.Property<string>("ContactName")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<string>("ContactPhone")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<bool>("IsRegistered");

                    b.Property<DateTime>("LastUpdate");

                    b.Property<int>("ModelId");

                    b.HasKey("Id");

                    b.HasIndex("ModelId");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("_mosh_A2.Models.VehicleFeature", b =>
                {
                    b.Property<int>("VehicleId");

                    b.Property<int>("FeatureId");

                    b.HasKey("VehicleId", "FeatureId");

                    b.HasIndex("FeatureId");

                    b.ToTable("VehicleFeatures");
                });

            modelBuilder.Entity("_mosh_A2.Core.Models.AdditionalInfo", b =>
                {
                    b.HasOne("_mosh_A2.Models.Vehicle")
                        .WithOne("AdditionalInfo")
                        .HasForeignKey("_mosh_A2.Core.Models.AdditionalInfo", "VehicleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("_mosh_A2.Core.Models.Logo", b =>
                {
                    b.HasOne("_mosh_A2.Models.Vehicle")
                        .WithOne("Logo")
                        .HasForeignKey("_mosh_A2.Core.Models.Logo", "VehicleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("_mosh_A2.Core.Models.Photo", b =>
                {
                    b.HasOne("_mosh_A2.Models.Vehicle")
                        .WithMany("Photos")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("_mosh_A2.Models.Model", b =>
                {
                    b.HasOne("_mosh_A2.Models.Make", "Make")
                        .WithMany("Models")
                        .HasForeignKey("MakeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("_mosh_A2.Models.Vehicle", b =>
                {
                    b.HasOne("_mosh_A2.Models.Model", "Model")
                        .WithMany()
                        .HasForeignKey("ModelId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("_mosh_A2.Models.VehicleFeature", b =>
                {
                    b.HasOne("_mosh_A2.Models.Feature", "Feature")
                        .WithMany()
                        .HasForeignKey("FeatureId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("_mosh_A2.Models.Vehicle", "Vehicle")
                        .WithMany("Features")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
