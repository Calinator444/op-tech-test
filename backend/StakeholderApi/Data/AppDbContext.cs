using Microsoft.EntityFrameworkCore;
using StakeholderApi.Models;

namespace StakeholderApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Stakeholder> Stakeholders => Set<Stakeholder>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var firstNames = new[] { "Alice", "Bob", "Carol", "David", "Eva", "Frank", "Grace", "Henry", "Isla", "James" };
        var lastNames = new[] { "Johnson", "Williams", "Smith", "Brown", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris" };
        var roles = new[] { "Investor", "Advisor", "Partner", "Board Member", "Mentor" };
        var organisations = new[] { "Venture Capital Partners", "TechCorp Ltd", "Innovation Hub", "Global Ventures", "Apex Advisory", "Horizon Capital", "BluePeak Group", "Meridian Partners", "Summit Advisors", "Crestwood Holdings" };

        var stakeholders = new List<Stakeholder>();
        var createdAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        for (int i = 0; i < 50; i++)
        {
            var firstName = firstNames[i % firstNames.Length];
            var lastName = lastNames[i / firstNames.Length % lastNames.Length];
            var suffix = i < firstNames.Length * lastNames.Length ? "" : $"{i / (firstNames.Length * lastNames.Length) + 1}";

            stakeholders.Add(new Stakeholder
            {
                Id = i + 1,
                FirstName = firstName,
                LastName = lastName + suffix,
                Email = $"{firstName.ToLower()}.{lastName.ToLower()}{suffix}@example.com",
                Role = roles[i % roles.Length],
                Organisation = organisations[i % organisations.Length],
                CreatedAt = createdAt.AddDays(i * 7)
            });
        }

        modelBuilder.Entity<Stakeholder>().HasData(stakeholders);
    }
}
