using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NailtrestApi.Migrations
{
    public partial class secondmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequiredTime",
                table: "Ideas");

            migrationBuilder.AddColumn<bool>(
                name: "IsVerified",
                table: "Ideas",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsVerified",
                table: "Ideas");

            migrationBuilder.AddColumn<DateTime>(
                name: "RequiredTime",
                table: "Ideas",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
