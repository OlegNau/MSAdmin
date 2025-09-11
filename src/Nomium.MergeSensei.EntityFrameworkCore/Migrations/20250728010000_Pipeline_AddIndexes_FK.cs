using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nomium.MergeSensei.Migrations
{
    public partial class Pipeline_AddIndexes_FK : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_ProjectId",
                table: "Pipelines",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_RepositoryId",
                table: "Pipelines",
                column: "RepositoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_BranchId",
                table: "Pipelines",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_TriggerTypeId",
                table: "Pipelines",
                column: "TriggerTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_Repositories_RepositoryId",
                table: "Pipelines",
                column: "RepositoryId",
                principalTable: "Repositories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_Branches_BranchId",
                table: "Pipelines",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_Repositories_RepositoryId",
                table: "Pipelines");

            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_Branches_BranchId",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_Pipelines_ProjectId",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_Pipelines_RepositoryId",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_Pipelines_BranchId",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_Pipelines_TriggerTypeId",
                table: "Pipelines");
        }
    }
}
