using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814

namespace StakeholderApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stakeholders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<string>(type: "TEXT", nullable: false),
                    Organisation = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stakeholders", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Stakeholders",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "LastName", "Organisation", "Role" },
                values: new object[,]
                {
                    { 1,  new DateTime(2024, 1,  1,  0, 0, 0, 0, DateTimeKind.Utc), "alice.johnson@example.com",   "Alice", "Johnson",  "Venture Capital Partners", "Investor"    },
                    { 2,  new DateTime(2024, 1,  8,  0, 0, 0, 0, DateTimeKind.Utc), "bob.johnson@example.com",     "Bob",   "Johnson",  "TechCorp Ltd",             "Advisor"     },
                    { 3,  new DateTime(2024, 1,  15, 0, 0, 0, 0, DateTimeKind.Utc), "carol.johnson@example.com",   "Carol", "Johnson",  "Innovation Hub",           "Partner"     },
                    { 4,  new DateTime(2024, 1,  22, 0, 0, 0, 0, DateTimeKind.Utc), "david.johnson@example.com",   "David", "Johnson",  "Global Ventures",          "Board Member" },
                    { 5,  new DateTime(2024, 1,  29, 0, 0, 0, 0, DateTimeKind.Utc), "eva.johnson@example.com",     "Eva",   "Johnson",  "Apex Advisory",            "Mentor"      },
                    { 6,  new DateTime(2024, 2,  5,  0, 0, 0, 0, DateTimeKind.Utc), "frank.johnson@example.com",   "Frank", "Johnson",  "Horizon Capital",          "Investor"    },
                    { 7,  new DateTime(2024, 2,  12, 0, 0, 0, 0, DateTimeKind.Utc), "grace.johnson@example.com",   "Grace", "Johnson",  "BluePeak Group",           "Advisor"     },
                    { 8,  new DateTime(2024, 2,  19, 0, 0, 0, 0, DateTimeKind.Utc), "henry.johnson@example.com",   "Henry", "Johnson",  "Meridian Partners",        "Partner"     },
                    { 9,  new DateTime(2024, 2,  26, 0, 0, 0, 0, DateTimeKind.Utc), "isla.johnson@example.com",    "Isla",  "Johnson",  "Summit Advisors",          "Board Member" },
                    { 10, new DateTime(2024, 3,  4,  0, 0, 0, 0, DateTimeKind.Utc), "james.johnson@example.com",   "James", "Johnson",  "Crestwood Holdings",       "Mentor"      },
                    { 11, new DateTime(2024, 3,  11, 0, 0, 0, 0, DateTimeKind.Utc), "alice.williams@example.com",  "Alice", "Williams", "Venture Capital Partners", "Investor"    },
                    { 12, new DateTime(2024, 3,  18, 0, 0, 0, 0, DateTimeKind.Utc), "bob.williams@example.com",    "Bob",   "Williams", "TechCorp Ltd",             "Advisor"     },
                    { 13, new DateTime(2024, 3,  25, 0, 0, 0, 0, DateTimeKind.Utc), "carol.williams@example.com",  "Carol", "Williams", "Innovation Hub",           "Partner"     },
                    { 14, new DateTime(2024, 4,  1,  0, 0, 0, 0, DateTimeKind.Utc), "david.williams@example.com",  "David", "Williams", "Global Ventures",          "Board Member" },
                    { 15, new DateTime(2024, 4,  8,  0, 0, 0, 0, DateTimeKind.Utc), "eva.williams@example.com",    "Eva",   "Williams", "Apex Advisory",            "Mentor"      },
                    { 16, new DateTime(2024, 4,  15, 0, 0, 0, 0, DateTimeKind.Utc), "frank.williams@example.com",  "Frank", "Williams", "Horizon Capital",          "Investor"    },
                    { 17, new DateTime(2024, 4,  22, 0, 0, 0, 0, DateTimeKind.Utc), "grace.williams@example.com",  "Grace", "Williams", "BluePeak Group",           "Advisor"     },
                    { 18, new DateTime(2024, 4,  29, 0, 0, 0, 0, DateTimeKind.Utc), "henry.williams@example.com",  "Henry", "Williams", "Meridian Partners",        "Partner"     },
                    { 19, new DateTime(2024, 5,  6,  0, 0, 0, 0, DateTimeKind.Utc), "isla.williams@example.com",   "Isla",  "Williams", "Summit Advisors",          "Board Member" },
                    { 20, new DateTime(2024, 5,  13, 0, 0, 0, 0, DateTimeKind.Utc), "james.williams@example.com",  "James", "Williams", "Crestwood Holdings",       "Mentor"      },
                    { 21, new DateTime(2024, 5,  20, 0, 0, 0, 0, DateTimeKind.Utc), "alice.smith@example.com",     "Alice", "Smith",    "Venture Capital Partners", "Investor"    },
                    { 22, new DateTime(2024, 5,  27, 0, 0, 0, 0, DateTimeKind.Utc), "bob.smith@example.com",       "Bob",   "Smith",    "TechCorp Ltd",             "Advisor"     },
                    { 23, new DateTime(2024, 6,  3,  0, 0, 0, 0, DateTimeKind.Utc), "carol.smith@example.com",     "Carol", "Smith",    "Innovation Hub",           "Partner"     },
                    { 24, new DateTime(2024, 6,  10, 0, 0, 0, 0, DateTimeKind.Utc), "david.smith@example.com",     "David", "Smith",    "Global Ventures",          "Board Member" },
                    { 25, new DateTime(2024, 6,  17, 0, 0, 0, 0, DateTimeKind.Utc), "eva.smith@example.com",       "Eva",   "Smith",    "Apex Advisory",            "Mentor"      },
                    { 26, new DateTime(2024, 6,  24, 0, 0, 0, 0, DateTimeKind.Utc), "frank.smith@example.com",     "Frank", "Smith",    "Horizon Capital",          "Investor"    },
                    { 27, new DateTime(2024, 7,  1,  0, 0, 0, 0, DateTimeKind.Utc), "grace.smith@example.com",     "Grace", "Smith",    "BluePeak Group",           "Advisor"     },
                    { 28, new DateTime(2024, 7,  8,  0, 0, 0, 0, DateTimeKind.Utc), "henry.smith@example.com",     "Henry", "Smith",    "Meridian Partners",        "Partner"     },
                    { 29, new DateTime(2024, 7,  15, 0, 0, 0, 0, DateTimeKind.Utc), "isla.smith@example.com",      "Isla",  "Smith",    "Summit Advisors",          "Board Member" },
                    { 30, new DateTime(2024, 7,  22, 0, 0, 0, 0, DateTimeKind.Utc), "james.smith@example.com",     "James", "Smith",    "Crestwood Holdings",       "Mentor"      },
                    { 31, new DateTime(2024, 7,  29, 0, 0, 0, 0, DateTimeKind.Utc), "alice.brown@example.com",     "Alice", "Brown",    "Venture Capital Partners", "Investor"    },
                    { 32, new DateTime(2024, 8,  5,  0, 0, 0, 0, DateTimeKind.Utc), "bob.brown@example.com",       "Bob",   "Brown",    "TechCorp Ltd",             "Advisor"     },
                    { 33, new DateTime(2024, 8,  12, 0, 0, 0, 0, DateTimeKind.Utc), "carol.brown@example.com",     "Carol", "Brown",    "Innovation Hub",           "Partner"     },
                    { 34, new DateTime(2024, 8,  19, 0, 0, 0, 0, DateTimeKind.Utc), "david.brown@example.com",     "David", "Brown",    "Global Ventures",          "Board Member" },
                    { 35, new DateTime(2024, 8,  26, 0, 0, 0, 0, DateTimeKind.Utc), "eva.brown@example.com",       "Eva",   "Brown",    "Apex Advisory",            "Mentor"      },
                    { 36, new DateTime(2024, 9,  2,  0, 0, 0, 0, DateTimeKind.Utc), "frank.brown@example.com",     "Frank", "Brown",    "Horizon Capital",          "Investor"    },
                    { 37, new DateTime(2024, 9,  9,  0, 0, 0, 0, DateTimeKind.Utc), "grace.brown@example.com",     "Grace", "Brown",    "BluePeak Group",           "Advisor"     },
                    { 38, new DateTime(2024, 9,  16, 0, 0, 0, 0, DateTimeKind.Utc), "henry.brown@example.com",     "Henry", "Brown",    "Meridian Partners",        "Partner"     },
                    { 39, new DateTime(2024, 9,  23, 0, 0, 0, 0, DateTimeKind.Utc), "isla.brown@example.com",      "Isla",  "Brown",    "Summit Advisors",          "Board Member" },
                    { 40, new DateTime(2024, 9,  30, 0, 0, 0, 0, DateTimeKind.Utc), "james.brown@example.com",     "James", "Brown",    "Crestwood Holdings",       "Mentor"      },
                    { 41, new DateTime(2024, 10, 7,  0, 0, 0, 0, DateTimeKind.Utc), "alice.taylor@example.com",    "Alice", "Taylor",   "Venture Capital Partners", "Investor"    },
                    { 42, new DateTime(2024, 10, 14, 0, 0, 0, 0, DateTimeKind.Utc), "bob.taylor@example.com",      "Bob",   "Taylor",   "TechCorp Ltd",             "Advisor"     },
                    { 43, new DateTime(2024, 10, 21, 0, 0, 0, 0, DateTimeKind.Utc), "carol.taylor@example.com",    "Carol", "Taylor",   "Innovation Hub",           "Partner"     },
                    { 44, new DateTime(2024, 10, 28, 0, 0, 0, 0, DateTimeKind.Utc), "david.taylor@example.com",    "David", "Taylor",   "Global Ventures",          "Board Member" },
                    { 45, new DateTime(2024, 11, 4,  0, 0, 0, 0, DateTimeKind.Utc), "eva.taylor@example.com",      "Eva",   "Taylor",   "Apex Advisory",            "Mentor"      },
                    { 46, new DateTime(2024, 11, 11, 0, 0, 0, 0, DateTimeKind.Utc), "frank.taylor@example.com",    "Frank", "Taylor",   "Horizon Capital",          "Investor"    },
                    { 47, new DateTime(2024, 11, 18, 0, 0, 0, 0, DateTimeKind.Utc), "grace.taylor@example.com",    "Grace", "Taylor",   "BluePeak Group",           "Advisor"     },
                    { 48, new DateTime(2024, 11, 25, 0, 0, 0, 0, DateTimeKind.Utc), "henry.taylor@example.com",    "Henry", "Taylor",   "Meridian Partners",        "Partner"     },
                    { 49, new DateTime(2024, 12, 2,  0, 0, 0, 0, DateTimeKind.Utc), "isla.taylor@example.com",     "Isla",  "Taylor",   "Summit Advisors",          "Board Member" },
                    { 50, new DateTime(2024, 12, 9,  0, 0, 0, 0, DateTimeKind.Utc), "james.taylor@example.com",    "James", "Taylor",   "Crestwood Holdings",       "Mentor"      }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "Stakeholders");
        }
    }
}
