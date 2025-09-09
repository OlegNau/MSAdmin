using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Nomium.MergeSensei.Migrations
{
    /// <inheritdoc />
    public partial class Add_IsActive_To_Repository : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Repositories",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Repositories");
        }
    }
}
