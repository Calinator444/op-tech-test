using Ardalis.Result;
using StakeholderApi.Models;

namespace StakeholderApi.Services;

public interface IStakeholderService
{
    Task<IEnumerable<Stakeholder>> GetAllStakeholdersAsync();

    Task<Result<Stakeholder>> AddStakeholderAsync(Stakeholder stakeholder);

    Task<Result> DeleteStakeholderAsync(int id);
}
