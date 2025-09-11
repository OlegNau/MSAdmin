using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nomium.MergeSensei.Migrations
{
    public partial class Pipeline_DropLegacyColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "StartedAt",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "FinishedAt",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Pipelines");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Pipelines",
                type: "character varying(32)",
                maxLength: 32,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartedAt",
                table: "Pipelines",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime?>(
                name: "FinishedAt",
                table: "Pipelines",
                type: "timestamp without time zone",
                nullable: true);

            migrationBuilder.AddColumn<int?>(
                name: "Duration",
                table: "Pipelines",
                type: "integer",
                nullable: true);
        }
    }
}
