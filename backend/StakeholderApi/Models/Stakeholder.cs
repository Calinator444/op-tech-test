using FluentValidation;

namespace StakeholderApi.Models;

public class Stakeholder
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string? Title { get; set; }
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Organisation { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class StakeholderValidator : AbstractValidator<Stakeholder>
{
    public StakeholderValidator()
    {
        RuleFor(x => x.Title).NotEmpty().When(x => x.Title != null);
        RuleFor(x => x.Email).NotEmpty();
        RuleFor(x => x.FirstName).NotEmpty();
        RuleFor(x => x.LastName).NotEmpty();
        RuleFor(x => x.Role).NotEmpty();
        RuleFor(x => x.Organisation).NotEmpty();
        RuleFor(x => x.CreatedAt).NotEmpty();
    }
}
