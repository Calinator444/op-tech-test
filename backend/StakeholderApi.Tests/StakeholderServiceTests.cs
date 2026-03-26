using Microsoft.EntityFrameworkCore;
using StakeholderApi.Data;
using StakeholderApi.Models;
using StakeholderApi.Services;

namespace StakeholderApi.Tests;

public class StakeholderServiceTests
{
    private AppDbContext CreateInMemoryContext(string dbName)
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(dbName)
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task GetAllStakeholdersAsync_ReturnsAllStakeholders()
    {
        // Arrange
        using var context = CreateInMemoryContext(nameof(GetAllStakeholdersAsync_ReturnsAllStakeholders));
        context.Stakeholders.AddRange(
            new Stakeholder { Id = 1, FirstName = "Alice", LastName = "Johnson", Email = "alice@example.com", Role = "Investor", Organisation = "VCP", CreatedAt = DateTime.UtcNow },
            new Stakeholder { Id = 2, FirstName = "Bob", LastName = "Williams", Email = "bob@example.com", Role = "Advisor", Organisation = "TechCorp", CreatedAt = DateTime.UtcNow }
        );
        await context.SaveChangesAsync();

        var service = new StakeholderService(context);

        // Act
        var result = await service.GetAllStakeholdersAsync();

        // Assert
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public async Task GetAllStakeholdersAsync_WhenNoStakeholders_ReturnsEmptyList()
    {
        // Arrange
        using var context = CreateInMemoryContext(nameof(GetAllStakeholdersAsync_WhenNoStakeholders_ReturnsEmptyList));
        var service = new StakeholderService(context);

        // Act
        var result = await service.GetAllStakeholdersAsync();

        // Assert
        Assert.Empty(result);
    }

    [Fact]
    public async Task GetAllStakeholdersAsync_ReturnsStakeholdersOrderedByLastName()
    {
        // Arrange
        using var context = CreateInMemoryContext(nameof(GetAllStakeholdersAsync_ReturnsStakeholdersOrderedByLastName));
        context.Stakeholders.AddRange(
            new Stakeholder { Id = 1, FirstName = "Carol", LastName = "Smith", Email = "carol@example.com", Role = "Partner", Organisation = "IH", CreatedAt = DateTime.UtcNow },
            new Stakeholder { Id = 2, FirstName = "Alice", LastName = "Johnson", Email = "alice@example.com", Role = "Investor", Organisation = "VCP", CreatedAt = DateTime.UtcNow },
            new Stakeholder { Id = 3, FirstName = "Bob", LastName = "Adams", Email = "bob@example.com", Role = "Advisor", Organisation = "TC", CreatedAt = DateTime.UtcNow }
        );
        await context.SaveChangesAsync();

        var service = new StakeholderService(context);

        // Act
        var result = (await service.GetAllStakeholdersAsync()).ToList();

        // Assert
        Assert.Equal("Adams", result[0].LastName);
        Assert.Equal("Johnson", result[1].LastName);
        Assert.Equal("Smith", result[2].LastName);
    }

    [Fact]
    public async Task GetAllStakeholdersAsync_ReturnsCorrectStakeholderProperties()
    {
        // Arrange
        using var context = CreateInMemoryContext(nameof(GetAllStakeholdersAsync_ReturnsCorrectStakeholderProperties));
        var createdAt = new DateTime(2024, 6, 1, 0, 0, 0, DateTimeKind.Utc);
        context.Stakeholders.Add(new Stakeholder
        {
            Id = 1,
            FirstName = "Alice",
            LastName = "Johnson",
            Email = "alice@example.com",
            Role = "Investor",
            Organisation = "VCP",
            CreatedAt = createdAt
        });
        await context.SaveChangesAsync();

        var service = new StakeholderService(context);

        // Act
        var result = (await service.GetAllStakeholdersAsync()).Single();

        // Assert
        Assert.Equal("Alice", result.FirstName);
        Assert.Equal("Johnson", result.LastName);
        Assert.Equal("alice@example.com", result.Email);
        Assert.Equal("Investor", result.Role);
        Assert.Equal("VCP", result.Organisation);
        Assert.Equal(createdAt, result.CreatedAt);
    }
}
