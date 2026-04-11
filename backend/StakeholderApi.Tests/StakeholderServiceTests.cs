using Ardalis.Result;
using Microsoft.EntityFrameworkCore;
using StakeholderApi.Data;
using StakeholderApi.Models;
using StakeholderApi.Services;
using Xunit;

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

    #region GetAllStakeholdersAsync
    
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
    public async Task GetAllStakeholdersAsync_WithNoTitle_ReturnsNullTitle()
    {
        // Arrange
        using var context = CreateInMemoryContext(nameof(GetAllStakeholdersAsync_WithNoTitle_ReturnsNullTitle));
        context.Stakeholders.Add(new Stakeholder
        {
            Id = 1,
            FirstName = "Alice",
            LastName = "Johnson",
            Email = "alice@example.com",
            Role = "Investor",
            Organisation = "VCP",
            CreatedAt = DateTime.UtcNow,
        });
        await context.SaveChangesAsync();

        var service = new StakeholderService(context);

        // Act
        var result = (await service.GetAllStakeholdersAsync()).Single();

        // Assert
        Assert.Null(result.Title);
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
    
    #endregion

    #region AddStakeholderAsync

    

    [Fact]
    public async Task AddStakeholderAsync_PersistsToDatabase()
    {
        // Arrange
        using var context = CreateInMemoryContext(nameof(AddStakeholderAsync_PersistsToDatabase));
        var service = new StakeholderService(context);
        var stakeholder = new Stakeholder
        {
            FirstName = "Alice",
            LastName = "Johnson",
            Email = "alice@example.com",
            Role = "Investor",
            Organisation = "VCP",
            CreatedAt = DateTime.UtcNow
        };

        // Act
        await service.AddStakeholderAsync(stakeholder);
        var result  = await context.Stakeholders.FirstAsync(s => s.Email == "alice@example.com");
        

        // Assert
        Assert.Equal(stakeholder.FirstName, result.FirstName);
        Assert.Equal(stakeholder.LastName, result.LastName);
        Assert.Equal(stakeholder.Email, result.Email);
        Assert.Equal(stakeholder.Role, result.Role);
        Assert.Equal(stakeholder.Organisation, result.Organisation);
        Assert.Equal(stakeholder.CreatedAt, result.CreatedAt);
    }


    [Theory]
    [InlineData("")]
    [InlineData(" ")]
    
    public async Task AddStakeholderAsync_WithEmptyEmail_ReturnsError(string emptyString)
    {
        // Arrange 
        using var context = CreateInMemoryContext(nameof(AddStakeholderAsync_WithEmptyEmail_ReturnsError));
        var createdAt = new DateTime(2024, 6, 1, 0, 0, 0, DateTimeKind.Utc);
        var service = new StakeholderService(context);
        
        // Act
        var result = await service.AddStakeholderAsync(new Stakeholder
        {
            Title = emptyString,
            FirstName = emptyString,
            LastName = emptyString,
            Email = emptyString,
            Role = emptyString,
            Organisation =emptyString,
            CreatedAt = createdAt
        });
        
        // Assert
        Assert.True(result.IsInvalid());
        Assert.Equal(6, result.ValidationErrors.Count());
    }
    
    [Fact]
    public async Task AddStakeholderAsync_WithExistingEmail_ReturnsError()
    {
        // Arrange
        using var  context = CreateInMemoryContext(nameof(AddStakeholderAsync_WithExistingEmail_ReturnsError));
        var service = new StakeholderService(context);
        var stakeholder = new Stakeholder
        {
            FirstName = "Alice",
            LastName = "Johnson",
            Email = "alice@example.com",
            Role = "Investor",
            Organisation = "VCP",
            CreatedAt = DateTime.UtcNow
        };
        context.Stakeholders.Add(stakeholder);
        await context.SaveChangesAsync();
        
        // Act 
        var result = await service.AddStakeholderAsync(stakeholder);
        
        // Assert
        Assert.True(result.IsInvalid());
    }
    #endregion

    #region EmailExists
    
    [Fact]
    public async Task EmailExists_ReturnsTrue_WhenEmailExists()
    {
        // Arrange
        using var context = CreateInMemoryContext(nameof(EmailExists_ReturnsTrue_WhenEmailExists));
        var createdAt = new DateTime(2024, 6, 1, 0, 0, 0, DateTimeKind.Utc);
        context.Stakeholders.Add(new Stakeholder
        {
            FirstName = "Alice",
            LastName = "Johnson",
            Email = "alice@example.com",
            Organisation = "VCP",
            Role = "Investor",
            CreatedAt = createdAt
        });
        await context.SaveChangesAsync();
        var service = new StakeholderService(context);
        
        // Act
        var emailExists = await service.EmailExists("alice@example.com");
        
        // Assert 
        Assert.True(emailExists);
    }

    [Fact]
    public async Task EmailExists_ReturnsFalse_WhenEmailDoesNotExist()
    {
        // Arrange
        using var context = CreateInMemoryContext(nameof(EmailExists_ReturnsTrue_WhenEmailExists));
        var service = new StakeholderService(context);
        
        // Act
        var emailExists = await service.EmailExists("alice@example.com");
        
        // Assert
        Assert.False(emailExists);
    }
    #endregion
}
