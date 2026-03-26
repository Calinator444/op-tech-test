using Microsoft.EntityFrameworkCore;
using StakeholderApi.Data;
using StakeholderApi.Models;

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
}
