using Microsoft.EntityFrameworkCore;
using StakeholderApi.Data;
using StakeholderApi.Models;
using Ardalis.Result;

namespace StakeholderApi.Services;

public class StakeholderService : IStakeholderService
{
    private readonly AppDbContext _context;

    public StakeholderService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Stakeholder>> GetAllStakeholdersAsync()
    {
        return await _context.Stakeholders
            .OrderBy(s => s.LastName)
            .ToListAsync();
}

    public async Task<Result<Stakeholder>> AddStakeholderAsync(Stakeholder stakeholder)
    {
        var stakeholderExists = await _context.Stakeholders.AnyAsync(s => s.Email == stakeholder.Email);

        if (stakeholderExists)
        {
            return Result.Error("A stakeholder with that email already exists.");
        }
        var result= _context.Stakeholders.Add(stakeholder);
        await _context.SaveChangesAsync();
        return Result.Success(result.Entity);
    }

    public async Task<bool> EmailExists(string email)
    {
        var result =  await _context.Stakeholders.AnyAsync(s => s.Email == email);
        return result;  
    }

    public async Task<Result> DeleteStakeholderAsync(int id)
    {
        _context.Stakeholders.Remove(new Stakeholder { Id = id });
        await _context.SaveChangesAsync();
        return Result.Success();
    }
}
