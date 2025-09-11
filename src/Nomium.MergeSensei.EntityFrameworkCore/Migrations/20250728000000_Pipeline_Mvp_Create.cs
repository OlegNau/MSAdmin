using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

using Nomium.MergeSensei.EntityFrameworkCore;

namespace Nomium.MergeSensei.Migrations
{
    [DbContext(typeof(MergeSenseiDbContext))]
    [Migration("20250728000000_Pipeline_Mvp_Create")]
    public partial class Pipeline_Mvp_Create : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Pipelines",
                type: "uuid",
                nullable: false,
                defaultValue: Guid.Empty);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Pipelines",
                type: "character varying(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Pipelines",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "RepositoryId",
                table: "Pipelines",
                type: "uuid",
                nullable: false,
                defaultValue: Guid.Empty);

            migrationBuilder.AddColumn<Guid>(
                name: "BranchId",
                table: "Pipelines",
                type: "uuid",
                nullable: false,
                defaultValue: Guid.Empty);

            migrationBuilder.AddColumn<long>(
                name: "TriggerTypeId",
                table: "Pipelines",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "PipelineAgent",
                columns: table => new
                {
                    PipelineId = table.Column<Guid>(type: "uuid", nullable: false),
                    AiModelId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PipelineAgent", x => new { x.PipelineId, x.AiModelId });
                    table.ForeignKey(
                        name: "FK_PipelineAgent_Pipelines_PipelineId",
                        column: x => x.PipelineId,
                        principalTable: "Pipelines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PipelineAgent");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "RepositoryId",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "TriggerTypeId",
                table: "Pipelines");
        }
    }
}
